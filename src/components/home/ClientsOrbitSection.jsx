
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Building2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// All your client logos.
// Only five are displayed at a time.
const CLIENTS = [
    { id: 1, src: "/clients/client5.webp", name: "McDonald's" },
    { id: 2, src: "/clients/client6.png", name: "Delhi Metro" },
    { id: 3, src: "/clients/client6.webp", name: "Mercedes" },
    { id: 4, src: "/clients/client7.png", name: "Yamaha" },
    { id: 5, src: "/clients/Apple (2).webp", name: "Apple" },
    { id: 6, src: "/clients/kfc.webp", name: "KFC" },
    { id: 7, src: "/clients/mag.webp", name: "MAC" },
    { id: 8, src: "/clients/maruti.webp", name: "Maruti Suzuki" },
];

// Positions across the upper half-circle.
// Coordinates are percentages of the orbit container.
const POSITIONS = [
    { x: 9, y: 79 },
    { x: 25, y: 29 },
    { x: 50, y: 10 },
    { x: 75, y: 29 },
    { x: 91, y: 79 },
];

const VISIBLE_COUNT = 5;

export default function ClientsOrbitSection() {
    const sectionRef = useRef(null);
    const intervalRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const visibleClients = Array.from(
        { length: Math.min(VISIBLE_COUNT, CLIENTS.length) },
        (_, index) => CLIENTS[(activeIndex + index) % CLIENTS.length]
    );

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % CLIENTS.length);
    };

    const previous = () => {
        setActiveIndex(
            (prev) => (prev - 1 + CLIENTS.length) % CLIENTS.length
        );
    };

    // Automatic client rotation.
    useEffect(() => {
        if (paused || CLIENTS.length <= VISIBLE_COUNT) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        intervalRef.current = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CLIENTS.length);
        }, 3000);

        return () => {
            window.clearInterval(intervalRef.current);
        };
    }, [paused]);

    // Scroll reveal and SVG animation.
    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.from(".clients-heading", {
                opacity: 0,
                y: 35,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".clients-heading",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".clients-orbit", {
                opacity: 0,
                y: 45,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".clients-orbit",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".clients-center", {
                opacity: 0,
                y: 25,
                duration: 0.9,
                delay: 0.25,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".clients-orbit",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.fromTo(
                ".orbit-draw",
                {
                    strokeDasharray: 1800,
                    strokeDashoffset: 1800,
                },
                {
                    strokeDashoffset: 0,
                    duration: 2.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: ".clients-orbit",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.to(".orbit-glow", {
                opacity: 0.35,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative isolate overflow-hidden border-t border-[var(--border-color)] bg-[var(--background)] py-10 text-[var(--text-primary)]"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-[45%] h-[400px] w-[650px] -translate-x-1/2 rounded-full bg-[var(--secondary)]/[0.045] blur-[110px]" />

            <div className="relative mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
                {/* HEADER */}
                <div className="clients-heading mb-20 text-center">
                    <div className="mb-2 flex items-center justify-center gap-4">
                        <span className="h-px w-9 bg-[var(--secondary)]" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Our Trusted Network
                        </span>

                        <span className="h-px w-9 bg-[var(--secondary)]" />
                    </div>

                    <h2 className="text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.055em]">
                        Trusted by{" "}
                        <span className="text-[var(--secondary)]">
                            Leading Organizations.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                        Trusted partnerships built through quality, precision,
                        and dependable restroom cubicle solutions.
                    </p>
                </div>

                <div className="clients-orbit relative mx-auto aspect-[2.5/1] w-full max-w-[1120px]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setPaused(false);
                        }
                    }}
                >
                    {/* Animated SVG semicircle */}
                    <svg
                        viewBox="0 0 1120 605"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id="half-orbit-gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#00a896"
                                    stopOpacity="0.08"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#00a896"
                                    stopOpacity="0.65"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#d9a000"
                                    stopOpacity="0.12"
                                />
                            </linearGradient>

                            <linearGradient
                                id="inner-orbit-gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#00a896"
                                    stopOpacity="0.04"
                                />
                                <stop
                                    offset="50%"
                                    stopColor="#00a896"
                                    stopOpacity="0.15"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#00a896"
                                    stopOpacity="0.04"
                                />
                            </linearGradient>
                        </defs>

                        {/* Main half-circle */}
                        <path
                            className="orbit-draw"
                            d="M100 478 A460 460 0 0 1 1020 478"
                            fill="none"
                            stroke="url(#half-orbit-gradient)"
                            strokeWidth="1.5"
                        />

                        {/* Inner half-circle */}
                        <path
                            d="M250 478 A310 310 0 0 1 870 478"
                            fill="none"
                            stroke="url(#inner-orbit-gradient)"
                            strokeWidth="1.2"
                        />

                        {/* Soft central glow */}
                        <ellipse
                            className="orbit-glow"
                            cx="560"
                            cy="600"
                            rx="340"
                            ry="250"
                            fill="#00a896"
                            opacity="0.05"
                        />

                        {/* Small decorative dots */}
                        <circle cx="100" cy="478" r="4" fill="#00a896" />
                        <circle cx="1020" cy="478" r="4" fill="#d9a000" />
                    </svg>

                    {/* FIVE CLIENT LOGOS */}
                    {visibleClients.map((client, index) => {
                        const position = POSITIONS[index];

                        return (
                            <div
                                key={`slot-${index}`}
                                className="absolute z-20 flex w-[17%] -translate-x-1/2 -translate-y-1/2 flex-col items-center sm:w-[15%]"
                                style={{
                                    left: `${position.x}%`,
                                    top: `${position.y}%`,
                                }}
                            >
                                <div
                                    key={client.id}
                                    className="animate-[clientLogoEnter_650ms_ease-out_both] w-full"
                                >
                                    <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-[18px] border border-[var(--border-color)] bg-white p-2 shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-[var(--secondary)] hover:shadow-[0_20px_45px_rgba(0,168,150,0.12)] sm:rounded-[24px] sm:p-3">
                                        <Image
                                            src={client.src}
                                            alt={client.name}
                                            fill
                                            sizes="(max-width: 640px) 80px, 140px"
                                            className="object-contain p-2 sm:p-4"
                                        />
                                    </div>

                                    <p className="mt-3 hidden text-center text-[13px] font-semibold text-[var(--text-primary)] sm:block">
                                        {client.name}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* CENTER CONTENT */}
                    <div className="clients-center absolute bottom-[2%] left-1/2 z-10 flex w-[65%] max-w-[400px] -translate-x-1/2 flex-col items-center text-center sm:bottom-[5%]">
                        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--secondary)]/20 bg-white text-[var(--secondary)] shadow-sm">
                            <Building2 size={25} strokeWidth={1.6} />
                        </div>

                        <div className="flex items-start justify-center gap-1">
                            <span className="text-[clamp(2.5rem,7vw,4rem)] font-semibold leading-none tracking-[-0.025em] text-[var(--primary)]">
                                1 Lakh+
                            </span>
                        </div>

                        <h3 className="mt-2 text-[clamp(0.85rem,2vw,1rem)] font-semibold text-[var(--secondary)]">
                            Toilet Cubicles Installed
                        </h3>

                        <p className="mt-1 hidden max-w-[390px] text-[13px] text-[var(--text-secondary)] sm:block">
                            Delivering durable, modern restroom cubicle solutions
                            for commercial, corporate, and institutional spaces.
                        </p>
                    </div>
                </div>

                {/* BOTTOM NAVIGATION AND CTA */}
                <div className="relative z-30 mx-auto mt-5 flex max-w-[1120px] flex-col items-center justify-between gap-6 border-t border-[var(--border-color)] pt-5 sm:mt-0 sm:flex-row">
                    {/* Client controls */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous clients"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-[var(--primary)] transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <span className="min-w-[80px] text-center text-xs font-medium tracking-[0.12em] text-[var(--text-secondary)]">
                            {String(activeIndex + 1).padStart(2, "0")}
                            {" / "}
                            {String(CLIENTS.length).padStart(2, "0")}
                        </span>

                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next clients"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-[var(--primary)] transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>

                    <Link
                        href="/contact-us"
                        className="group inline-flex items-center gap-5 rounded-full bg-[var(--primary)] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary)]"
                    >
                        Become Our Next Partner

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--primary)]">
                            <ArrowUpRight size={19} />
                        </span>
                    </Link>
                </div>
            </div>

            <style jsx>{`
        @keyframes clientLogoEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.animate-\\[clientLogoEnter_650ms_ease-out_both\\]) {
            animation: none !important;
          }
        }
      `}</style>
        </section>
    );
}
