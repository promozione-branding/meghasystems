
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    ArrowUpRight,
    ClipboardCheck,
    Layers3,
    Truck,
    Ruler,
    Factory,
    CheckCircle2,
    Phone,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        number: "01",
        title: "Design & Planning",
        description: "We understand your requirements and create the ideal restroom layout.",
        icon: Ruler,
    },
    {
        number: "02",
        title: "Material Selection",
        description: "Durable panels and hardware are selected to match your project.",
        icon: Layers3,
    },
    {
        number: "03",
        title: "Precision Manufacturing",
        description: "Panels are cut, machined, and finished with precision.",
        icon: Factory,
    },
    {
        number: "04",
        title: "Quality Assurance",
        description: "Every component is checked for strength, fit, and finish.",
        icon: ClipboardCheck,
    },
    {
        number: "05",
        title: "Delivery & Installation",
        description: "Our team delivers and installs your cubicle system.",
        icon: Truck,
    },
    {
        number: "06",
        title: "Ready to Use",
        description: "A complete, modern restroom solution built to last.",
        icon: CheckCircle2,
    },
];

const C = {
    dark: "#171c20",
    teal: "#00a896",
    gold: "#d9a000",
    pale: "#e6f6f2",
    line: "#b6c9c5",
};

function Illustration({ step }) {
    const common = {
        fill: "none",
        stroke: C.dark,
        strokeWidth: 2.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    return (
        <svg
            viewBox="0 0 220 190"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
        >
            <ellipse cx="110" cy="167" rx="91" ry="13" fill="#dce8e5" />
            <ellipse cx="110" cy="160" rx="91" ry="13" fill="#f7fbf9" stroke="#c7dcd6" />

            {/* 01: Animated architectural blueprint */}
            {step === 0 && (
                <g>
                    <rect x="34" y="35" width="152" height="103" rx="10" fill={C.dark} />
                    <rect x="41" y="42" width="138" height="88" rx="5" fill="#f2faf7" />
                    <g className="process-blueprint" {...common} stroke={C.teal} strokeWidth="2">
                        <path d="M58 57H160V114H58Z" />
                        <path d="M92 57V114M126 57V114" />
                        <path d="M58 86H92M126 86H160" />
                        <path d="M65 102A14 14 0 0 0 79 88" />
                        <path d="M99 102A14 14 0 0 0 113 88" />
                        <path d="M133 102A14 14 0 0 0 147 88" />
                    </g>
                    <path d="M101 138V149M119 138V149M84 150H136" {...common} />
                    <g className="process-pencil" transform="translate(149 93) rotate(35)">
                        <rect x="0" y="0" width="15" height="55" rx="3" fill={C.gold} stroke={C.dark} strokeWidth="2" />
                        <path d="M0 55L7.5 69L15 55Z" fill="#f5d8a2" stroke={C.dark} strokeWidth="2" />
                        <path d="M7.5 69V64" stroke={C.dark} strokeWidth="2" />
                    </g>
                </g>
            )}

            {/* 02: Panels stack */}
            {step === 1 && (
                <g {...common}>
                    <g className="process-panel process-panel-1">
                        <path d="M45 113L113 84L176 110L107 140Z" fill="#9faeab" />
                        <path d="M45 113V126L107 153V140Z" fill="#758985" />
                        <path d="M107 140V153L176 123V110Z" fill="#879c98" />
                    </g>
                    <g className="process-panel process-panel-2">
                        <path d="M45 85L113 56L176 82L107 112Z" fill="#f0e5c7" />
                        <path d="M45 85V98L107 125V112Z" fill="#d4c9aa" />
                        <path d="M107 112V125L176 95V82Z" fill="#ded4b9" />
                    </g>
                    <g className="process-panel process-panel-3">
                        <path d="M45 56L113 27L176 53L107 83Z" fill={C.teal} />
                        <path d="M45 56V69L107 96V83Z" fill="#087c70" />
                        <path d="M107 83V96L176 66V53Z" fill="#079183" />
                    </g>
                </g>
            )}

            {/* 03: CNC manufacturing */}
            {step === 2 && (
                <g {...common}>
                    <path d="M35 135V55Q35 44 46 44H174Q185 44 185 55V135" strokeWidth="9" stroke={C.teal} />
                    <path d="M45 135V57H175V135" strokeWidth="3" />
                    <rect x="30" y="127" width="160" height="27" rx="5" fill={C.teal} />
                    <path d="M55 127L92 101H161L129 127Z" fill="#e6eeeb" />
                    <g className="process-cutter">
                        <rect x="94" y="34" width="32" height="47" rx="6" fill="#a9c900" />
                        <path d="M110 81V104" strokeWidth="6" />
                        <path d="M103 105H117" stroke={C.gold} strokeWidth="3" />
                        <g className="process-sparks" stroke={C.gold}>
                            <path d="M110 109V120M97 111L89 118M123 111L131 118M94 104H85M126 104H135" />
                        </g>
                    </g>
                </g>
            )}

            {/* 04: Quality inspection */}
            {step === 3 && (
                <g {...common}>
                    <rect x="55" y="33" width="111" height="125" rx="8" fill="#f7fbf9" />
                    <rect x="92" y="24" width="37" height="18" rx="5" fill={C.teal} />
                    {[0, 1, 2].map((i) => (
                        <g key={i} className={`process-check process-check-${i}`}>
                            <rect x="71" y={61 + i * 30} width="17" height="17" rx="3" stroke={C.teal} />
                            <path d={`M75 ${69 + i * 30}l5 5 11 -13`} stroke={C.teal} strokeWidth="3" />
                            <path d={`M100 ${68 + i * 30}H145`} stroke="#a4b9b4" />
                        </g>
                    ))}
                    <circle cx="160" cy="132" r="29" fill="#a9c900" stroke="#ffffff" strokeWidth="4" />
                    <path d="M146 131L156 141L175 120" stroke="#ffffff" strokeWidth="5" />
                </g>
            )}

            {/* 05: Moving delivery truck */}
            {step === 4 && (
                <g className="process-truck" {...common}>
                    <rect x="29" y="76" width="110" height="64" rx="6" fill="#f7fbf9" />
                    <path d="M139 101H166L186 119V140H139Z" fill={C.teal} />
                    <path d="M151 106H164L176 118H151Z" fill="#d8f5f0" />
                    <path d="M29 140H186" />
                    <circle cx="63" cy="142" r="14" fill={C.dark} />
                    <circle cx="63" cy="142" r="6" fill="#f7fbf9" />
                    <circle cx="159" cy="142" r="14" fill={C.dark} />
                    <circle cx="159" cy="142" r="6" fill="#f7fbf9" />
                    <path d="M48 95H116M48 105H105" stroke={C.teal} strokeWidth="4" />
                </g>
            )}

            {/* 06: Cubicle partitions assembling */}
            {step === 5 && (
                <g {...common}>
                    <path d="M32 64L110 37L190 64" stroke="#c3d5d0" strokeWidth="4" />
                    <path d="M34 65V145H188V65" stroke="#a9bdb7" />
                    <g className="process-cubicle process-cubicle-1">
                        <path d="M44 75L83 66V142H44Z" fill="#067e74" />
                        <path d="M44 75L83 66" stroke="#ffffff" strokeWidth="2" />
                    </g>
                    <g className="process-cubicle process-cubicle-2">
                        <path d="M86 65H128V142H86Z" fill={C.teal} />
                        <circle cx="118" cy="106" r="3" fill="#ffffff" stroke="none" />
                    </g>
                    <g className="process-cubicle process-cubicle-3">
                        <path d="M131 65H174V142H131Z" fill="#087c70" />
                        <circle cx="164" cy="106" r="3" fill="#ffffff" stroke="none" />
                    </g>
                    <path d="M44 145H174" strokeWidth="4" />
                    <path d="M53 142V151M121 142V151M166 142V151" strokeWidth="4" />
                    <g className="process-finish">
                        <path d="M166 27V39M154 31L148 21M178 31L184 21" stroke={C.gold} strokeWidth="3" />
                    </g>
                </g>
            )}
        </svg>
    );
}

export default function ManufacturingProcess() {
    const sectionRef = useRef(null);
    const PHONE_NUMBER = "919876543210";
    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.from(".process-heading", {
                y: 35,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-heading",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".process-item", {
                y: 60,
                opacity: 0,
                scale: 0.9,
                stagger: 0.13,
                duration: 0.85,
                ease: "back.out(1.3)",
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".process-blueprint path", {
                strokeDasharray: 300,
                strokeDashoffset: 300,
                stagger: 0.2,
                duration: 2.5,
                ease: "power2.inOut",
                repeat: -1,
                repeatDelay: 1,
            });

            gsap.to(".process-pencil", {
                x: -10,
                y: -7,
                duration: 1.4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            });

            gsap.from(".process-panel", {
                y: -35,
                opacity: 0,
                stagger: 0.45,
                duration: 1,
                repeat: -1,
                repeatDelay: 1.5,
                ease: "power2.out",
            });

            gsap.to(".process-cutter", {
                x: 36,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".process-sparks", {
                opacity: 0.15,
                scale: 0.8,
                transformOrigin: "center",
                duration: 0.25,
                repeat: -1,
                yoyo: true,
            });

            gsap.from(".process-check", {
                opacity: 0.15,
                scale: 0.8,
                transformOrigin: "center",
                stagger: 0.5,
                duration: 0.6,
                repeat: -1,
                repeatDelay: 1.2,
            });

            gsap.to(".process-truck", {
                x: 14,
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.from(".process-cubicle", {
                y: -45,
                opacity: 0,
                stagger: 0.5,
                duration: 0.8,
                repeat: -1,
                repeatDelay: 1.5,
                ease: "power2.out",
            });

            gsap.to(".process-finish", {
                opacity: 0.2,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
            });

            gsap.to(".process-wave", {
                x: -45,
                duration: 5,
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
            className="relative isolate overflow-hidden bg-[var(--background)] border-t border-[var(--secondary)]/40 py-10 text-[var(--text-primary)] sm:py-12 lg:py-15"
        >
            {/* Soft decorative background */}
            <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[var(--secondary)]/[0.05] blur-[90px]" />
            <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/[0.06] blur-[90px]" />

            <div className="relative z-10 mx-auto max-w-[1700px] px-5 sm:px-8 lg:px-12">
                {/* HEADING */}
                <div className="process-heading mb-10 text-center">
                    <div className="mb-2 flex items-center justify-center gap-4">
                        <span className="h-[2px] w-10 bg-[var(--secondary)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                            Our Process
                        </span>
                        <span className="h-[2px] w-10 bg-[var(--secondary)]" />
                    </div>

                    <h2 className="text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.07] tracking-[-0.055em]">
                        How We Make
                        <br className="sm:hidden" />{" "}
                        <span className="text-[var(--secondary)]">
                            Toilet Cubicles.
                        </span>
                    </h2>

                    <p className="mx-auto mt-2 max-w-[680px] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                        From the first design to final installation, discover
                        how Megha Systems transforms ideas into durable
                        restroom solutions.
                    </p>
                </div>

                {/* PROCESS */}
                <div className="process-grid grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
                    {STEPS.map((step, index) => (
                        <div
                            key={step.number}
                            className="process-item group relative flex flex-col items-center text-center"
                        >
                            <div className="relative flex h-[220px] w-full max-w-[260px] items-center justify-center">
                                <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--secondary)]/[0.045] transition-transform duration-500 group-hover:scale-110" />

                                <Illustration step={index} />

                                {index < STEPS.length - 1 && (
                                    <div className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--secondary)] xl:block">
                                        <ArrowRight size={23} strokeWidth={1.5} />
                                    </div>
                                )}
                            </div>

                            <span className="relative z-10 -mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-bold text-white shadow-[0_8px_22px_rgba(0,168,150,0.2)]">
                                {step.number}
                            </span>

                            <h3 className="mt-6 text-[16px] font-semibold leading-snug tracking-[-0.03em] xl:text-[17px]">
                                {step.title}
                            </h3>

                            <p className="mt-2 max-w-[220px] text-[13px] text-[var(--text-secondary)]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border-color)] pt-8 lg:flex-row lg:items-center lg:justify-between">

                    {/* LEFT TEXT */}
                    <div>
                        <p className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
                            Have a restroom project in mind?
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Let's build something exceptional together.
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-3">

                        {/* WHATSAPP */}
                        <a
                            href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
                                "Hello Megha Systems, I would like to enquire about your toilet cubicle solutions."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-[var(--secondary)] bg-[var(--secondary)] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>

                        {/* CALL */}
                        <a
                            href={`tel:+${PHONE_NUMBER}`}
                            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--primary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]"
                        >
                            <Phone size={17} className="text-[var(--secondary)]" />
                            Call Now
                        </a>

                        {/* START PROJECT */}
                        <Link
                            href="/contact-us"
                            className="group inline-flex items-center gap-4 rounded-full bg-[var(--primary)] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary)]"
                        >
                            Start Your Project

                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--primary)]">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Animated bottom wave */}
            <svg
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-0 left-0 h-16 w-full opacity-30"
                aria-hidden="true"
            >
                <g className="process-wave" fill="none" stroke="var(--secondary)">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <path
                            key={index}
                            d={`M-100 ${45 + index * 4} C 200 ${-5 + index * 4}, 400 ${105 + index * 4}, 720 ${45 + index * 4} S 1200 ${-5 + index * 4}, 1540 ${45 + index * 4}`}
                            strokeWidth="1"
                        />
                    ))}
                </g>
            </svg>
        </section>
    );
}
