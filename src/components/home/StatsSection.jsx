
"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Award,
    Building2,
    Layers3,
    Headset,
    ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        id: 1,
        number: 25,
        suffix: "+",
        background: "25",
        label: "Years of Excellence",
        description: "Experience that defines quality.",
        icon: Award,
    },
    {
        id: 2,
        number: 5000,
        suffix: "+",
        background: "5K",
        label: "Projects Completed",
        description: "Spaces transformed with precision.",
        icon: Building2,
    },
    {
        id: 3,
        number: 1,
        suffix: " Lakh+",
        background: "1L",
        label: "Cubicles Installed",
        description: "Built for lasting performance.",
        icon: Layers3,
    },
    {
        id: 4,
        number: 24,
        suffix: "/7",
        background: "24",
        label: "Customer Support",
        description: "Assistance when you need it.",
        icon: Headset,
    },
];

function StatCard({ stat, startCount }) {
    const Icon = stat.icon;

    return (
        <div className="stat-card group relative flex min-h-[310px] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-[var(--border-color)] bg-white/80 px-5 py-10 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[var(--secondary)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] sm:min-h-[300px]">
            {/* Oversized background number */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(130px,19vw,250px)] font-black leading-none tracking-[-0.02em] text-[var(--primary)]/[0.065] transition-all duration-700 group-hover:scale-110 group-hover:text-[var(--secondary)]/[0.08]"
            >
                {stat.background}
            </span>

            {/* Top label */}
            <div className="relative z-10 mb-7 flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--secondary)]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                    Megha Systems
                </span>

                <span className="h-px w-6 bg-[var(--secondary)]" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-white text-[var(--secondary)] shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[var(--secondary)] group-hover:text-white">
                <Icon size={25} strokeWidth={1.6} />
            </div>

            {/* Animated Number */}
            <div className="relative z-10 flex items-center justify-center">
                <h3 className="text-[clamp(44px,4.2vw,72px)] font-semibold leading-none tracking-[-0.065em] text-[var(--primary)]">
                    {startCount ? (
                        <CountUp
                            start={0}
                            end={stat.number}
                            duration={2.5}
                            separator=","
                            suffix={stat.suffix}
                            useEasing
                        />
                    ) : (
                        `0${stat.suffix}`
                    )}
                </h3>
            </div>

            {/* Accent line */}
            <div className="relative z-10 my-6 h-[2px] w-12 bg-[var(--secondary)] transition-all duration-500 group-hover:w-20" />

            {/* Label */}
            <h4 className="relative z-10 text-lg font-semibold tracking-[-0.025em] text-[var(--primary)] sm:text-xl">
                {stat.label}
            </h4>

            {/* Description */}
            <p className="relative z-10 mt-3 max-w-[220px] text-xs leading-6 text-[var(--text-secondary)] sm:text-sm">
                {stat.description}
            </p>

            {/* Decorative corner */}
            <ArrowUpRight
                size={19}
                className="absolute right-5 top-5 text-[var(--secondary)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
            />
        </div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef(null);
    const [startCount, setStartCount] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            setStartCount(true);
            return;
        }

        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(
                ".stats-heading",
                {
                    y: 45,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stats-heading",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            // Cards stagger animation
            gsap.fromTo(
                ".stat-card",
                {
                    y: 70,
                    opacity: 0,
                    scale: 0.94,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.13,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stats-grid",
                        start: "top 85%",
                        once: true,
                        onEnter: () => setStartCount(true),
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[var(--background)] py-10 sm:py-12 lg:py-15"
        >
            {/* Section Heading */}
            <div className="stats-heading mx-auto mb-8 max-w-[1500px] px-5 text-center sm:px-8 lg:px-12">
                <div className="mb-2 flex items-center justify-center gap-3">
                    <span className="h-px w-9 bg-[var(--secondary)]" />

                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                        Our Achievements
                    </span>

                    <span className="h-px w-9 bg-[var(--secondary)]" />
                </div>

                <h2 className="text-[clamp(38px,5vw,60px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--primary)]">
                    Numbers That Speak For Themselves.
                </h2>
            </div>

            {/* Four Stats Cards */}
            <div className="stats-grid mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-5 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-12">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.id}
                        stat={stat}
                        startCount={startCount}
                    />
                ))}
            </div>
        </section>
    );
}
