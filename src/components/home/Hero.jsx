
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const typingTexts = [
    "Modern Restroom Spaces.",
    "Premium Toilet Cubicles.",
    "Innovative Partition Systems.",
    "Spaces Built to Last.",
];

export default function Hero() {
    const heroRef = useRef(null);
    const videoRef = useRef(null);

    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Reduced motion preference
    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const updatePreference = () => {
            setReducedMotion(media.matches);
        };

        updatePreference();

        media.addEventListener("change", updatePreference);

        return () => {
            media.removeEventListener("change", updatePreference);
        };
    }, []);

    // Smooth typing animation
    useEffect(() => {
        if (reducedMotion) return;

        const currentText = typingTexts[textIndex];

        let delay = isDeleting ? 40 : 85;

        // Pause after completing text
        if (!isDeleting && displayText === currentText) {
            delay = 1800;
        }

        // Pause before typing next text
        if (isDeleting && displayText === "") {
            delay = 300;
        }

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === currentText) {
                setIsDeleting(true);
                return;
            }

            if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setTextIndex(
                    (prev) => (prev + 1) % typingTexts.length
                );
                return;
            }

            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentText.slice(0, prev.length + 1)
            );
        }, delay);

        return () => clearTimeout(timer);
    }, [displayText, textIndex, isDeleting, reducedMotion]);

    // Premium entrance animation
    useEffect(() => {
        if (!heroRef.current || reducedMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.fromTo(
                ".hero-eyebrow",
                {
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.3,
                }
            )
                .fromTo(
                    ".hero-title",
                    {
                        y: 65,
                        opacity: 0,
                        filter: "blur(8px)",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                    },
                    "-=0.45"
                )
                .fromTo(
                    ".hero-typing",
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.85,
                    },
                    "-=0.5"
                )
                .fromTo(
                    ".hero-button",
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                    },
                    "-=0.4"
                );
        }, heroRef);

        return () => ctx.revert();
    }, [reducedMotion]);

    // Video playback
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (reducedMotion) {
            video.pause();
            return;
        }

        video.play().catch(() => { });
    }, [reducedMotion]);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative isolate flex min-h-[620px] min-h-[90svh] w-full items-center justify-center overflow-hidden bg-[var(--primary)] text-white"
        >
            {/* Background Video */}
            <div className="absolute inset-0 -z-20">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/hero-poster.webp"
                    className="h-full w-full object-cover"
                >
                    <source
                        src="/video/CLIP 4 COMPRESSED.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 -z-10 bg-black/20" />

            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-5 pb-20 pt-36 text-center sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
                <div className="flex w-full max-w-[1100px] flex-col items-center">

                    {/* Eyebrow */}
                    <div className="hero-eyebrow mb-2 flex items-center justify-center gap-4">
                        <span className="h-px w-8 bg-[var(--secondary)] sm:w-12" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-xs">
                            Megha Systems
                        </span>

                        {/* <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)]" />

                        <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 sm:inline">
                            Restroom Cubicle Solutions
                        </span> */}

                        <span className="h-px w-8 bg-[var(--secondary)] sm:w-12" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="hero-title text-center text-[clamp(46px,7vw,100px)] font-semibold leading-[1.04] tracking-[-0.055em]">
                        Redefining Every Space.
                    </h1>

                    {/* Typing Text */}
                    <div className="hero-typing mt-8 flex min-h-[80px] w-full items-start justify-center">
                        <h2 className="max-w-[1000px] text-center text-[clamp(24px,3.5vw,52px)] font-medium leading-[1.25] tracking-[-0.035em] text-white">
                            <span aria-hidden="true">
                                {reducedMotion ? typingTexts[0] : displayText}
                            </span>

                            {!reducedMotion && (
                                <span className="ml-1 inline-block animate-pulse font-light text-[#fff]">
                                    |
                                </span>
                            )}
                        </h2>

                        <span className="sr-only">
                            {typingTexts.join(" ")}
                        </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href="/products"
                            className="hero-button group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[var(--primary)] sm:px-8 sm:text-base"
                        >
                            Explore Our Products

                            <ArrowUpRight
                                size={19}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>

                        <Link
                            href="/contact-us"
                            className="hero-button group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl border border-white/40 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[var(--primary)] sm:px-8 sm:text-base"
                        >
                            Get a Quote

                            <ArrowUpRight
                                size={19}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
