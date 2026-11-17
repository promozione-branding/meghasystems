
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowUpRight,
    ChevronDown,
    Menu,
    X,
    PhoneCall,
    ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { allProducts } from "@/utils/data";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    {
        name: "Our Products",
        href: "/products",
        children: [
            ...allProducts.map((category) => ({
                name: category.categoryName,
                href: `/products#${category.slug}`,
            })),
            { name: "All Products", href: "/products" },
        ],
    },
    { name: "Our Projects", href: "/projects" },
    { name: "Contact", href: "/contact-us" },
];

const phoneNumber = "+919873735716";
const displayPhone = "+91 9873735716";

export default function Navbar() {
    const pathname = usePathname();
    const navbarRef = useRef(null);
    const mobileRef = useRef(null);
    if (pathname.startsWith("/admin")) {
        return null; // Don't render the navbar on admin or dashboard pages
    }
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Scroll state
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Navbar entrance animation
    useEffect(() => {
        if (!navbarRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                navbarRef.current,
                { y: -90, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                }
            );
        }, navbarRef);

        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!menuOpen || !mobileRef.current) return;

        const animation = gsap.fromTo(
            mobileRef.current,
            { opacity: 0, y: -12 },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            }
        );

        return () => animation.kill();
    }, [menuOpen]);

    // Escape key closes menu
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                setOpenDropdown(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    const closeMenu = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
    };

    const isActive = (href) => {
        return (
            pathname === href ||
            (href !== "/" && pathname.startsWith(href + "/"))
        );
    };

    return (
        <header
            ref={navbarRef}
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5"
                }`}
        >
            <div
                className={`mx-auto transition-all duration-500 ${scrolled
                    ? "max-w-[1400px] px-3 md:px-5"
                    : "max-w-[1500px] px-4 md:px-8"
                    }`}
            >
                <nav
                    aria-label="Main navigation"
                    className={`relative flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/95 backdrop-blur-xl transition-all duration-500 ${scrolled
                        ? "px-4 py-2.5 shadow-xl md:px-6"
                        : "px-4 py-3 shadow-lg md:px-7"
                        }`}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="relative z-10 flex shrink-0 items-center"
                    >
                        <Image
                            src="/logo.webp"
                            alt="Megha Systems"
                            width={210}
                            height={68}
                            priority
                            className={`w-auto object-contain transition-all duration-500 ${scrolled
                                ? "h-[43px] sm:h-[50px]"
                                : "h-[48px] sm:h-[58px]"
                                }`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-0.5 xl:flex">
                        {navLinks.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <div
                                    key={item.name}
                                    className="group relative"
                                >
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-3 text-[13px] font-semibold transition-colors duration-300 2xl:px-4 2xl:text-sm ${active
                                            ? "text-[var(--secondary)]"
                                            : "text-[var(--text-primary)] hover:text-[var(--secondary)]"
                                            }`}
                                    >
                                        {item.name}

                                        {item.children && (
                                            <ChevronDown
                                                size={14}
                                                className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                                            />
                                        )}

                                        <span
                                            className={`absolute bottom-1 left-3 right-3 h-[2px] origin-left bg-[var(--secondary)] transition-transform duration-300 ${active
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"
                                                }`}
                                        />
                                    </Link>

                                    {/* Desktop Dropdown */}
                                    {item.children && (
                                        <div className="invisible absolute left-0 top-full z-50 w-[245px] translate-y-3 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                            <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-2 shadow-xl">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="group/sub flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background)] hover:text-[var(--secondary)]"
                                                    >
                                                        {child.name}

                                                        <ArrowUpRight
                                                            size={15}
                                                            className="opacity-0 transition-opacity group-hover/sub:opacity-100"
                                                        />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Buttons */}
                    <div className="flex shrink-0 items-center gap-2">
                        <a
                            href={`tel:${phoneNumber}`}
                            className="hidden items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-3 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] 2xl:flex"
                        >
                            <PhoneCall size={17} />
                            {displayPhone}
                        </a>

                        <Link
                            href="/contact-us"
                            className="group hidden items-center gap-2 rounded-xl bg-[var(--secondary)] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--primary)] lg:flex"
                        >
                            Get a Quote

                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="megha-mobile-menu"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white transition-colors duration-300 hover:bg-[var(--secondary)] xl:hidden"
                        >
                            {menuOpen ? <X size={23} /> : <Menu size={23} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div
                        id="megha-mobile-menu"
                        ref={mobileRef}
                        className="mt-2 max-h-[calc(100dvh-110px)] overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 shadow-xl xl:hidden"
                    >
                        <div className="flex flex-col">
                            {navLinks.map((item) => {
                                const active = isActive(item.href);

                                return (
                                    <div
                                        key={item.name}
                                        className="border-b border-[var(--border-color)] last:border-0"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={item.href}
                                                onClick={closeMenu}
                                                aria-current={active ? "page" : undefined}
                                                className={`flex-1 py-4 text-[15px] font-semibold ${active
                                                    ? "text-[var(--secondary)]"
                                                    : "text-[var(--text-primary)]"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>

                                            {item.children && (
                                                <button
                                                    type="button"
                                                    aria-label={`Toggle ${item.name}`}
                                                    aria-expanded={openDropdown === item.name}
                                                    onClick={() =>
                                                        setOpenDropdown((prev) =>
                                                            prev === item.name ? null : item.name
                                                        )
                                                    }
                                                    className="flex h-10 w-10 items-center justify-center text-[var(--text-primary)]"
                                                >
                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform duration-300 ${openDropdown === item.name
                                                            ? "rotate-180"
                                                            : ""
                                                            }`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Mobile Dropdown */}
                                        {item.children &&
                                            openDropdown === item.name && (
                                                <div className="mb-3 space-y-1 rounded-xl bg-[var(--background)] p-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.name}
                                                            href={child.href}
                                                            onClick={closeMenu}
                                                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--secondary)]"
                                                        >
                                                            {child.name}
                                                            <ArrowRight size={15} />
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile Actions */}
                        <div className="mt-5 grid gap-3">
                            <Link
                                href="/contact-us"
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-[var(--primary)]"
                            >
                                Get a Free Quote
                                <ArrowUpRight size={18} />
                            </Link>

                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]"
                            >
                                <PhoneCall size={17} />
                                {displayPhone}
                            </a>
                        </div>

                        <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
                            Premium Restroom Cubicle Solutions
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
}
