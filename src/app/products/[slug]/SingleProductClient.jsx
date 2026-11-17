
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
    ChevronRight,
    Download,
    Expand,
    Layers3,
    Menu,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Wrench,
    X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

export default function SingleProductClient({
    product,
    category,
    relatedProducts = [],
}) {
    const heroRef = useRef(null);
    const galleryRef = useRef(null);

    const [activeImage, setActiveImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [showAllSpecs, setShowAllSpecs] = useState(false);

    const images = useMemo(() => {
        return [
            product.image,
            product.rightImg,
            product.hardwareImg,
            ...(product.slider || []),
            product.shapes,
        ].filter(Boolean).filter((src, index, arr) => arr.indexOf(src) === index);
    }, [product]);

    const selectedImage = images[activeImage] || product.image;

    const discount =
        product.oldPrice > product.price
            ? product.oldPrice - product.price
            : 0;

    const discountPercent =
        product.oldPrice > product.price
            ? Math.round((discount / product.oldPrice) * 100)
            : 0;

    const specifications = product.dimensions || [];
    const features = product.keyFeatures || [];

    const visibleSpecs = showAllSpecs
        ? specifications
        : specifications.slice(0, 6);

    const enquiryMessage = encodeURIComponent(
        `Hello Megha Systems, I would like to enquire about ${product.name} (${category.categoryName}). Please share product details, availability and a quotation.`
    );

    // Replace with your actual WhatsApp business number.
    const WHATSAPP_NUMBER = "";

    const whatsappLink = WHATSAPP_NUMBER
        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${enquiryMessage}`
        : "/contact";

    const nextImage = () =>
        setActiveImage((current) => (current + 1) % images.length);

    const previousImage = () =>
        setActiveImage(
            (current) => (current - 1 + images.length) % images.length
        );

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".product-reveal",
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, [product.slug]);

    useEffect(() => {
        setActiveImage(0);
        setShowAllSpecs(false);
    }, [product.slug]);

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setLightboxOpen(false);
            if (event.key === "ArrowRight") nextImage();
            if (event.key === "ArrowLeft") previousImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, images.length]);

    return (
        <main className="min-h-screen bg-white text-[var(--primary)]">
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-[var(--primary)] pb-14 pt-28 text-white lg:pb-20 lg:pt-36"
            >
                {/* Decorative gradients */}
                <div className="pointer-events-none absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full bg-[var(--secondary)]/10 blur-[120px]" />
                <div className="pointer-events-none absolute -bottom-48 left-0 h-[450px] w-[450px] rounded-full bg-[var(--secondary)]/10 blur-[110px]" />

                <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                    {/* BREADCRUMB */}
                    <nav className="product-reveal mb-9 flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
                        <Link href="/" className="transition hover:text-white">
                            Home
                        </Link>

                        <ChevronRight size={14} />

                        <Link
                            href="/products"
                            className="transition hover:text-white"
                        >
                            Products
                        </Link>

                        <ChevronRight size={14} />

                        <span>{category.categoryName}</span>

                        <ChevronRight size={14} />

                        <span className="font-medium text-white">
                            {product.name}
                        </span>
                    </nav>

                    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20">

                        {/* ======================================
                LEFT IMAGE GALLERY
            ====================================== */}
                        <div
                            ref={galleryRef}
                            className="product-reveal grid grid-cols-1 gap-4 sm:grid-cols-[82px_minmax(0,1fr)]"
                        >
                            {/* THUMBNAILS */}
                            <div className="order-2 flex gap-3 overflow-x-auto pb-2 sm:order-1 sm:max-h-[540px] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setActiveImage(index)}
                                        aria-label={`View product image ${index + 1}`}
                                        className={`relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-xl border-2 bg-white/10 transition-all ${activeImage === index
                                            ? "border-[var(--secondary)]"
                                            : "border-white/20 hover:border-white/60"
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            sizes="78px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* MAIN IMAGE */}
                            <div className="order-1 sm:order-2">
                                <div className="group relative aspect-[1.05/1] overflow-hidden rounded-[24px] border border-white/15 bg-[#273139] sm:aspect-[1.1/1]">
                                    <Image
                                        key={selectedImage}
                                        src={selectedImage}
                                        alt={product.name}
                                        fill
                                        priority={activeImage === 0}
                                        sizes="(max-width: 1024px) 100vw, 55vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* DISCOUNT */}
                                    {discountPercent > 0 && (
                                        <div className="absolute left-5 top-5 rounded-full bg-[var(--secondary)] px-4 py-2 text-xs font-bold text-white">
                                            {discountPercent}% OFF
                                        </div>
                                    )}

                                    {/* EXPAND */}
                                    <button
                                        type="button"
                                        onClick={() => setLightboxOpen(true)}
                                        aria-label="Expand product image"
                                        className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--primary)] transition hover:bg-[var(--secondary)] hover:text-white"
                                    >
                                        <Expand size={18} />
                                    </button>

                                    {/* GALLERY ARROWS */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={previousImage}
                                                aria-label="Previous image"
                                                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-[var(--secondary)]"
                                            >
                                                <ArrowLeft size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={nextImage}
                                                aria-label="Next image"
                                                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-[var(--secondary)]"
                                            >
                                                <ArrowRight size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>

                                <p className="mt-3 text-right text-xs tracking-widest text-white/50">
                                    {String(activeImage + 1).padStart(2, "0")}
                                    {" / "}
                                    {String(images.length).padStart(2, "0")}
                                </p>
                            </div>
                        </div>

                        {/* ======================================
                RIGHT PRODUCT INFORMATION
            ====================================== */}
                        <div className="product-reveal">

                            {/* CATEGORY */}
                            <div className="mb-5 flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--secondary)]">
                                    {category.categoryName}
                                </span>

                                <span className="h-px w-12 bg-[var(--secondary)]" />
                            </div>

                            {/* TITLE */}
                            <h1 className="text-[clamp(3rem,5vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                                {product.name}
                            </h1>

                            {/* TAGLINE */}
                            <p className="mt-4 text-lg font-medium text-white/70">
                                {category.excerpt}
                            </p>

                            {/* DESCRIPTION */}
                            <p className="mt-6 max-w-[600px] text-sm leading-8 text-white/65 sm:text-base">
                                {product.shortDescription ||
                                    category.description}
                            </p>

                            {/* PRICE */}
                            {typeof product.price === "number" && (
                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <span className="text-[clamp(2.5rem,4vw,3.6rem)] font-bold tracking-[-0.04em] text-[var(--secondary)]">
                                        {formatPrice(product.price)}
                                    </span>

                                    {discount > 0 && (
                                        <>
                                            <span className="text-lg text-white/45 line-through">
                                                {formatPrice(product.oldPrice)}
                                            </span>

                                            <span className="rounded-full bg-[var(--secondary)]/15 px-4 py-2 text-xs font-semibold text-[var(--secondary)]">
                                                Save {formatPrice(discount)}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* BENEFITS */}
                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    { icon: ShieldCheck, title: "Durable", sub: "Construction" },
                                    { icon: Layers3, title: "Premium", sub: "Materials" },
                                    { icon: Wrench, title: "Easy", sub: "Maintenance" },
                                    { icon: Sparkles, title: "Modern", sub: "Design" },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center"
                                        >
                                            <Icon
                                                size={22}
                                                className="mx-auto mb-3 text-[var(--secondary)]"
                                            />

                                            <p className="text-xs font-semibold">
                                                {item.title}
                                            </p>

                                            <p className="mt-1 text-[11px] text-white/50">
                                                {item.sub}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* CTA BUTTONS */}
                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <Link
                                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                                    className="group flex min-h-[56px] items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-6 text-sm font-semibold text-white transition hover:brightness-110"
                                >
                                    Request a Quote

                                    <ArrowUpRight
                                        size={19}
                                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    href={whatsappLink}
                                    target={WHATSAPP_NUMBER ? "_blank" : undefined}
                                    rel={WHATSAPP_NUMBER ? "noopener noreferrer" : undefined}
                                    className="flex min-h-[56px] items-center justify-center gap-3 rounded-xl border border-white/50 px-6 text-sm font-semibold text-white transition hover:border-[var(--secondary)] hover:bg-[var(--secondary)]"
                                >
                                    <MessageCircle size={19} />
                                    Talk to an Expert
                                </Link>
                            </div>

                            {/* PROJECT NOTE */}
                            <div className="mt-6 flex items-start gap-3 text-sm text-white/60">
                                <Check
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[var(--secondary)]"
                                />

                                Custom sizes and configurations available
                                according to your project requirements.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--border-color)] bg-[#f7f9f8] py-10">
                <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-6 px-5 sm:px-8 md:grid-cols-4 lg:px-12">
                    {[
                        {
                            icon: Layers3,
                            title: "Premium Materials",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Built for Durability",
                        },
                        {
                            icon: Wrench,
                            title: "Easy Maintenance",
                        },
                        {
                            icon: Sparkles,
                            title: "Modern Aesthetics",
                        },
                    ].map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="flex flex-col items-center gap-3 border-r border-[var(--border-color)] text-center last:border-r-0"
                            >
                                <Icon
                                    size={30}
                                    strokeWidth={1.5}
                                    className="text-[var(--secondary)]"
                                />

                                <h3 className="text-sm font-semibold text-[var(--primary)]">
                                    {feature.title}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </section>

            {features.length > 0 && (
                <section className="bg-white py-10 lg:py-15">
                    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Why Choose This System
                                </p>

                                <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-[1.1] tracking-[-0.045em]">
                                    Key <span className="text-[var(--secondary)]">Features.</span>
                                </h2>
                            </div>

                            <p className="max-w-[430px] text-sm leading-7 text-[var(--text-secondary)]">
                                Designed to combine reliable construction,
                                modern aesthetics, and dependable everyday
                                performance.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {features.map((feature, index) => (
                                <div
                                    key={`${feature.name}-${index}`}
                                    className="group relative overflow-hidden rounded-[22px] border border-[var(--border-color)] bg-[#f7f9f8] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]"
                                >
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                                            {index % 3 === 0 ? (
                                                <ShieldCheck size={26} />
                                            ) : index % 3 === 1 ? (
                                                <Layers3 size={26} />
                                            ) : (
                                                <Wrench size={26} />
                                            )}
                                        </div>

                                        <span className="text-sm font-semibold text-[var(--secondary)]/50">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em]">
                                        {feature.name}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                                        {feature.description}
                                    </p>

                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--secondary)] transition-all duration-500 group-hover:w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-[#f7f9f8] py-10 lg:py-14">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                    <div className="grid items-start gap-7 lg:grid-cols-2">

                        {/* SPECIFICATIONS */}
                        <div className="rounded-[26px] border border-[var(--border-color)] bg-white p-5 sm:p-8">
                            <div className="mb-8">
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--secondary)]">
                                    Product Information
                                </p>

                                <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                                    Technical Specifications
                                </h2>

                                <div className="mt-4 h-1 w-12 rounded-full bg-[var(--secondary)]" />
                            </div>

                            {specifications.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
                                        <table className="w-full min-w-[450px] border-collapse text-left text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="bg-[var(--primary)] px-4 py-4 font-semibold text-white">
                                                        Specification
                                                    </th>

                                                    <th className="bg-[var(--secondary)] px-4 py-4 font-semibold text-white">
                                                        Regular Cubicle
                                                    </th>

                                                    <th className="bg-[#dff3ef] px-4 py-4 font-semibold text-[var(--primary)]">
                                                        Accessible Cubicle
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {visibleSpecs.map((spec, index) => (
                                                    <tr
                                                        key={`${spec.name}-${index}`}
                                                        className="border-t border-[var(--border-color)]"
                                                    >
                                                        <td className="px-4 py-4 font-medium">
                                                            {spec.name}
                                                        </td>

                                                        <td className="px-4 py-4 text-[var(--text-secondary)]">
                                                            {spec.regular ?? "—"}
                                                        </td>

                                                        <td className="px-4 py-4 text-[var(--text-secondary)]">
                                                            {spec.speciallyAbled ?? "—"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {specifications.length > 6 && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllSpecs((value) => !value)}
                                            className="mt-5 text-sm font-semibold text-[var(--secondary)] hover:underline"
                                        >
                                            {showAllSpecs
                                                ? "Show Less"
                                                : "View All Specifications"}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Technical specifications are available on request.
                                </p>
                            )}
                        </div>


                        {/* HARDWARE DETAILS WITH SWIPER */}
                        <div className="rounded-[26px] border border-[var(--border-color)] bg-white p-5 sm:p-8">

                            {/* HEADER */}
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--secondary)]">
                                        Product Components
                                    </p>

                                    <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                                        Hardware Details
                                    </h2>

                                    <div className="mt-2 h-1 w-12 rounded-full bg-[var(--secondary)]" />
                                </div>

                                {/* CUSTOM NAVIGATION */}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="hardware-prev flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-[var(--primary)] transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                        aria-label="Previous hardware image"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        className="hardware-next flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-[var(--primary)] transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                        aria-label="Next hardware image"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* HARDWARE IMAGE SWIPER */}
                            {product.hardwareImges?.length > 0 ? (
                                <div className="hardware-swiper relative">

                                    <Swiper
                                        modules={[Autoplay, Navigation, Pagination]}
                                        slidesPerView={2}
                                        spaceBetween={16}
                                        loop={product.hardwareImges.length > 2}
                                        speed={700}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true,
                                        }}
                                        navigation={{
                                            prevEl: ".hardware-prev",
                                            nextEl: ".hardware-next",
                                        }}
                                        pagination={{
                                            el: ".hardware-pagination",
                                            clickable: true,
                                        }}
                                        observer={true}
                                        observeParents={true}
                                        className="pb-5!"
                                    >
                                        {product.hardwareImges.map((image, index) => (
                                            <SwiperSlide key={`${image}-${index}`}>
                                                <div className="group">
                                                    {/* IMAGE */}
                                                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f1f3f2]">
                                                        <Image
                                                            src={image}
                                                            alt={`${product.name} Hardware ${index + 1}`}
                                                            fill
                                                            sizes="(max-width: 640px) 45vw, 25vw"
                                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                                        />

                                                        {/* IMAGE NUMBER */}
                                                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[var(--primary)] shadow-sm">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                    </div>

                                                    {/* CONTENT */}
                                                    <div className="mt-4">
                                                        <h3 className="text-sm font-semibold text-[var(--primary)]">
                                                            Hardware Component {String(index + 1).padStart(2, "0")}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* PAGINATION */}
                                    <div className="hardware-pagination mt-5 flex justify-center gap-2" />
                                </div>
                            ) : (
                                <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl bg-[#f7f9f8] p-6 text-center">
                                    <Wrench
                                        size={35}
                                        className="mb-4 text-[var(--secondary)]"
                                    />

                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Contact our team for hardware specifications and installation details.
                                    </p>
                                </div>
                            )}

                            {/* REQUEST TECHNICAL DETAILS */}
                            <Link
                                href={`/contact-us`}
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] transition hover:gap-3"
                            >
                                Request Technical Details
                                <ArrowUpRight size={17} />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[var(--primary)] py-10 text-white lg:py-15">
                <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[var(--secondary)]/15 blur-[100px]" />

                <div className="relative mx-auto flex max-w-[1500px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Built for Better Spaces
                        </p>

                        <h2 className="max-w-[750px] text-[clamp(2.3rem,4vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
                            Premium Cubicle Systems for
                            <span className="text-[var(--secondary)]">
                                {" "}Modern Spaces.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[620px] text-sm leading-7 text-white/60 sm:text-base">
                            From offices and commercial buildings to institutions
                            and public facilities, our systems are designed for
                            reliable everyday performance.
                        </p>
                    </div>

                    <Link
                        href={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-8 py-5 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                        Discuss Your Project
                        <ArrowUpRight size={19} />
                    </Link>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="bg-white py-10 lg:py-15">
                    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                        <div className="mb-8 flex items-end justify-between gap-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                    Explore More
                                </p>

                                <h2 className="text-[clamp(2.2rem,4vw,4rem)] font-semibold tracking-[-0.045em]">
                                    Related <span className="text-[var(--secondary)]">Products.</span>
                                </h2>
                            </div>

                            <Link
                                href="/products"
                                className="hidden items-center gap-2 text-sm font-semibold text-[var(--secondary)] sm:flex"
                            >
                                All Products
                                <ArrowUpRight size={18} />
                            </Link>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/products/${item.slug}`}
                                    className="group overflow-hidden rounded-[22px] border border-[var(--border-color)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 text-xs leading-6 text-[var(--text-secondary)]">
                                            {item.shortDescription}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between">
                                            <span className="text-lg font-bold text-[var(--secondary)]">
                                                {formatPrice(item.price)}
                                            </span>

                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white transition group-hover:bg-[var(--secondary)]">
                                                <ArrowUpRight size={18} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {lightboxOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${product.name} image gallery`}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-5"
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close gallery"
                        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                        <X size={23} />
                    </button>

                    <div className="relative h-[75vh] w-full max-w-[1100px]">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            sizes="100vw"
                            className="object-contain"
                        />
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={previousImage}
                                aria-label="Previous gallery image"
                                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[var(--secondary)] sm:left-8"
                            >
                                <ArrowLeft size={21} />
                            </button>

                            <button
                                type="button"
                                onClick={nextImage}
                                aria-label="Next gallery image"
                                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[var(--secondary)] sm:right-8"
                            >
                                <ArrowRight size={21} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
