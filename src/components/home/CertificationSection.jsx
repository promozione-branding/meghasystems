
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Award, BadgeCheck } from "lucide-react";

const CERTIFICATES = [
    {
        id: 1,
        title: "Authorised Distributor",
        image: "/certificates/16.png",
        alt: "Authorised Distributor Certificate",
    },
    {
        id: 2,
        title: "Authorized OEM",
        image: "/certificates/15.png",
        alt: "Authorized OEM Certificate",
    },
    {
        id: 3,
        title: "Authorized OEM",
        image: "/certificates/certioem.webp",
        alt: "Authorized OEM Certificate",
    },
    {
        id: 4,
        title: "Authorised Dealer",
        image: "/certificates/17.png",
        alt: "Authorised Dealer Certificate",
    },
    {
        id: 5,
        title: "Authorised Dealer",
        image: "/certificates/18.png",
        alt: "Authorised Dealer Certificate",
    },
    {
        id: 6,
        title: "Quality Assurance",
        image: "/certificates/19.png",
        alt: "Quality Assurance Certificate",
    },
];

export default function CertificationSection() {
    const [active, setActive] = useState(2);

    return (
        <section className="relative overflow-hidden bg-[#f5f4f0] py-12 sm:py-15">
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">

                {/* SECTION HEADING */}
                <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <div className="mb-2 flex items-center justify-start gap-3">
                            <span className="h-px w-9 bg-[var(--secondary)]" />

                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Trust & Recognition
                            </span>

                            <span className="h-px w-9 bg-[var(--secondary)]" />
                        </div>

                        <h2 className="text-[clamp(2.8rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.06em] text-[var(--primary)]">
                            Our <span className="text-[var(--secondary)]">Certifications.</span>
                        </h2>
                    </div>

                    <p className="text-sm font-medium tabular-nums text-[#171c20]">
                        {String(active + 1).padStart(2, "0")}
                        <span className="mx-2 text-[#9ca3af]">/</span>
                        {String(CERTIFICATES.length).padStart(2, "0")}
                    </p>
                </div>

                {/* ACCORDION GALLERY */}
                <div
                    className="flex h-[250px] w-full gap-2 sm:h-[280px] sm:gap-3 lg:h-[400px] lg:gap-5"
                    onMouseLeave={() => setActive(2)}
                >
                    {CERTIFICATES.map((certificate, index) => {
                        const isActive = active === index;

                        return (
                            <button
                                key={certificate.id}
                                type="button"
                                onMouseEnter={() => setActive(index)}
                                onFocus={() => setActive(index)}
                                onClick={() => setActive(index)}
                                aria-label={`View ${certificate.title} certificate`}
                                aria-pressed={isActive}
                                className="group relative min-w-0 overflow-hidden rounded-[22px] bg-white outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#00a896] sm:rounded-[30px]"
                                style={{
                                    flexGrow: isActive ? 7 : 0.7,
                                    flexBasis: 0,
                                }}
                            >
                                {/* CERTIFICATE IMAGE */}
                                <div className="absolute inset-0 bg-[#eae8e2]">
                                    <Image
                                        src={certificate.image}
                                        alt={certificate.alt}
                                        fill
                                        sizes="(max-width: 768px) 85vw, 70vw"
                                        className={`object-contain p-4 transition-all duration-700 ${isActive
                                            ? "scale-100 opacity-100"
                                            : "scale-110 opacity-75"
                                            }`}
                                    />
                                </div>

                                {/* ACTIVE CARD BOTTOM GRADIENT */}
                                <div
                                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#171c20]/85 via-[#171c20]/35 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                />

                                {/* BOTTOM CONTENT */}
                                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-3 sm:p-5 lg:p-7">

                                    {/* ICON */}
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#00a896] shadow-sm sm:h-11 sm:w-11">
                                        {isActive ? (
                                            <BadgeCheck size={20} />
                                        ) : (
                                            <Award size={18} />
                                        )}
                                    </div>

                                    {/* ACTIVE CERTIFICATE TITLE */}
                                    <div
                                        className={`min-w-0 flex-1 overflow-hidden pl-4 text-left transition-all duration-500 ${isActive
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-4 opacity-0"
                                            }`}
                                    >
                                        <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
                                            Megha Systems
                                        </p>

                                        <h3 className="mt-1 whitespace-nowrap text-base font-semibold text-white sm:text-xl lg:text-2xl">
                                            {certificate.title}
                                        </h3>
                                    </div>

                                    {/* ARROW */}
                                    <div
                                        className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-opacity duration-500 sm:flex ${isActive ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                        <ArrowUpRight size={19} />
                                    </div>
                                </div>

                                {/* CARD NUMBER */}
                                <span
                                    className={`absolute left-1/2 top-5 -translate-x-1/2 text-xs font-semibold tracking-widest transition-opacity duration-500 ${isActive
                                        ? "opacity-0"
                                        : "text-[#171c20]/60 opacity-100"
                                        }`}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
