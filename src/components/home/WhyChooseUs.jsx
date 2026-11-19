
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Play,
    X,
    ShieldCheck,
    BadgeCheck,
    Wrench,
    Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        number: "01",
        icon: ShieldCheck,
        title: "Premium Quality",
        description:
            "Durable materials and precision-engineered cubicle systems built for lasting performance.",
    },
    {
        number: "02",
        icon: BadgeCheck,
        title: "Trusted Expertise",
        description:
            "Over 25 years of industry experience delivering reliable restroom solutions.",
    },
    {
        number: "03",
        icon: Wrench,
        title: "Expert Installation",
        description:
            "Professional installation with careful attention to detail, finishing, and quality.",
    },
    {
        number: "04",
        icon: Headphones,
        title: "Dedicated Support",
        description:
            "Complete assistance from planning and product selection to after-sales support.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);
    const [videoOpen, setVideoOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".why-reveal", {
                y: 45,
                // opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            gsap.from(".why-feature", {
                y: 55,
                // opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".why-features",
                    start: "top 85%",
                },
            });

            gsap.fromTo(
                ".why-image",
                { scale: 1.12 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".why-image-container",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[var(--background)] py-12 lg:py-16 border border-[var(--secondary)]/40"
        >
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    {/* LEFT SIDE */}
                    <div className="relative">
                        <div className="mb-2 flex items-center justify-start gap-3">
                            <span className="h-px w-9 bg-[var(--secondary)]" />

                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Transparent Process
                            </span>

                            <span className="h-px w-9 bg-[var(--secondary)]" />
                        </div>

                        <h2 className="why-reveal max-w-[650px] text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-primary)]">
                            Why People
                            <br />
                            Choose <span className="text-[var(--secondary)]">Us.</span>
                        </h2>

                        <p className="why-reveal mt-6 max-w-[520px] text-sm leading-7 text-[var(--text-primary)] sm:text-base">
                            At Megha Systems, we combine innovative designs,
                            high-quality materials, and years of expertise to
                            deliver dependable restroom cubicle solutions.
                        </p>

                        {/* IMAGE */}
                        <div className="why-reveal why-image-container relative mt-12 max-w-[650px]">

                            {/* Decorative background shape */}
                            <div className="absolute -right-5 -top-5 h-[85%] w-[85%] rounded-[45%_55%_50%_40%] bg-[var(--secondary)]/10 sm:-right-8" />

                            <div className="relative aspect-[1.4/1] overflow-hidden rounded-[110px_110px_110px_20px] bg-[var(--surface)] sm:rounded-[160px_160px_160px_30px]">

                                <Image
                                    src="/products/Neo.webp"
                                    alt="Premium toilet cubicle installation by Megha Systems"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="why-image object-cover"
                                />
                            </div>

                            {/* Decorative dots */}
                            <div
                                aria-hidden="true"
                                className="absolute -right-4 -top-10 hidden h-20 w-20 opacity-30 sm:block"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(var(--secondary) 1px, transparent 1px)",
                                    backgroundSize: "8px 8px",
                                }}
                            />

                            {/* Play button */}
                            <button
                                type="button"
                                onClick={() => setVideoOpen(true)}
                                aria-label="Play Megha Systems introduction video"
                                className="group absolute bottom-[-18px] left-1/2 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-[8px] border-[var(--background)] bg-[var(--primary)] text-white shadow-lg transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-24"
                            >
                                <Play
                                    size={28}
                                    fill="currentColor"
                                    className="ml-1 transition-transform group-hover:scale-110"
                                />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT FEATURES */}
                    <div className="why-features grid grid-cols-2 gap-4 sm:gap-6">

                        {FEATURES.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.number}
                                    className="why-feature group relative flex min-h-[250px] flex-col items-center overflow-hidden rounded-[20px] bg-[var(--surface)] px-4 pb-7 pt-0 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] sm:min-h-[300px] sm:px-7"
                                >
                                    {/* Decorative semicircle */}
                                    <div className="relative mb-5 flex h-28 w-full justify-center overflow-hidden sm:h-36">

                                        <div className="absolute -top-16 h-36 w-44 rounded-full bg-[var(--secondary)]/10 transition-colors duration-500 group-hover:bg-[var(--secondary)]/15 sm:h-44 sm:w-52" />

                                        <div className="absolute top-12 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--secondary)] shadow-sm transition-all duration-500 bg-[var(--primary)] text-white sm:top-16 sm:h-20 sm:w-20">
                                            <Icon size={28} strokeWidth={1.7} />
                                        </div>
                                    </div>

                                    <span className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--accent)]">
                                        {feature.number}
                                    </span>

                                    <h3 className="mb-3 text-base font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-xl">
                                        {feature.title}
                                    </h3>

                                    <p className="max-w-[230px] text-xs leading-6 text-[var(--text-primary)] sm:text-sm">
                                        {feature.description}
                                    </p>

                                    {/* Bottom accent */}
                                    <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-[var(--primary)] transition-all duration-500 w-1/2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* VIDEO MODAL */}
            {videoOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-5"
                    onClick={() => setVideoOpen(false)}
                    role="presentation"
                >
                    <div
                        className="relative w-full max-w-[900px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setVideoOpen(false)}
                            aria-label="Close video"
                            className="absolute -top-14 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
                        >
                            <X size={20} />
                        </button>

                        <video
                            src="/videos/megha-intro.mp4"
                            controls
                            autoPlay
                            playsInline
                            className="aspect-video w-full rounded-xl bg-black"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
