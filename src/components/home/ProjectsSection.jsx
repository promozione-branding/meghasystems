
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Replace these with your actual project photos and names.
const projects = [
    {
        name: "Corporate Headquarters",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1787569194528-Project-completed-successfully-HOTELNH8-JAIPUR.jpg",
        category: "Office Cubicles",
        area: "p1",
    },
    {
        name: "Commercial Tower",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788779227380-WhatsApp-Image-2026-09-07-at-3.38.31-PM.jpeg",
        category: "Restroom Partitions",
        area: "p2",
    },
    {
        name: "Industrial Facility",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788784212945-WhatsApp-Image-2026-09-07-at-5.59.12-PM.jpeg",
        category: "Toilet Cubicles",
        area: "p3",
    },
    {
        name: "Premium Workspace",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788781956221-WhatsApp-Image-2026-09-07-at-5.16.07-PM.jpeg",
        category: "Cubicle Installation",
        area: "p4",
    },
    {
        name: "Educational Campus",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788784047843-WhatsApp-Image-2026-09-07-at-5.56.42-PM.jpeg",
        category: "Institutional Solutions",
        area: "p5",
    },
    {
        name: "Hospitality Project",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788784283549-WhatsApp-Image-2026-09-07-at-6.00.43-PM.jpeg",
        category: "Premium Restrooms",
        area: "p6",
    },
    {
        name: "Public Infrastructure",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788841101436-WhatsApp-Image-2026-09-08-at-9.47.08-AM.jpeg",
        category: "Commercial Washrooms",
        area: "p7",
    },
    {
        name: "Retail Development",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788951385988-WhatsApp-Image-2026-09-09-at-4.24.31-PM.jpeg",
        category: "Partition Systems",
        area: "p8",
    },
    {
        name: "Modern Office",
        image: "https://pub-df2b1dc7873442f8a66c155e5e88f258.r2.dev/projects/1788785586213-WhatsApp-Image-2026-09-07-at-6.21.47-PM.jpeg",
        category: "Restroom Solutions",
        area: "p9",
    },
];

function ProjectTile({ project }) {
    return (
        <div
            className={`project-tile group relative min-h-0 min-w-0 overflow-hidden bg-[#d9e0dd] ${project.area}`}
        >
            <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />

            <div className="absolute left-2 top-2 right-2 z-10 flex items-start justify-between gap-1">
                <span className="text-[7px] font-medium leading-tight tracking-wide text-white sm:text-[9px]">
                    ▷ {project.name}
                </span>

                <ArrowUpRight
                    size={12}
                    className="shrink-0 text-white opacity-0 transition-opacity group-hover:opacity-100"
                />
            </div>

            <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[8px] uppercase tracking-wider text-white">
                    {project.category}
                </span>
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-tile",
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.07,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".projects-main-title",
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".project-decor-line",
                { strokeDashoffset: 1100 },
                {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        once: true,
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative overflow-hidden bg-[#f9f9f7] py-10"
        >
            <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">
                <div className="relative border border-[#e5e7e4] bg-white px-4 pb-8 pt-8 shadow-[0_16px_50px_rgba(0,0,0,0.04)] sm:px-8">

                    {/* Fine top border */}
                    <div className="flex items-center gap-4">
                        <span className="h-3 w-3 rotate-45 border border-[var(--secondary)]" />
                        <span className="h-px flex-1 bg-[#e4e8e5]" />
                        <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#a2aaa6]">
                            MEGHA / PROJECTS
                        </span>
                    </div>

                    {/* Reference-style editorial canvas */}
                    <div className="relative mt-9 lg:mt-12">

                        {/* Header at upper left */}
                        <div className="relative z-10 mb-8 max-w-[370px] lg:mb-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                                Megha Systems
                            </p>

                            <h2 className="mt-3 text-[20px] font-medium tracking-[0.015em] text-[var(--primary)] sm:text-[25px]">
                                Crafted Spaces. Lasting Quality.
                            </h2>

                            <div className="mt-4 h-px w-10 bg-[var(--secondary)]" />

                            <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.4em] text-[#89918e]">
                                SELECTED PROJECTS
                            </p>
                        </div>

                        {/* Desktop collage: precise asymmetric placement */}
                        <div className="projects-collage relative z-10 mx-auto w-full lg:mt-[-12px]">

                            {/* Decorative background lines */}
                            <svg
                                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                                viewBox="0 0 1200 560"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    className="project-decor-line"
                                    d="M45 250 L380 80 L750 90"
                                    stroke="var(--secondary)"
                                    strokeOpacity="0.22"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="1100"
                                />
                                <path
                                    className="project-decor-line"
                                    d="M400 550 L800 310 L1160 300"
                                    stroke="var(--secondary)"
                                    strokeOpacity="0.2"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="1100"
                                />
                            </svg>

                            {/* Large bottom-left heading */}
                            <div className="projects-main-title">
                                <span className="block text-[clamp(35px,5vw,75px)] font-extrabold uppercase leading-[0.96] tracking-[-0.045em] text-[var(--primary)]">
                                    OUR
                                    <br />
                                    COMPLETED
                                    <br />
                                    PROJECTS
                                </span>
                                <Link
                                    href="/projects"
                                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--secondary)] hover:underline"
                                >
                                    Explore All Projects
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>

                            {/* Small solid accent blocks */}
                            <div className="accent-block accent-1" />
                            <div className="accent-block accent-2" />
                            <div className="accent-block accent-3" />

                            {projects.map((project) => (
                                <ProjectTile key={project.area} project={project} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom folio */}
                    <div className="mt-7 flex items-center justify-between border-t border-[#e9ebe9] pt-4 text-[9px] tracking-[0.16em] text-[#9ba39e]">
                        <span>DESIGN · MANUFACTURE · INSTALLATION</span>
                        <span>MEGHA / 01</span>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .projects-collage {
          height: 560px;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows: repeat(10, minmax(0, 1fr));
          gap: 8px;
        }

        .projects-main-title {
          grid-column: 1 / 5;
          grid-row: 6 / 11;
          align-self: center;
          position: relative;
          z-index: 2;
        }

        .project-tile {
          z-index: 1;
        }

        .p1 {
          grid-column: 2 / 5;
          grid-row: 3 / 6;
        }

        .p2 {
          grid-column: 5 / 7;
          grid-row: 2 / 5;
        }

        .p3 {
          grid-column: 7 / 9;
          grid-row: 2 / 7;
        }

        .p4 {
          grid-column: 9 / 11;
          grid-row: 1 / 4;
        }

        .p5 {
          grid-column: 11 / 13;
          grid-row: 3 / 7;
        }

        .p6 {
          grid-column: 5 / 7;
          grid-row: 5 / 11;
        }

        .p7 {
          grid-column: 7 / 10;
          grid-row: 7 / 11;
        }

        .p8 {
          grid-column: 9 / 11;
          grid-row: 4 / 7;
        }

        .p9 {
          grid-column: 10 / 12;
          grid-row: 7 / 10;
        }

        .accent-block {
          background: #c4d8d1;
          position: relative;
          z-index: 1;
        }

        .accent-1 {
          grid-column: 3 / 5;
          grid-row: 2 / 3;
        }

        .accent-2 {
          grid-column: 10 / 11;
          grid-row: 1 / 4;
        }

        .accent-3 {
          grid-column: 12 / 13;
          grid-row: 6 / 8;
        }

        @media (max-width: 1023px) {
          .projects-collage {
            height: 510px;
            gap: 6px;
          }

          .projects-main-title {
            grid-column: 1 / 5;
            grid-row: 7 / 11;
          }
        }

        @media (max-width: 639px) {
          .projects-collage {
            height: auto;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-template-rows: repeat(12, 72px);
            gap: 6px;
          }

          .projects-main-title {
            grid-column: 1 / 5;
            grid-row: 1 / 3;
            align-self: center;
          }

          .p1 { grid-column: 1 / 3; grid-row: 3 / 5; }
          .p2 { grid-column: 3 / 5; grid-row: 3 / 5; }
          .p3 { grid-column: 1 / 3; grid-row: 5 / 7; }
          .p4 { grid-column: 3 / 5; grid-row: 5 / 7; }
          .p5 { grid-column: 1 / 3; grid-row: 7 / 9; }
          .p6 { grid-column: 3 / 5; grid-row: 7 / 10; }
          .p7 { grid-column: 1 / 3; grid-row: 9 / 11; }
          .p8 { grid-column: 1 / 3; grid-row: 11 / 13; }
          .p9 { grid-column: 3 / 5; grid-row: 10 / 13; }

          .accent-block {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}
