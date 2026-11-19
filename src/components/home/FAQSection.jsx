
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Plus,
    Minus,
    Package,
    Layers,
    ShieldCheck,
    Settings,
    Wrench,
    Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
    {
        question: "What are toilet cubicle systems?",
        answer:
            "Toilet cubicle systems are modular partition solutions designed to provide privacy, durability, and a modern appearance in commercial and institutional restrooms.",
        icon: Package,
    },
    {
        question: "What materials do you use?",
        answer:
            "We offer durable cubicle solutions using materials selected for strength, moisture resistance, hygiene, and long-term performance.",
        icon: Layers,
    },
    {
        question: "Can I customise the design?",
        answer:
            "Yes. We provide a variety of colours, finishes, layouts, and configurations to suit your project requirements.",
        icon: ShieldCheck,
    },
    {
        question: "Do you provide installation?",
        answer:
            "Yes. Our experienced team provides professional installation services with careful fitting and finishing.",
        icon: Settings,
    },
    {
        question: "Are the cubicles easy to maintain?",
        answer:
            "Our cubicle systems are designed for easy cleaning and low maintenance, making them suitable for high-traffic spaces.",
        icon: Wrench,
    },
    {
        question: "What is the warranty period?",
        answer:
            "Warranty terms depend on the product and project specifications. Contact our team for details of the applicable coverage.",
        icon: Headphones,
    },
];

function FAQCard({ item, index, active, onToggle }) {
    const isOpen = active === index;

    return (
        <div
            className={`faq-card group relative overflow-hidden rounded-[20px] border bg-[var(--surface)] transition-all duration-500 ${isOpen
                ? "border-[var(--primary)] shadow-[0_15px_35px_rgba(0,0,0,0.07)]"
                : "border-[var(--border-color)] shadow-[0_8px_24px_rgba(0,0,0,0.035)]"
                }`}
        >
            <div className="absolute inset-y-0 left-0 w-[4px] bg-[var(--primary)]" />

            <button
                type="button"
                onClick={() => onToggle(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
                <h3 className="text-sm font-semibold leading-snug text-[var(--text-primary)] sm:text-base">
                    {item.question}
                </h3>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] transition-transform duration-300 group-hover:rotate-90">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>

            <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-[13px] leading-6 text-[var(--text-secondary)] sm:px-6">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const sectionRef = useRef(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-heading", {
                opacity: 0,
                y: 40,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".faq-heading",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".faq-card", {
                // opacity: 0,
                y: 35,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".faq-layout",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".faq-center", {
                opacity: 0,
                scale: 0.8,
                duration: 1.1,
                ease: "back.out(1.3)",
                scrollTrigger: {
                    trigger: ".faq-center",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.to(".faq-rotating-ring", {
                rotation: 360,
                duration: 35,
                repeat: -1,
                ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[var(--background)] py-12 lg:py-16"
        >
            {/* DECORATIVE CORNERS */}
            <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full border-[45px] border-[var(--secondary)]/10" />
            <div className="pointer-events-none absolute -bottom-36 -right-24 h-80 w-80 rounded-full border-[50px] border-[var(--accent)]/15" />

            <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
                {/* HEADING */}
                <div className="faq-heading mb-10 text-center">
                    <div className="mb-2 flex items-center justify-center gap-4">
                        <span className="h-[2px] w-10 bg-[var(--secondary)]" />
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                            FAQ
                        </span>
                        <span className="h-[2px] w-10 bg-[var(--secondary)]" />
                    </div>

                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-[var(--text-primary)]">
                        Frequently Asked{" "}
                        <span className="text-[var(--secondary)]">
                            Questions
                        </span>
                    </h2>
                </div>

                {/* MAIN FAQ LAYOUT */}
                <div className="faq-layout grid items-center gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-6">
                    {/* LEFT FAQS */}
                    <div className="flex flex-col gap-5">
                        {FAQS.slice(0, 3).map((item, index) => (
                            <FAQCard
                                key={item.question}
                                item={item}
                                index={index}
                                active={active}
                                onToggle={setActive}
                            />
                        ))}
                    </div>

                    {/* CENTER IMAGE */}
                    <div className="faq-center relative mx-auto flex aspect-square w-full max-w-[470px] items-center justify-center">
                        {/* Dotted decoration */}
                        <div
                            className="absolute inset-0 rounded-full opacity-30"
                            style={{
                                backgroundImage:
                                    "radial-gradient(var(--secondary) 1.5px, transparent 1.5px)",
                                backgroundSize: "14px 14px",
                                maskImage:
                                    "radial-gradient(circle, transparent 50%, black 70%)",
                            }}
                        />

                        {/* ROTATING RING */}
                        <div className="faq-rotating-ring absolute inset-[5%] rounded-full border-[15px] border-dashed border-[var(--primary)]/70 border-r-[var(--primary)] border-b-[var(--primary)]" />

                        {/* INNER IMAGE */}
                        <div className="relative z-10 h-[72%] w-[72%] overflow-hidden rounded-full border-[8px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.13)]">
                            <Image
                                src="/products/Maxi.webp"
                                alt="Modern teal restroom cubicle installation"
                                fill
                                sizes="(max-width: 1024px) 75vw, 350px"
                                className="object-cover"
                            />
                        </div>

                        {/* FLOATING ICONS */}
                        <div className="absolute left-[8%] top-[15%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <Package size={23} />
                        </div>

                        <div className="absolute right-[7%] top-[17%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <Settings size={23} />
                        </div>

                        <div className="absolute left-[1%] top-[48%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <Layers size={23} />
                        </div>

                        <div className="absolute right-[1%] top-[48%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <Wrench size={23} />
                        </div>

                        <div className="absolute bottom-[10%] left-[12%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <ShieldCheck size={23} />
                        </div>

                        <div className="absolute bottom-[10%] right-[12%] z-20 flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[var(--primary)] text-white shadow-lg">
                            <Headphones size={23} />
                        </div>
                    </div>

                    {/* RIGHT FAQS */}
                    <div className="flex flex-col gap-5">
                        {FAQS.slice(3).map((item, index) => (
                            <FAQCard
                                key={item.question}
                                item={item}
                                index={index + 3}
                                active={active}
                                onToggle={setActive}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
