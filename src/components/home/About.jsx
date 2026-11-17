
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    ArrowRight,
    Award,
    Building2,
    Layers3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        value: "25+",
        label: "Years of Excellence",
        icon: Award,
    },
    {
        value: "5,000+",
        label: "Projects Completed",
        icon: Building2,
    },
    {
        value: "1 Lakh+",
        label: "Cubicles Installed",
        icon: Layers3,
    },
];

export default function About() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            // Image reveal
            gsap.fromTo(
                ".about-image",
                {
                    y: 70,
                    opacity: 0,
                    scale: 0.94,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                }
            );

            // Secondary image
            gsap.fromTo(
                ".about-image-small",
                {
                    x: -40,
                    y: 40,
                    opacity: 0,
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                }
            );

            // Text animation
            gsap.fromTo(
                ".about-reveal",
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-content",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            // Statistics animation
            gsap.fromTo(
                ".about-stat",
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-stats",
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            // Subtle parallax on image
            gsap.to(imageRef.current, {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative isolate overflow-hidden bg-[var(--background)] py-10 sm:py-12 lg:py-15"
        >
            {/* Architectural Blueprint Background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <Image
                    src="/about.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/10 via-[var(--background)]/25 to-[var(--background)]/50" />
            </div>

            <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:gap-24">
                {/* Left Side Images */}
                <div className="relative min-w-0">
                    <div
                        ref={imageRef}
                        className="relative mx-auto max-w-[650px] pb-12 pl-5 pr-5 pt-5 sm:pb-16 sm:pl-8 sm:pr-10"
                    >
                        {/* Decorative shape */}
                        <div className="absolute left-0 top-0 h-[85%] w-[72%] rounded-[90px_30px_100px_30px] bg-[var(--secondary)] sm:rounded-[150px_40px_140px_40px]" />

                        {/* Main Image */}
                        <div className="about-image relative ml-4 h-[390px] overflow-hidden rounded-[100px_25px_100px_25px] border-[6px] border-white bg-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.14)] sm:ml-8 sm:h-[500px] sm:rounded-[170px_30px_140px_30px] lg:h-[570px]">
                            <Image
                                src="/products/Black Maxi.webp"
                                alt="Premium Megha Systems restroom cubicle partitions"
                                fill
                                sizes="(max-width: 1024px) 90vw, 45vw"
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Secondary Image */}
                        <div className="about-image-small absolute bottom-0 left-0 h-[190px] w-[170px] overflow-hidden rounded-[60px_18px_60px_18px] border-[5px] border-white bg-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:h-[250px] sm:w-[240px] sm:rounded-[90px_20px_90px_20px]">
                            <Image
                                src="/products/Cielo.webp"
                                alt="Modern designer restroom partition system"
                                fill
                                sizes="(max-width: 640px) 170px, 240px"
                                className="object-cover"
                            />
                        </div>

                        {/* Small decorative border */}
                        <div className="pointer-events-none absolute bottom-4 right-3 h-24 w-24 rounded-br-[70px] border-b-2 border-r-2 border-[var(--secondary)] sm:h-36 sm:w-36" />
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="about-content relative">
                    {/* Eyebrow */}
                    <div className="about-reveal mb-6 flex items-center gap-4">
                        <span className="h-[2px] w-10 bg-[var(--secondary)]" />

                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--secondary)] sm:text-xs">
                            About Megha Systems
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="about-reveal max-w-[800px] text-[clamp(37px,4vw,66px)] font-semibold leading-[1] tracking-[-0.045em] text-[var(--primary)]">
                        Toilet Cubicle Partition,
                        <br />
                        <span className="text-[var(--secondary)]">
                            Built to Perform.
                        </span>
                    </h2>

                    {/* Description */}
                    <div className="about-reveal mt-7 border-l-[3px] border-[var(--secondary)] pl-5 sm:pl-6">
                        <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                            Established in <strong className="text-[var(--primary)]">2012</strong>,
                            Megha Systems has grown into a trusted name in
                            toilet cubicle and restroom partition solutions.
                            With expertise spanning design, manufacturing,
                            and installation, we deliver complete washroom
                            solutions built for modern commercial and
                            institutional spaces.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                            Led by{" "}
                            <strong className="text-[var(--primary)]">
                                Mr. Rakesh Talwar
                            </strong>
                            , with over 25 years of industry experience,
                            our approach combines technical expertise,
                            premium materials, innovative design, and
                            meticulous execution. Every project reflects
                            our commitment to quality, precision, and
                            lasting performance.
                        </p>
                    </div>

                    {/* Stats */}
                    {/* <div className="about-stats mt-9 grid grid-cols-3 gap-3 border-y border-[var(--border-color)] py-6 sm:gap-5">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="about-stat min-w-0"
                                >
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] sm:h-12 sm:w-12">
                                        <Icon size={22} strokeWidth={1.7} />
                                    </div>

                                    <h3 className="text-[clamp(20px,2.3vw,35px)] font-bold tracking-[-0.04em] text-[var(--primary)]">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-1 text-[10px] leading-4 text-[var(--text-secondary)] sm:text-xs sm:leading-5">
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div> */}

                    {/* Buttons */}
                    <div className="about-reveal mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                        <Link
                            href="/about-us"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary)]"
                        >
                            More About Us

                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>

                        <Link
                            href="/contact-us"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--primary)]/20 bg-white/60 px-6 py-4 text-sm font-semibold text-[var(--primary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                        >
                            Contact Us

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
