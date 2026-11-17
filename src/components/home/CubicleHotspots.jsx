
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Plus, X, ArrowUpRight } from "lucide-react";

const CUBICLE_LAYERS = [
    {
        id: 0,
        number: 1,
        title: "SS Adjustable Leg",
        subtitle: "Adjustable stainless steel support leg",
        image: "/hardware/ss-adjustable-leg.webp",
        x: "54.5%",
        y: "85%",
    },
    {
        id: 1,
        number: 2,
        title: "Door Stopper",
        subtitle: "Floor-mounted door protection stopper",
        image: "/hardware/door-stopper.webp",
        x: "57%",
        y: "63%",
    },
    {
        id: 2,
        number: 3,
        title: "Top Rail",
        subtitle: "Strong aluminum top support",
        image: "/hardware/top-rail.webp",
        x: "50%",
        y: "18%",
    },
    {
        id: 3,
        number: 4,
        title: "U Channel",
        subtitle: "Silver-Ion Surface Shield",
        image: "/hardware/u-channel.webp",
        x: "94%",
        y: "40%",
    },
    {
        id: 4,
        number: 5,
        title: "Indicator Lock",
        subtitle: "Secure internal privacy locking mechanism",
        image: "/hardware/indicator-lock.webp",
        x: "80%",
        y: "53%",
    },
    {
        id: 5,
        number: 6,
        title: "Door Knob",
        subtitle: "Durable stainless steel door knob",
        image: "/hardware/door-knob.webp",
        x: "19%",
        y: "53%",
    },
];

export default function CubicleHotspots() {
    const sectionRef = useRef(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".cubicle-hotspot",
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "back.out(1.7)",
                    delay: 0.3,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#111]"
            onClick={() => setActiveId(null)}
        >
            {/* FULL WIDTH BACKGROUND IMAGE */}
            <div className="relative h-[480px] w-full sm:h-[650px] lg:h-[800px] xl:h-[900px]">
                <Image
                    src="/products/Neo.webp"
                    alt="Megha Systems toilet cubicle hardware details"
                    fill
                    priority={false}
                    sizes="100vw"
                    className="object-cover object-center"
                />

                {/* Subtle overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                {/* HOTSPOTS */}
                {CUBICLE_LAYERS.map((item) => {
                    const isActive = activeId === item.id;

                    const xPosition = parseFloat(item.x);
                    const yPosition = parseFloat(item.y);

                    // Automatically position popup away from screen edges.
                    const popupAlign =
                        xPosition > 65
                            ? "right"
                            : xPosition < 35
                                ? "left"
                                : "center";

                    const popupVertical =
                        yPosition > 65 ? "bottom" : "top";

                    return (
                        <div
                            key={item.id}
                            className="cubicle-hotspot absolute z-20"
                            style={{
                                left: item.x,
                                top: item.y,
                                transform: "translate(-50%, -50%)",
                            }}
                            onMouseEnter={() => setActiveId(item.id)}
                            onMouseLeave={() => setActiveId(null)}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {/* DOT BUTTON */}
                            <button
                                type="button"
                                aria-label={`View ${item.title}`}
                                aria-expanded={isActive}
                                onClick={() =>
                                    setActiveId(isActive ? null : item.id)
                                }
                                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/25 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 sm:h-12 sm:w-12"
                            >
                                {/* Pulse */}
                                <span className="absolute inset-0 animate-ping rounded-full border border-white/50 bg-white/20 opacity-40" />

                                {/* Inner circle */}
                                <span
                                    className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-8 ${isActive
                                        ? "bg-[var(--secondary)] text-white"
                                        : "bg-white text-[var(--primary)]"
                                        }`}
                                >
                                    {isActive ? <X size={16} /> : <Plus size={17} />}
                                </span>
                            </button>

                            {/* HOVER POPUP */}
                            <div
                                className={`absolute z-30 w-[230px] transition-all duration-300 sm:w-[290px] ${popupVertical === "bottom"
                                    ? "bottom-full mb-4"
                                    : "top-full mt-4"
                                    } ${popupAlign === "right"
                                        ? "right-0"
                                        : popupAlign === "left"
                                            ? "left-0"
                                            : "left-1/2 -translate-x-1/2"
                                    } ${isActive
                                        ? "visible translate-y-0 opacity-100"
                                        : "invisible translate-y-2 opacity-0 pointer-events-none"
                                    }`}
                            >
                                <div className="overflow-hidden rounded-2xl border border-white/30 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
                                    {/* HARDWARE IMAGE */}
                                    <div className="relative h-[135px] w-full bg-[#f4f6f5] sm:h-[165px]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="290px"
                                            className="object-contain p-3"
                                        />

                                        <span className="absolute left-3 top-3 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-[11px] font-bold text-white">
                                            {String(item.number).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* DETAILS */}
                                    <div className="p-4 sm:p-5">
                                        <div className="mb-2 flex items-start justify-between gap-3">
                                            <h3 className="text-base font-semibold tracking-tight text-[var(--primary)] sm:text-lg">
                                                {item.title}
                                            </h3>

                                            <ArrowUpRight
                                                size={18}
                                                className="shrink-0 text-[var(--secondary)]"
                                            />
                                        </div>

                                        <p className="text-xs leading-6 text-gray-500 sm:text-sm">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
