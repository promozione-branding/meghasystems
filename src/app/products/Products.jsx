
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronDown,
    ChevronRight,
    Grid2X2,
    LayoutList,
    Layers3,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Sparkles,
    X,
} from "lucide-react";

const PER_PAGE = 9;

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);

export default function AllProductsClient({ categories = [] }) {
    const heroRef = useRef(null);
    const productsRef = useRef(null);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Normalize category and product data.
    const allProducts = useMemo(
        () =>
            categories.flatMap((category) =>
                (category.products || []).map((product) => ({
                    ...product,
                    categoryName: category.categoryName,
                    categorySlug:
                        category.slug ||
                        category.categoryName
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-"),
                    categoryExcerpt: category.excerpt,
                }))
            ),
        [categories]
    );

    const categoryOptions = useMemo(
        () => [
            {
                slug: "all",
                name: "All Products",
                count: allProducts.length,
            },
            ...categories.map((category) => ({
                slug:
                    category.slug ||
                    category.categoryName
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-"),
                name: category.categoryName,
                count: category.products?.length || 0,
            })),
        ],
        [categories, allProducts.length]
    );

    // Filter and sort products.
    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = allProducts.filter((product) => {
            const matchesCategory =
                selectedCategory === "all" ||
                product.categorySlug === selectedCategory;

            const searchableText = [
                product.name,
                product.shortDescription,
                product.categoryName,
                product.slug,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return (
                matchesCategory &&
                (!query || searchableText.includes(query))
            );
        });

        switch (sortBy) {
            case "name-asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "name-desc":
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;

            case "price-asc":
                filtered.sort(
                    (a, b) =>
                        (typeof a.price === "number" ? a.price : Infinity) -
                        (typeof b.price === "number" ? b.price : Infinity)
                );
                break;

            case "price-desc":
                filtered.sort(
                    (a, b) =>
                        (typeof b.price === "number" ? b.price : -Infinity) -
                        (typeof a.price === "number" ? a.price : -Infinity)
                );
                break;

            default:
                break;
        }

        return filtered;
    }, [allProducts, selectedCategory, search, sortBy]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / PER_PAGE)
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    );

    const selectCategory = (slug) => {
        setSelectedCategory(slug);
        setCurrentPage(1);
        setMobileFiltersOpen(false);

        const url =
            slug === "all"
                ? "/products"
                : `/products#${slug}`;

        window.history.pushState(null, "", url);

        productsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const clearFilters = () => {
        setSelectedCategory("all");
        setSearch("");
        setSortBy("default");
        setCurrentPage(1);

        window.history.pushState(null, "", "/products");
    };

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const changePage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        scrollToProducts();
    };

    // Hero entrance animation.
    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".products-hero-reveal",
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Animate visible product cards after filtering/pagination.
    useEffect(() => {
        if (!productsRef.current) return;

        const cards = productsRef.current.querySelectorAll(
            ".product-grid-card"
        );

        if (!cards.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.045,
                    ease: "power3.out",
                    overwrite: true,
                    clearProps: "transform,opacity",
                }
            );
        }, productsRef);

        return () => ctx.revert();
    }, [selectedCategory, search, sortBy, currentPage, view]);

    useEffect(() => {
        const handleHashChange = () => {
            const slug = decodeURIComponent(
                window.location.hash.slice(1)
            );

            const validCategory = categories.some(
                (category) => category.slug === slug
            );

            setSelectedCategory(
                validCategory ? slug : "all"
            );

            setCurrentPage(1);

            if (slug && validCategory) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        productsRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, 150);
                });
            }
        };

        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [categories]);

    return (
        <main className="min-h-screen bg-white text-[var(--primary)]">
            <section
                ref={heroRef}
                className="relative isolate overflow-hidden bg-[var(--primary)] pb-10 pt-32 text-white sm:pb-16 lg:pt-40"
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/products/Maxi.webp')",
                    }}
                />

                {/* Dark Navy Gradient Overlay */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(8,43,80,0.97) 0%, rgba(8,43,80,0.88) 2%, rgba(8,43,80,0.55) 20%, rgba(8,43,80,0.35) 60%)",
                    }}
                />

                {/* Background Effects */}
                <div className="pointer-events-none absolute -right-32 -top-48 z-[2] h-[650px] w-[650px] rounded-full bg-[var(--secondary)]/10 blur-[130px]" />

                <div className="pointer-events-none absolute -bottom-48 left-0 z-[2] h-[450px] w-[450px] rounded-full bg-white/5 blur-[110px]" />

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                    {/* Breadcrumb */}
                    <div className="products-hero-reveal mb-12 flex items-center gap-2 text-sm text-white/80">
                        <Link href="/" className="transition-colors hover:text-white">
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-white">Our Products</span>
                    </div>

                    <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        {/* Left Content */}
                        <div>
                            <div className="products-hero-reveal mb-5 flex items-center gap-4">
                                <span className="h-px w-12 bg-[var(--secondary)]" />

                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d8ac78]">
                                    Explore Our Collection
                                </span>
                            </div>

                            <h1 className="products-hero-reveal max-w-[900px] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
                                Our <span className="text-white">Products.</span>
                            </h1>

                            <button
                                type="button"
                                onClick={scrollToProducts}
                                className="products-hero-reveal mt-9 inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
                            >
                                Explore Products
                                <ArrowUpRight size={19} />
                            </button>
                        </div>

                        {/* Hero Stats */}
                        <div className="products-hero-reveal grid grid-cols-2 gap-4 lg:justify-self-end">

                            {/* Products Card */}
                            <div className="min-w-[150px] rounded-2xl border border-white/20 bg-[#082b50] p-6 shadow-lg">
                                <Layers3
                                    size={26}
                                    className="mb-5 text-[#d8ac78]"
                                />

                                <p className="text-4xl font-semibold tracking-tight text-white">
                                    {String(allProducts.length).padStart(2, "0")}
                                </p>

                                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/65">
                                    Products
                                </p>
                            </div>

                            {/* Categories Card */}
                            <div className="min-w-[150px] rounded-2xl border border-white/20 bg-[#082b50] p-6 shadow-lg">
                                <ShieldCheck
                                    size={26}
                                    className="mb-5 text-[#d8ac78]"
                                />

                                <p className="text-4xl font-semibold tracking-tight text-white">
                                    {String(categories.length).padStart(2, "0")}
                                </p>

                                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/65">
                                    Categories
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={productsRef}
                id="products-collection"
                className="scroll-mt-5 bg-[#f7f9f8] py-8 lg:py-10"
            >
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                    {/* Section heading */}
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span className="h-px w-9 bg-[var(--secondary)]" />

                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--secondary)]">
                                    Product Catalogue
                                </span>
                            </div>

                            <h2 className="text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[1.1] tracking-[-0.045em]">
                                Explore Our{" "}
                                <span className="text-[var(--secondary)]">
                                    Range.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-[420px] text-sm leading-7 text-[var(--text-secondary)]">
                            Browse our selection of restroom partition systems
                            and find the right solution for your space.
                        </p>
                    </div>

                    {/* =====================================
              FILTER TOOLBAR
          ===================================== */}
                    <div className="mb-8 rounded-[22px] border border-[var(--border-color)] bg-white p-4 sm:p-5">

                        {/* Top toolbar */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Search */}
                            <div className="relative min-w-[200px] flex-1">
                                <Search
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search products..."
                                    className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-[#f7f9f8] pl-12 pr-4 text-sm outline-none transition focus:border-[var(--secondary)]"
                                />
                            </div>

                            {/* Sort */}
                            <div className="relative min-w-[180px]">
                                <select
                                    value={sortBy}
                                    onChange={(event) => {
                                        setSortBy(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-xl border border-[var(--border-color)] bg-[#f7f9f8] pl-4 pr-10 text-sm font-medium outline-none focus:border-[var(--secondary)]"
                                >
                                    <option value="default">Default Sorting</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                                />
                            </div>

                            {/* Mobile filter toggle */}
                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen((value) => !value)
                                }
                                className="flex h-12 items-center gap-2 rounded-xl border border-[var(--border-color)] px-4 text-sm font-medium lg:hidden"
                            >
                                <SlidersHorizontal size={18} />
                                Categories
                            </button>

                            {/* Layout toggle */}
                            <div className="hidden items-center gap-1 rounded-xl border border-[var(--border-color)] p-1 sm:flex">
                                <button
                                    type="button"
                                    onClick={() => setView("grid")}
                                    aria-label="Grid view"
                                    aria-pressed={view === "grid"}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${view === "grid"
                                        ? "bg-[var(--secondary)] text-white"
                                        : "text-[var(--text-secondary)] hover:bg-[#f7f9f8]"
                                        }`}
                                >
                                    <Grid2X2 size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setView("list")}
                                    aria-label="List view"
                                    aria-pressed={view === "list"}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${view === "list"
                                        ? "bg-[var(--secondary)] text-white"
                                        : "text-[var(--text-secondary)] hover:bg-[#f7f9f8]"
                                        }`}
                                >
                                    <LayoutList size={19} />
                                </button>
                            </div>
                        </div>

                        {/* Desktop categories */}
                        <div className="mt-5 hidden flex-wrap gap-2 border-t border-[var(--border-color)] pt-5 lg:flex">
                            {categoryOptions.map((category) => (
                                <button
                                    key={category.slug}
                                    type="button"
                                    onClick={() => selectCategory(category.slug)}
                                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${selectedCategory === category.slug
                                        ? "bg-[var(--primary)] text-white"
                                        : "border border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                                        }`}
                                >
                                    {category.name}

                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] ${selectedCategory === category.slug
                                            ? "bg-white/15"
                                            : "bg-[#f0f2f1]"
                                            }`}
                                    >
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile categories */}
                        {mobileFiltersOpen && (
                            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[var(--border-color)] pt-5 lg:hidden">
                                {categoryOptions.map((category) => (
                                    <button
                                        key={category.slug}
                                        type="button"
                                        onClick={() => selectCategory(category.slug)}
                                        className={`rounded-xl px-4 py-3 text-left text-xs font-semibold ${selectedCategory === category.slug
                                            ? "bg-[var(--secondary)] text-white"
                                            : "bg-[#f7f9f8] text-[var(--primary)]"
                                            }`}
                                    >
                                        {category.name}
                                        <span className="ml-2 opacity-60">
                                            ({category.count})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* =====================================
              RESULT COUNT
          ===================================== */}
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Showing{" "}
                            <span className="font-semibold text-[var(--primary)]">
                                {filteredProducts.length === 0
                                    ? 0
                                    : (currentPage - 1) * PER_PAGE + 1}
                                {" – "}
                                {Math.min(
                                    currentPage * PER_PAGE,
                                    filteredProducts.length
                                )}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-[var(--primary)]">
                                {filteredProducts.length}
                            </span>{" "}
                            products
                        </p>

                        {(selectedCategory !== "all" ||
                            search ||
                            sortBy !== "default") && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--secondary)]"
                                >
                                    <X size={15} />
                                    Clear Filters
                                </button>
                            )}
                    </div>

                    {/* =====================================
              PRODUCT GRID
          ===================================== */}
                    {paginatedProducts.length > 0 ? (
                        <div
                            className={
                                view === "grid"
                                    ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                                    : "grid gap-5"
                            }
                        >
                            {paginatedProducts.map((product) => {
                                const hasPrice =
                                    typeof product.price === "number";

                                const hasDiscount =
                                    hasPrice &&
                                    typeof product.oldPrice === "number" &&
                                    product.oldPrice > product.price;

                                const discountPercent = hasDiscount
                                    ? Math.round(
                                        ((product.oldPrice - product.price) /
                                            product.oldPrice) *
                                        100
                                    )
                                    : 0;

                                return (
                                    <article
                                        key={`${product.categorySlug}-${product.slug}`}
                                        className={`product-grid-card group overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-white transition-all duration-300 hover:border-[var(--secondary)]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)] ${view === "list"
                                            ? "sm:grid sm:grid-cols-[300px_1fr]"
                                            : ""
                                            }`}
                                    >
                                        {/* PRODUCT IMAGE */}
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className={`relative block overflow-hidden bg-[#edf0ee] ${view === "list"
                                                ? "aspect-[4/3] sm:aspect-auto sm:min-h-[260px]"
                                                : "aspect-[4/3]"
                                                }`}
                                        >
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    sizes={
                                                        view === "list"
                                                            ? "(max-width: 640px) 100vw, 300px"
                                                            : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    }
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <Layers3
                                                        size={50}
                                                        className="text-[var(--secondary)]/40"
                                                    />
                                                </div>
                                            )}

                                            {/* Category badge */}
                                            <div className="absolute left-5 top-5">
                                                <span className="rounded-full bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] shadow-sm">
                                                    {product.categoryName}
                                                </span>
                                            </div>

                                            {/* Discount badge */}
                                            {hasDiscount && (
                                                <span className="absolute right-5 top-5 rounded-full bg-[var(--secondary)] px-3 py-2 text-[11px] font-semibold text-white">
                                                    -{discountPercent}%
                                                </span>
                                            )}

                                            {/* Hover arrow */}
                                            <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[var(--secondary)] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <ArrowUpRight size={20} />
                                            </span>
                                        </Link>

                                        {/* PRODUCT CONTENT */}
                                        <div className="flex flex-col p-6 sm:p-7">

                                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                                Megha Systems
                                            </p>

                                            <Link href={`/products/${product.slug}`}>
                                                <h3 className="text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-tight tracking-[-0.035em] transition-colors group-hover:text-[var(--secondary)]">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--text-secondary)]">
                                                {product.shortDescription ||
                                                    product.categoryExcerpt ||
                                                    "Premium restroom cubicle system designed for reliable performance."}
                                            </p>

                                            {/* Product highlights */}
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-[#f0f7f5] px-3 py-1.5 text-[11px] font-medium text-[var(--secondary)]">
                                                    Premium Quality
                                                </span>

                                                <span className="rounded-full bg-[#f0f7f5] px-3 py-1.5 text-[11px] font-medium text-[var(--secondary)]">
                                                    Customizable
                                                </span>
                                            </div>

                                            {/* PRICE + LINK */}
                                            <div className="mt-7 flex items-center justify-between gap-3 border-t border-[var(--border-color)] pt-5">
                                                <div>
                                                    {hasPrice ? (
                                                        <>
                                                            <span className="text-xl font-bold text-[var(--primary)]">
                                                                {formatPrice(product.price)}
                                                            </span>

                                                            {hasDiscount && (
                                                                <span className="ml-2 text-sm text-[var(--text-secondary)] line-through">
                                                                    {formatPrice(product.oldPrice)}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-sm font-semibold text-[var(--secondary)]">
                                                            Price on Request
                                                        </span>
                                                    )}
                                                </div>

                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] transition-all hover:gap-3"
                                                >
                                                    View Details
                                                    <ArrowUpRight size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        /* EMPTY STATE */
                        <div className="rounded-[26px] border border-[var(--border-color)] bg-white px-6 py-20 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f7f5]">
                                <Search
                                    size={30}
                                    className="text-[var(--secondary)]"
                                />
                            </div>

                            <h3 className="text-2xl font-semibold">
                                No Products Found
                            </h3>

                            <p className="mx-auto mt-3 max-w-[400px] text-sm leading-7 text-[var(--text-secondary)]">
                                We couldn't find any products matching your search
                                or selected category.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-7 rounded-xl bg-[var(--secondary)] px-7 py-3.5 text-sm font-semibold text-white"
                            >
                                View All Products
                            </button>
                        </div>
                    )}

                    {/* =====================================
              PAGINATION
          ===================================== */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeft size={18} />
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => changePage(page)}
                                    aria-current={
                                        currentPage === page ? "page" : undefined
                                    }
                                    className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${currentPage === page
                                        ? "bg-[var(--secondary)] text-white"
                                        : "border border-[var(--border-color)] bg-white hover:border-[var(--secondary)]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
