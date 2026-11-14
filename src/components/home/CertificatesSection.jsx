
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    ArrowRight,
    Award,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATES = [
    { id: 1, src: "/certificates/1.png", alt: "Quality Certification 1" },
    { id: 2, src: "/certificates/2.png", alt: "Quality Certification 2" },
    { id: 3, src: "/certificates/3.png", alt: "Quality Certification 3" },
    { id: 4, src: "/certificates/4.png", alt: "Quality Certification 4" },
    { id: 5, src: "/certificates/5.png", alt: "Quality Certification 5" },
    { id: 6, src: "/certificates/6.png", alt: "Quality Certification 6" },
    { id: 7, src: "/certificates/7.png", alt: "Quality Certification 7" },
    { id: 8, src: "/certificates/8.png", alt: "Quality Certification 8" },
    { id: 9, src: "/certificates/9.png", alt: "Quality Certification 9" },
    { id: 10, src: "/certificates/10.png", alt: "Quality Certification 10" },
    { id: 11, src: "/certificates/11.png", alt: "Quality Certification 11" },
    { id: 12, src: "/certificates/12.png", alt: "Quality Certification 12" },
    { id: 13, src: "/certificates/13.png", alt: "Quality Certification 13" },
    { id: 14, src: "/certificates/1.png", alt: "Quality Certification 1" },
    { id: 15, src: "/certificates/2.png", alt: "Quality Certification 2" },
    { id: 16, src: "/certificates/3.png", alt: "Quality Certification 3" },
    { id: 17, src: "/certificates/4.png", alt: "Quality Certification 4" },
    { id: 18, src: "/certificates/5.png", alt: "Quality Certification 5" },
    { id: 19, src: "/certificates/6.png", alt: "Quality Certification 6" },
    { id: 20, src: "/certificates/7.png", alt: "Quality Certification 7" },
    { id: 21, src: "/certificates/8.png", alt: "Quality Certification 8" },
    { id: 22, src: "/certificates/9.png", alt: "Quality Certification 9" },
    { id: 23, src: "/certificates/10.png", alt: "Quality Certification 10" },
    { id: 24, src: "/certificates/11.png", alt: "Quality Certification 11" },
    { id: 25, src: "/certificates/12.png", alt: "Quality Certification 12" },
    { id: 26, src: "/certificates/13.png", alt: "Quality Certification 13" },
];

export default function CertificatesSection() {
    const sectionRef = useRef(null);
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const firstRow = CERTIFICATES.filter((_, index) => index % 2 === 0);
    const secondRow = CERTIFICATES.filter((_, index) => index % 2 !== 0);

    useEffect(() => {
        const section = sectionRef.current;
        const row1 = firstRowRef.current;
        const row2 = secondRowRef.current;

        if (!section || !row1 || !row2) return;

        const ctx = gsap.context(() => {
            const getTravel = (row) =>
                Math.max(0, row.scrollWidth - window.innerWidth + 80);

            // FIRST ROW - RIGHT TO LEFT
            gsap.fromTo(
                row1,
                { x: 0 },
                {
                    x: () => -getTravel(row1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // SECOND ROW - LEFT TO RIGHT
            gsap.fromTo(
                row2,
                { x: () => -getTravel(row2) },
                {
                    x: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // HEADING REVEAL
            gsap.fromTo(
                ".cert-heading",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        }, section);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            ctx.revert();
        };
    }, []);

    // Keyboard navigation for certificate preview
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedIndex(null);
            }

            if (event.key === "ArrowRight") {
                setSelectedIndex((prev) => (prev + 1) % CERTIFICATES.length);
            }

            if (event.key === "ArrowLeft") {
                setSelectedIndex(
                    (prev) => (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length
                );
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex]);

    const showNext = () => {
        setSelectedIndex((prev) => (prev + 1) % CERTIFICATES.length);
    };

    const showPrevious = () => {
        setSelectedIndex(
            (prev) => (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length
        );
    };

    const selectedCertificate =
        selectedIndex !== null ? CERTIFICATES[selectedIndex] : null;

    return (
        <>
            <section
                ref={sectionRef}
                id="certificates"
                className="relative overflow-hidden bg-[#0A0A0D] py-4 text-[#F4F4EF] sm:py-6"
            >
                {/* BACKGROUND GRID */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
                        backgroundSize: "90px 90px",
                    }}
                />

                {/* BACKGROUND GLOW */}
                <div className="pointer-events-none absolute -bottom-64 right-[-200px] h-[600px] w-[600px] rounded-full bg-[#00a896]/[0.07] blur-[130px]" />

                {/* SCROLLING CERTIFICATE ROWS */}
                <div className="relative">
                    {/* ROW ONE */}
                    <div className="w-full overflow-visible">
                        <div
                            ref={firstRowRef}
                            className="flex w-max items-start gap-4 will-change-transform sm:gap-6"
                        >
                            {firstRow.map((certificate) => (
                                <CertificateCard
                                    key={certificate.id}
                                    certificate={certificate}
                                    onClick={() =>
                                        setSelectedIndex(CERTIFICATES.indexOf(certificate))
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    {/* ROW TWO */}
                    <div className="w-full overflow-visible mt-2">
                        <div
                            ref={secondRowRef}
                            className="flex w-max items-start gap-4 will-change-transform sm:gap-6"
                        >
                            {secondRow.map((certificate) => (
                                <CertificateCard
                                    key={certificate.id}
                                    certificate={certificate}
                                    onClick={() =>
                                        setSelectedIndex(CERTIFICATES.indexOf(certificate))
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CERTIFICATE PREVIEW MODAL */}
            {selectedCertificate && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                    onClick={() => setSelectedIndex(null)}
                    role="presentation"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={selectedCertificate.alt}
                        className="relative flex h-[90vh] w-full max-w-[950px] flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CLOSE */}
                        <button
                            type="button"
                            onClick={() => setSelectedIndex(null)}
                            aria-label="Close certificate preview"
                            className="absolute right-0 top-0 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        >
                            <X size={21} />
                        </button>

                        {/* IMAGE */}
                        <div className="relative h-[78vh] w-full">
                            <Image
                                src={selectedCertificate.src}
                                alt={selectedCertificate.alt}
                                fill
                                sizes="90vw"
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* NAVIGATION */}
                        <div className="mt-4 flex w-full items-center justify-between">
                            <button
                                type="button"
                                onClick={showPrevious}
                                aria-label="Previous certificate"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#00a896] hover:text-[#00a896]"
                            >
                                <ChevronLeft size={22} />
                            </button>

                            <div className="text-center">
                                <p className="text-sm font-medium text-white">
                                    {selectedCertificate.alt}
                                </p>

                                <p className="mt-1 text-xs text-white/40">
                                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                                    {String(CERTIFICATES.length).padStart(2, "0")}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={showNext}
                                aria-label="Next certificate"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#00a896] hover:text-[#00a896]"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// CERTIFICATE CARD
function CertificateCard({ certificate, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group block w-[210px] shrink-0 text-left sm:w-[260px] lg:w-[150px]"
            aria-label={`Preview ${certificate.alt}`}
        >
            {/* IMAGE FRAME */}
            <div className="relative h-[150px] overflow-hidden rounded-[16px] border border-white/10 bg-[#171719] p-2 transition-colors duration-500 group-hover:border-[#00a896]/60">
                {/* CERTIFICATE */}
                <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-white p-1">
                    <Image
                        src={certificate.src}
                        alt={certificate.alt}
                        fill
                        sizes="(max-width: 639px) 210px, (max-width: 1023px) 260px, 290px"
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* TITLE */}
            {/* <div className="mt-3 flex items-center justify-between gap-3">
                <h3 className="truncate text-[13px] font-medium text-white/80 transition-colors group-hover:text-[#00a896]">
                    {certificate.alt}
                </h3>

                <span className="shrink-0 text-[10px] font-medium text-white/35">
                    {String(certificate.id).padStart(2, "0")}
                </span>
            </div> */}
        </button>
    );
}
