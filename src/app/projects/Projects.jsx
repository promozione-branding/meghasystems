
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Expand,
    Images,
    MapPin,
    X,
} from "lucide-react";

// Replace these images and project details with your actual projects.
// All image paths should exist inside the public folder.
const projects = [
];

const categories = [
    "All Projects",
    "Corporate",
    "Commercial",
    "Institutional",
    "Premium",
];

export default function ProjectsClient() {
    const heroRef = useRef(null);
    const galleryRef = useRef(null);

    const [activeCategory, setActiveCategory] = useState("All Projects");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [visibleCount, setVisibleCount] = useState(9);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All Projects") return projects;

        return projects.filter(
            (project) => project.category === activeCategory
        );
    }, [activeCategory]);

    const visibleProjects = filteredProjects.slice(0, visibleCount);

    const selectedProject =
        selectedIndex !== null ? visibleProjects[selectedIndex] : null;

    const handleCategory = (category) => {
        setActiveCategory(category);
        setVisibleCount(9);
        setSelectedIndex(null);
    };

    const nextImage = () => {
        setSelectedIndex((current) =>
            (current + 1) % visibleProjects.length
        );
    };

    const prevImage = () => {
        setSelectedIndex((current) =>
            (current - 1 + visibleProjects.length) %
            visibleProjects.length
        );
    };

    // Hero animation
    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".projects-hero-reveal",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Gallery animation
    useEffect(() => {
        if (!galleryRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.06,
                    ease: "power3.out",
                    clearProps: "transform,opacity",
                }
            );
        }, galleryRef);

        return () => ctx.revert();
    }, [activeCategory, visibleCount]);

    // Lightbox keyboard navigation and scroll lock
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedIndex(null);
            }

            if (event.key === "ArrowRight") {
                setSelectedIndex((current) =>
                    (current + 1) % visibleProjects.length
                );
            }

            if (event.key === "ArrowLeft") {
                setSelectedIndex((current) =>
                    (current - 1 + visibleProjects.length) %
                    visibleProjects.length
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
    }, [selectedIndex, visibleProjects.length]);

    return (
        <main className="min-h-screen bg-white text-[var(--primary)]">
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-[var(--primary)] pb-20 pt-32 text-white lg:pb-15 lg:pt-40"
            >
                {/* Decorative gradients */}
                <div className="pointer-events-none absolute -right-32 -top-40 h-[600px] w-[600px] rounded-full bg-[var(--secondary)]/15 blur-[130px]" />

                {/* Decorative SVG */}
                <svg
                    className="pointer-events-none absolute right-[-100px] top-[-70px] hidden h-[550px] w-[550px] opacity-20 lg:block"
                    viewBox="0 0 550 550"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle cx="275" cy="275" r="240" stroke="var(--secondary)" />
                    <circle cx="275" cy="275" r="175" stroke="var(--secondary)" />
                    <circle cx="275" cy="275" r="110" stroke="var(--secondary)" />
                    <path
                        d="M0 275H550M275 0V550"
                        stroke="white"
                        strokeOpacity=".3"
                    />
                </svg>

                <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                    {/* Breadcrumb */}
                    <div className="projects-hero-reveal mb-12 flex items-center gap-2 text-sm text-white/60">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <ChevronRight size={15} />
                        <span className="text-white">Our Projects</span>
                    </div>

                    <div className="projects-hero-reveal mb-2 flex items-center gap-4">
                        <span className="h-px w-12 bg-[var(--secondary)]" />

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Our Work & Installations
                        </span>
                    </div>

                    <h1 className="projects-hero-reveal max-w-[1000px] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
                        Our <span className="text-[var(--secondary)]">Projects.</span>
                    </h1>

                    {/* <p className="projects-hero-reveal mt-7 max-w-[650px] text-base leading-8 text-white/65 sm:text-lg">
                        Explore our portfolio of thoughtfully designed and
                        expertly installed restroom cubicle systems across
                        commercial, corporate and institutional spaces.
                    </p> */}

                    <a
                        href="#projects-gallery"
                        className="projects-hero-reveal mt-9 inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                        Explore Our Work
                        <ArrowUpRight size={18} />
                    </a>
                </div>
            </section>

            {/* =====================================
          GALLERY
      ===================================== */}
            <section
                ref={galleryRef}
                id="projects-gallery"
                className="scroll-mt-24 bg-[#f7f9f8] py-12 lg:py-15"
            >
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                    {/* SECTION HEADER */}
                    <div className="mb-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-10 bg-[var(--secondary)]" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    Project Gallery
                                </span>
                            </div>

                            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.025em]">
                                Spaces We've{" "}
                                <span className="text-[var(--secondary)]">
                                    Transformed.
                                </span>
                            </h2>
                        </div>

                        {/* <p className="max-w-[430px] text-sm leading-7 text-[var(--text-secondary)]">
                            Every project reflects our focus on quality,
                            functionality and long-lasting design.
                        </p> */}
                    </div>

                    {/* CATEGORY FILTERS */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => handleCategory(category)}
                                    className={`rounded-full px-5 py-3 text-xs font-semibold transition-all ${activeCategory === category
                                        ? "bg-[var(--primary)] text-white"
                                        : "border border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <Images size={18} className="text-[var(--secondary)]" />
                            <span>
                                <strong className="text-[var(--primary)]">
                                    {filteredProjects.length}
                                </strong>{" "}
                                Projects
                            </span>
                        </div>
                    </div>

                    {/* =====================================
              PINTEREST MASONRY GRID
          ===================================== */}
                    {visibleProjects.length > 0 ? (
                        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
                            {visibleProjects.map((project, index) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => setSelectedIndex(index)}
                                    className="project-card group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[22px] bg-[#e9eeec] text-left"
                                    aria-label={`View ${project.title}`}
                                >
                                    {/* IMAGE */}
                                    <div
                                        className="relative w-full overflow-hidden"
                                        style={{ height: project.height }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* GRADIENT OVERLAY */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* CATEGORY BADGE */}
                                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] backdrop-blur-sm">
                                            {project.category}
                                        </span>

                                        {/* EXPAND ICON */}
                                        <span className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white text-[var(--primary)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <Expand size={17} />
                                        </span>

                                        {/* PROJECT DETAILS */}
                                        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 text-white transition-transform duration-300 group-hover:translate-y-0">
                                            <div className="mb-3 flex items-center gap-2 text-xs text-white/75">
                                                <MapPin size={14} className="text-[var(--secondary)]" />
                                                {project.location}
                                            </div>

                                            <h3 className="text-lg font-semibold leading-snug tracking-tight">
                                                {project.title}
                                            </h3>

                                            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                View Project
                                                <ArrowUpRight size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-[var(--border-color)] bg-white px-6 py-20 text-center">
                            <Images
                                size={36}
                                className="mx-auto mb-4 text-[var(--secondary)]"
                            />
                            <h3 className="text-xl font-semibold">
                                No Projects Found
                            </h3>
                        </div>
                    )}

                    {/* LOAD MORE */}
                    {visibleCount < filteredProjects.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setVisibleCount((current) => current + 8)
                                }
                                className="inline-flex items-center gap-3 rounded-xl bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[var(--secondary)]"
                            >
                                Load More Projects
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================
          FULLSCREEN LIGHTBOX
      ===================================== */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071720]/95 p-4 backdrop-blur-xl sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedProject.title}
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* CLOSE */}
                    <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                        aria-label="Close preview"
                    >
                        <X size={23} />
                    </button>

                    {/* COUNTER */}
                    <div className="absolute left-5 top-7 text-sm font-medium text-white/70">
                        {String(selectedIndex + 1).padStart(2, "0")}
                        <span className="mx-2 text-white/30">/</span>
                        {String(visibleProjects.length).padStart(2, "0")}
                    </div>

                    {/* PREVIOUS */}
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            prevImage();
                        }}
                        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--secondary)] sm:left-8 sm:h-14 sm:w-14"
                        aria-label="Previous project"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* IMAGE */}
                    <div
                        className="relative h-[75vh] w-full max-w-[1200px]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Image
                            key={selectedProject.image}
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* NEXT */}
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            nextImage();
                        }}
                        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[var(--secondary)] sm:right-8 sm:h-14 sm:w-14"
                        aria-label="Next project"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* CAPTION */}
                    <div className="absolute bottom-5 left-1/2 w-[calc(100%-40px)] max-w-[650px] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-center text-white backdrop-blur-md">
                        <h3 className="text-base font-semibold sm:text-lg">
                            {selectedProject.title}
                        </h3>

                        <p className="mt-1 flex items-center justify-center gap-2 text-xs text-white/65">
                            <MapPin size={13} />
                            {selectedProject.location}
                            <span className="mx-1">•</span>
                            {selectedProject.category}
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}
