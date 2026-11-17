
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    ArrowRight,
    MapPin,
    Phone,
    Mail,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Articles", href: "/our-articles" },
    { label: "Contact Us", href: "/contact-us" },
];

const PRODUCT_LINKS = [
    { label: "Toilet Cubicles", href: "/products" },
    { label: "Urinal Partitions", href: "/products" },
    { label: "Shower Cubicles", href: "/products" },
    { label: "Changing Cubicles", href: "/products" },
    { label: "Wall Cladding", href: "/products" },
    { label: "Accessories", href: "/products" },
];

const SOCIAL_LINKS = [
    { icon: FaLinkedin, label: "LinkedIn", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
    { icon: FaFacebook, label: "Facebook", href: "#" },
];

function FooterLinkColumn({ title, links }) {
    return (
        <div>
            <h3 className="mb-7 text-[17px] font-semibold tracking-[-0.025em] text-[var(--secondary)]">
                {title}
            </h3>

            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors duration-300 hover:text-[var(--secondary)]"
                        >
                            <span className="h-px w-0 bg-[var(--secondary)] transition-all duration-300 group-hover:w-3" />
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    const pathname = usePathname();
    const footerRef = useRef(null);
    if (pathname.startsWith("/admin")) {
        return null; // Don't render the navbar on admin or dashboard pages
    }
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-reveal", {
                opacity: 0,
                y: 35,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".footer-image", {
                opacity: 0,
                x: 80,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".footer-watermark", {
                opacity: 0,
                y: 45,
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    once: true,
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative isolate overflow-hidden bg-[var(--primary)] text-white"
        >
            {/* DARK BACKGROUND */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse at 85% 35%, rgba(0,168,150,0.07), transparent 45%), linear-gradient(120deg, #09171b 0%, #0b161a 50%, #071216 100%)",
                }}
            />

            {/* BIG OUTLINED BACKGROUND TEXT */}
            <div
                aria-hidden="true"
                className="footer-watermark pointer-events-none absolute left-1/2 top-0 z-0 w-full -translate-x-1/2 overflow -hidden text-center"
            >
                <span
                    className="block whitespace-nowrap text-[clamp(80px,12.5vw,230px)] font-black leading-[0.95] tracking-[-0.045em] text-transparent"
                    style={{
                        WebkitTextStroke: "1px rgba(0,168,150,0.22)",
                    }}
                >
                    Megha Systems
                </span>
            </div>

            {/* MAIN FOOTER */}
            <div className="relative z-10 mx-auto max-w-[1800px] px-5 pb-14 pt-32 sm:px-8 sm:pt-40 lg:px-14 lg:pb-15 lg:pt-48">
                <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.72fr_0.78fr_1.05fr] lg:gap-9 xl:gap-14">

                    {/* BRAND COLUMN */}
                    <div className="footer-reveal lg:border-r lg:border-white/20 lg:pr-10">
                        {/* LOGO */}
                        <Link href="/" className="inline-flex items-center gap-4">
                            <img src="/logo.webp" alt="logo" className="w-fit h-20" />
                        </Link>

                        {/* GOLD LINE */}
                        <div className="mb-2 mt-2 h-[4px] w-14 bg-[var(--accent)]" />

                        <h2 className="max-w-[350px] text-[clamp(1.8rem,2.5vw,2.8rem)] font-light leading-[1.14] tracking-[-0.04em]">
                            Innovative{" "}
                            <span className="font-serif italic">
                                Restroom
                            </span>
                            <br />
                            Cubicle{" "}
                            <span className="font-serif italic text-[var(--secondary)]">
                                Solutions.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[330px] text-[14px] leading-7 text-white/60">
                            Designing durable, hygienic, and aesthetic restroom
                            spaces for modern commercial and institutional
                            environments.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="mt-8 flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--secondary)]"
                                >
                                    <Icon size={19} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="footer-reveal">
                        <FooterLinkColumn
                            title="Quick Links"
                            links={QUICK_LINKS}
                        />
                    </div>

                    {/* PRODUCT LINKS */}
                    <div className="footer-reveal">
                        <FooterLinkColumn
                            title="Our Products"
                            links={PRODUCT_LINKS}
                        />
                    </div>

                    {/* CONTACT COLUMN */}
                    <div className="footer-reveal">
                        <h3 className="mb-7 text-[17px] font-semibold tracking-[-0.025em] text-[var(--secondary)]">
                            Get in Touch
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin
                                    size={23}
                                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                                />
                                <p className="text-[14px] leading-6 text-white/75">
                                    Megha Systems
                                    <br />
                                    Ahmedabad, Gujarat, India
                                </p>
                            </div>

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-4 text-[14px] text-white/75 transition-colors hover:text-[var(--secondary)]"
                            >
                                <Phone
                                    size={22}
                                    className="shrink-0 text-[var(--accent)]"
                                />
                                +91 98765 43210
                            </a>

                            <a
                                href="mailto:info@meghasystems.com"
                                className="flex items-center gap-4 text-[14px] text-white/75 transition-colors hover:text-[var(--secondary)]"
                            >
                                <Mail
                                    size={22}
                                    className="shrink-0 text-[var(--accent)]"
                                />
                                info@meghasystems.com
                            </a>
                        </div>

                        {/* ENQUIRY BUTTON */}
                        <Link
                            href="/contact-us"
                            className="group mt-9 inline-flex items-center gap-8 rounded-full border border-[var(--secondary)] py-2 pl-6 pr-2 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary)]"
                        >
                            Enquire Now

                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-white">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* IMAGE SHOWCASE */}
                {/* <div className="footer-image relative mt-16 h-[260px] overflow-hidden rounded-[35px] border-t-2 border-[var(--accent)] sm:h-[350px] lg:mt-20 lg:h-[440px] lg:rounded-[70px_70px_25px_25px]">
                    <Image
                        src="/products/Neo.webp"
                        alt="Modern toilet cubicles by Megha Systems"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#071216]/60 via-transparent to-transparent" />

                    <div className="absolute bottom-7 left-7 sm:bottom-10 sm:left-10">
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75">
                            Built to Last
                        </p>

                        <h3 className="max-w-[550px] text-2xl font-medium tracking-[-0.04em] sm:text-4xl">
                            Complete Restroom
                            <br />
                            Solutions.
                        </h3>
                    </div>

                    <Link
                        href="/products"
                        aria-label="Explore our products"
                        className="absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)] text-white transition-transform duration-300 hover:rotate-45 sm:bottom-10 sm:right-10"
                    >
                        <ArrowUpRight size={22} />
                    </Link>
                </div> */}
            </div>

            {/* TEAL DECORATIVE WAVE */}
            <div className="pointer-events-none absolute bottom-[80px] left-0 z-0 hidden w-[40%] lg:block">
                <svg
                    viewBox="0 0 650 150"
                    fill="none"
                    className="w-full"
                    aria-hidden="true"
                >
                    <path
                        d="M0 0C130 100 250 130 400 110C520 90 570 95 650 150H0V0Z"
                        fill="var(--secondary)"
                        fillOpacity="0.22"
                    />
                    <path
                        d="M0 85C140 145 270 140 410 120C520 105 580 110 650 150"
                        stroke="var(--secondary)"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>

            {/* COPYRIGHT BAR */}
            <div className="relative z-10 mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-14">
                <div className="flex flex-col justify-between gap-5 border-t border-white/25 py-8 text-[12px] text-white/60 md:flex-row md:items-center">
                    <p>
                        © {new Date().getFullYear()} Megha Systems.
                        All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <Link
                            href="/privacy-policy"
                            className="transition-colors hover:text-[var(--secondary)]"
                        >
                            Privacy Policy
                        </Link>

                        <span className="text-white/25">|</span>

                        <Link
                            href="/terms-and-conditions"
                            className="transition-colors hover:text-[var(--secondary)]"
                        >
                            Terms & Conditions
                        </Link>

                        <span className="text-white/25">|</span>

                        <Link
                            href="/sitemap.xml"
                            className="transition-colors hover:text-[var(--secondary)]"
                        >
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
