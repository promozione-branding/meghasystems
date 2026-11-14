
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const partners = [
    { name: "TESA", logo: "/clients/14 (1).webp" },
    { name: "STYLAM", logo: "/clients/15 (2).webp" },
    { name: "CENTURYPLY", logo: "/clients/16 (2).webp" },
    { name: "CROWN", logo: "/clients/17 (2).webp" },
    { name: "VIRGO", logo: "/clients/18 (2).webp" },
    { name: "GREENPLY", logo: "/clients/19 (1).webp" },
];


function AnimatedPartnerSVG() {
    return (
        <svg
            viewBox="0 0 480 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="partner-svg h-full w-full opacity-80"
        >
            <defs>
                <linearGradient id="cubiclePanel" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.13" />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.025" />
                </linearGradient>
            </defs>

            {/* Architectural floor line */}
            <path
                className="cubicle-draw"
                d="M45 278 L250 325 L443 255"
                stroke="var(--secondary)"
                strokeWidth="1.4"
                strokeOpacity="0.4"
            />

            {/* Left cubicle side panel */}
            <path
                className="cubicle-draw"
                d="M95 75 L170 40 L170 256 L95 288 Z"
                fill="url(#cubiclePanel)"
                stroke="var(--secondary)"
                strokeWidth="1.7"
            />

            {/* Middle divider */}
            <path
                className="cubicle-draw"
                d="M170 40 L260 65 L260 282 L170 256 Z"
                fill="url(#cubiclePanel)"
                stroke="var(--secondary)"
                strokeWidth="1.7"
            />

            {/* Right partition */}
            <path
                className="cubicle-draw"
                d="M260 65 L350 43 L350 260 L260 282 Z"
                fill="url(#cubiclePanel)"
                stroke="var(--secondary)"
                strokeWidth="1.7"
            />

            {/* Door frame */}
            <path
                className="cubicle-draw"
                d="M350 43 L415 68 L415 274 L350 260"
                stroke="var(--secondary)"
                strokeWidth="1.7"
            />

            {/* Animated door */}
            <g className="cubicle-door">
                <path
                    className="cubicle-draw"
                    d="M351 58 L403 78 L403 262 L351 247 Z"
                    fill="url(#cubiclePanel)"
                    stroke="var(--secondary)"
                    strokeWidth="1.8"
                />

                {/* Door handle */}
                <rect
                    x="385"
                    y="162"
                    width="7"
                    height="18"
                    rx="2"
                    fill="var(--secondary)"
                    fillOpacity="0.65"
                />
            </g>

            {/* Top rail */}
            <path
                className="cubicle-draw"
                d="M95 75 L170 40 L260 65 L350 43 L415 68"
                stroke="var(--secondary)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Cubicle legs */}
            <g stroke="var(--secondary)" strokeWidth="2">
                <path className="cubicle-draw" d="M112 281 V302" />
                <path className="cubicle-draw" d="M248 278 V301" />
                <path className="cubicle-draw" d="M400 269 V290" />
            </g>

            {/* Feet */}
            <g fill="var(--secondary)" fillOpacity="0.55">
                <rect x="105" y="300" width="14" height="4" rx="2" />
                <rect x="241" y="299" width="14" height="4" rx="2" />
                <rect x="393" y="288" width="14" height="4" rx="2" />
            </g>

            {/* Technical measurement lines */}
            <g
                stroke="var(--secondary)"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="4 6"
            >
                <path d="M68 70 V290" />
                <path d="M58 70 H80" />
                <path d="M58 290 H80" />
                <path d="M100 22 H415" />
                <path d="M100 14 V30" />
                <path d="M415 14 V30" />
            </g>

            {/* Decorative markers */}
            <circle className="cubicle-dot" cx="68" cy="70" r="3" fill="var(--secondary)" />
            <circle className="cubicle-dot" cx="68" cy="290" r="3" fill="var(--secondary)" />
            <circle className="cubicle-dot" cx="415" cy="22" r="3" fill="var(--secondary)" />
        </svg>
    );
}


export default function ChannelPartners() {
    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const update = () => setReducedMotion(media.matches);
        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const swiper = swiperRef.current;

        if (!swiper || swiper.destroyed) return;

        if (reducedMotion) {
            swiper.autoplay?.stop();
        } else {
            swiper.autoplay?.start();
        }
    }, [reducedMotion]);


    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            const cubiclePaths = gsap.utils.toArray(".cubicle-draw");

            cubiclePaths.forEach((path) => {
                if (typeof path.getTotalLength !== "function") return;

                const length = path.getTotalLength();

                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
            });

            // Minimal entrance animation
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    once: true,
                },
            })
                .fromTo(
                    ".partner-label",
                    { opacity: 0, y: 6 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                    }
                )
                .fromTo(
                    ".partner-title",
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.5"
                )
                .fromTo(
                    ".partner-marquee",
                    { opacity: 0, x: 15 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.9,
                        ease: "power2.out",
                    },
                    "-=0.6"
                );

            // Cubicle drawing animation (no position movement)
            gsap.to(cubiclePaths, {
                strokeDashoffset: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    once: true,
                },
            });

            // Very slight door animation
            gsap.to(".cubicle-door", {
                rotationY: -2,
                transformOrigin: "left center",
                transformPerspective: 600,
                duration: 5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }, section);

        return () => ctx.revert();
    }, []);



    return (
        <section
            ref={sectionRef}
            id="channel-partners"
            aria-labelledby="channel-partners-title"
            className="relative overflow-hidden bg-[#f8faf9] py-10 sm:py-12 lg:py-16"
        >
            {/* Background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full opacity-[0.06] blur-[90px]"
                style={{ background: "var(--secondary)" }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #e8eeeb 1px, transparent 1px), linear-gradient(to bottom, #e8eeeb 1px, transparent 1px)",
                    backgroundSize: "65px 65px",
                    maskImage:
                        "linear-gradient(to right, black, transparent 85%)",
                }}
            />

            <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 pl-5 pr-0 sm:pl-8 lg:grid-cols-[0.85fr_2fr] lg:gap-12 lg:pl-12">
                {/* LEFT CONTENT */}
                <div className="relative z-10 flex min-h-[210px] max-w-[400px] items-start pr-5 sm:pr-8 lg:pr-0">

                    {/* Cubicle SVG - fixed background position */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 -right-2 z-0 h-[190px] w-[270px] sm:h-[180px] sm:w-[300px]"
                    >
                        <AnimatedPartnerSVG />
                    </div>

                    <div className="relative z-10 w-full">
                        <div className="partner-label mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-[var(--secondary)]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Our Trusted Network
                            </span>
                        </div>

                        <h2
                            id="channel-partners-title"
                            className="partner-title text-[clamp(42px,5vw,50px)] font-semibold leading-[1.07] tracking-[-0.06em] text-[var(--primary)]"
                        >
                            Authorised{" "}
                            <span className="text-[var(--secondary)]">
                                Channel Partner
                            </span>
                        </h2>
                    </div>
                </div>

                {/* RIGHT MARQUEE */}
                <div className="partner-marquee relative min-w-0 overflow-hidden">

                    {/* Fade edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f8faf9] to-transparent sm:w-6" />

                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8faf9] to-transparent sm:w-20" />

                    <Swiper
                        modules={[Autoplay]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;

                            if (
                                window.matchMedia(
                                    "(prefers-reduced-motion: reduce)"
                                ).matches
                            ) {
                                swiper.autoplay?.stop();
                            }
                        }}
                        loop={true}
                        loopAdditionalSlides={6}
                        speed={4500}
                        slidesPerView={1.5}
                        spaceBetween={16}
                        grabCursor={true}
                        allowTouchMove={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 18,
                            },
                            768: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 2.5,
                                spaceBetween: 22,
                            },
                        }}
                        className="channel-partners-swiper !overflow-visible"
                    >
                        {partners.map((partner) => (
                            <SwiperSlide key={partner.name}>
                                <div className="group relative flex h-[210px] flex-col items-center justify-center overflow-hidden rounded-[20px] border border-[#e5ebe8] bg-white px-6 shadow-[0_8px_30px_rgba(0,0,0,0.025)] transition-all duration-500 hover:border-[var(--secondary)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">

                                    <div className="absolute left-5 top-5 h-1.5 w-1.5 rounded-full bg-[var(--secondary)] opacity-40 transition-opacity duration-300 group-hover:opacity-100" />

                                    <div className="relative h-[140px] w-full max-w-[250px] transition-transform duration-500">
                                        <Image
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            fill
                                            sizes="185px"
                                            className="object-cover opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                                        />
                                    </div>

                                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#88938f] transition-colors duration-300 group-hover:text-[var(--primary)]">
                                            {partner.name}
                                        </span>

                                        <ArrowUpRight
                                            size={14}
                                            className="text-[var(--secondary)] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                                        />
                                    </div>

                                    <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-[var(--secondary)] transition-all duration-500 group-hover:w-full" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
        .channel-partners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          align-items: stretch;
        }
      `}</style>
        </section>
    );
}
