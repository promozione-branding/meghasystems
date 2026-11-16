
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
    ArrowUpRight,
    ArrowRight,
    ArrowLeft,
    ArrowDown,
    Play,
    Pause,
    Award,
    Building2,
    Layers3,
    ShieldCheck,
    CheckCircle2,
    Factory,
    Landmark,
    Hotel,
    GraduationCap,
    Hospital,
    ShoppingBag,
    BriefcaseBusiness,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import OurJourney from "@/components/home/OurJourney";
import ManufacturingProcess from "@/components/home/ManufacturingProcess";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CertificatesSection from "@/components/home/CertificatesSection";

gsap.registerPlugin(ScrollTrigger);

/*
  Replace these paths with your actual images/video.

  All assets must be inside the public folder:
  public/about/hero.webp
  public/about/about-video.mp4
  public/about/industry-*.webp
*/

const HERO_IMAGE = "/products/Neo.webp";
const ABOUT_VIDEO = "/video/CLIP 4 COMPRESSED.mp4";

const JOURNEY = [
    {
        year: "2026",
        label: "Today & Beyond",
        title: "Continuing to Build Better Spaces",
        description:
            "Megha Systems continues to focus on innovative restroom cubicle solutions, quality workmanship, and dependable project delivery.",
        number: "01",
    },
    {
        year: "2024",
        label: "Growing Stronger",
        title: "Expanding Our Capabilities",
        description:
            "Continuing to improve product quality, manufacturing processes, and the solutions offered to our clients.",
        number: "02",
    },
    {
        year: "2022",
        label: "Product Development",
        title: "Solutions for Modern Spaces",
        description:
            "Focusing on versatile cubicle systems suited to contemporary commercial and institutional requirements.",
        number: "03",
    },
    {
        year: "2020",
        label: "Our Commitment",
        title: "Designed for Lasting Performance",
        description:
            "Maintaining a strong focus on precision, durability, material quality, and installation standards.",
        number: "04",
    },
    {
        year: "2018",
        label: "Building Expertise",
        title: "Refining Our Craft",
        description:
            "Strengthening our expertise in restroom partition design, manufacturing, and installation.",
        number: "05",
    },
    {
        year: "2015",
        label: "Early Development",
        title: "Laying a Strong Foundation",
        description:
            "Developing our approach to reliable restroom solutions and building lasting client relationships.",
        number: "06",
    },
    {
        year: "2012",
        label: "The Beginning",
        title: "Where Our Story Began",
        description:
            "Megha Systems was established with a vision to deliver high-quality toilet cubicle partitions for commercial and institutional spaces.",
        number: "07",
    },
];

const INDUSTRIES = [
    {
        title: "Corporate Offices",
        category: "WORKSPACES",
        description:
            "Modern and durable restroom cubicles designed for professional workplaces.",
        image: "/about/industry-corporate.webp",
        icon: BriefcaseBusiness,
    },
    {
        title: "Educational Institutions",
        category: "EDUCATION",
        description:
            "Safe, practical, and easy-to-maintain solutions for schools and universities.",
        image: "/about/industry-education.webp",
        icon: GraduationCap,
    },
    {
        title: "Healthcare Facilities",
        category: "HEALTHCARE",
        description:
            "Functional restroom partitions designed for demanding healthcare environments.",
        image: "/about/industry-healthcare.webp",
        icon: Hospital,
    },
    {
        title: "Hotels & Hospitality",
        category: "HOSPITALITY",
        description:
            "Premium cubicle systems that complement refined hospitality interiors.",
        image: "/about/industry-hotel.webp",
        icon: Hotel,
    },
    {
        title: "Shopping Malls",
        category: "RETAIL",
        description:
            "High-performance restroom solutions for busy retail environments.",
        image: "/about/industry-mall.webp",
        icon: ShoppingBag,
    },
    {
        title: "Public Infrastructure",
        category: "PUBLIC SPACES",
        description:
            "Robust cubicle systems built for high-traffic public facilities.",
        image: "/about/industry-public.webp",
        icon: Landmark,
    },
];

const STATS = [
    {
        value: "25+",
        label: "Years of Industry Experience",
        icon: Award,
    },
    {
        value: "5,000+",
        label: "Projects Completed",
        icon: Building2,
    },
    {
        value: "1 Lakh+",
        label: "Cubicles Installed",
        icon: Layers3,
    },
];

export default function About() {
    const rootRef = useRef(null);
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);

    // ---------------- VIDEO ----------------
    const toggleVideo = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch {
                setPlaying(false);
            }
        } else {
            video.pause();
        }
    };

    // ---------------- GSAP ----------------
    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            // Hero
            gsap.from(".about-hero-item", {
                opacity: 0,
                y: 50,
                duration: 1.1,
                stagger: 0.14,
                ease: "power3.out",
            });

            gsap.to(".about-hero-bg", {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Generic reveals
            gsap.utils.toArray(".about-reveal").forEach((element) => {
                gsap.from(element, {
                    opacity: 0,
                    y: 45,
                    duration: 0.95,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 87%",
                        once: true,
                    },
                });
            });

            // Video
            gsap.from(".about-video-wrap", {
                opacity: 0,
                x: -65,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-who",
                    start: "top 75%",
                    once: true,
                },
            });

            // Stats
            gsap.from(".about-stat-card", {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-stats",
                    start: "top 85%",
                    once: true,
                },
            });

            // Journey timeline
            gsap.from(".journey-year-btn", {
                opacity: 0,
                y: 30,
                stagger: 0.07,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".journey-years",
                    start: "top 85%",
                    once: true,
                },
            });

            // Animated architectural SVG
            gsap.to(".cta-architectural-line", {
                strokeDashoffset: -180,
                duration: 9,
                repeat: -1,
                ease: "none",
            });

            gsap.to(".cta-floating-point", {
                y: -14,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.3,
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={rootRef}
            className="overflow-hidden bg-[var(--background)] text-[var(--text-primary)]"
        >
            <section className="about-hero relative flex min-h-[680px] items-center justify-center overflow-hidden bg-[var(--primary)] px-5 pb-24 pt-36 text-white sm:min-h-[500px]">
                {/* Background image */}
                <div className="about-hero-bg absolute -inset-y-[15%] inset-x-0">
                    <Image
                        src={HERO_IMAGE}
                        alt="Premium toilet cubicle installation by Megha Systems"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#101820]/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/85 via-transparent to-[#101820]/30" />

                {/* Fine grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
                        backgroundSize: "100px 100px",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-[1100px] text-center">
                    <div className="about-hero-item mb-5 flex items-center justify-center gap-4">
                        <span className="h-px w-10 bg-[var(--secondary)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
                            Welcome to Megha Systems
                        </span>
                        <span className="h-px w-10 bg-[var(--secondary)]" />
                    </div>

                    <h1 className="about-hero-item text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
                        Spaces Designed
                        <br />
                        <span className="text-[var(--secondary)]">
                            To Last.
                        </span>
                    </h1>

                    <p className="about-hero-item mx-auto mt-8 max-w-[650px] text-sm leading-8 text-white/80 sm:text-base">
                        Since 2012, creating modern, durable, and thoughtfully
                        engineered restroom cubicle solutions for spaces that
                        matter.
                    </p>

                    <div className="about-hero-item mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/contact-us"
                            className="group inline-flex items-center gap-4 rounded-full bg-[var(--secondary)] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--primary)]"
                        >
                            Start Your Project

                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--primary)] transition-transform group-hover:rotate-45 group-hover:bg-[var(--primary)] group-hover:text-white">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>

                        <a
                            href="#our-journey"
                            className="group inline-flex items-center gap-3 rounded-full border border-white/35 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                        >
                            Explore Our Journey
                            <ArrowDown
                                size={17}
                                className="transition-transform group-hover:translate-y-1"
                            />
                        </a>
                    </div>
                </div>
            </section>

            <section
                id="who-we-are"
                className="about-who relative py-10 sm:py-12 lg:py-16"
            >
                <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-12">
                    {/* LEFT VIDEO */}
                    <div className="about-video-wrap relative">
                        <div className="relative aspect-[4/4.3] overflow-hidden rounded-[28px] bg-[var(--primary)] sm:aspect-[5/4.3] lg:aspect-[4/3]">
                            {!videoError && (
                                <video
                                    ref={videoRef}
                                    src={ABOUT_VIDEO}
                                    playsInline
                                    preload="metadata"
                                    className="h-full w-full object-cover"
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onError={() => setVideoError(true)}
                                />
                            )}

                            {videoError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--primary)] text-center text-white">
                                    <Factory
                                        size={65}
                                        strokeWidth={1}
                                        className="text-[var(--secondary)]"
                                    />
                                    <p className="text-sm text-white/60">
                                        Megha Systems Manufacturing & Installation
                                    </p>
                                </div>
                            )}

                            {/* Video overlay */}
                            {!playing && (
                                <div className="pointer-events-none absolute inset-0 bg-black/20" />
                            )}

                            {!videoError && (
                                <button
                                    type="button"
                                    onClick={toggleVideo}
                                    aria-label={playing ? "Pause video" : "Play video"}
                                    className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[var(--primary)] shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-[var(--secondary)] hover:text-white"
                                >
                                    {playing ? (
                                        <Pause size={25} fill="currentColor" />
                                    ) : (
                                        <Play
                                            size={26}
                                            fill="currentColor"
                                            className="ml-1"
                                        />
                                    )}
                                </button>
                            )}

                            <div className="pointer-events-none absolute bottom-7 left-7 z-10 text-white">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                                    Precision In Every Detail
                                </p>
                                <p className="mt-2 text-xl font-semibold">
                                    Built With Purpose.
                                </p>
                            </div>
                        </div>

                        {/* Floating experience badge */}
                        <div className="absolute -bottom-6 right-5 flex items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-white px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] sm:-right-5">
                            <Award
                                size={34}
                                strokeWidth={1.4}
                                className="text-[var(--secondary)]"
                            />
                            <div>
                                <p className="text-3xl font-semibold tracking-[-0.06em]">
                                    25+
                                </p>
                                <p className="text-[11px] text-[var(--text-secondary)]">
                                    Years of Experience
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:pl-5">
                        <div className="about-reveal mb-2 flex items-center gap-3">
                            <span className="h-px w-9 bg-[var(--secondary)]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                                Who We Are
                            </span>
                        </div>

                        <h2 className="about-reveal text-[clamp(2.8rem,4.8vw,5rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
                            Crafting Better
                            <br />
                            <span className="text-[var(--secondary)]">
                                Restroom Spaces.
                            </span>
                        </h2>

                        <p className="about-reveal mt-5 text-base leading-6 text-[var(--text-primary)]">
                            Established in 2012, Megha Systems is a trusted
                            name in the design, manufacturing, and installation
                            of toilet cubicle partitions.
                        </p>

                        <p className="about-reveal mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            Led by Mr. Rakesh Talwar, with more than 25 years
                            of industry experience, we specialize in complete
                            restroom solutions for commercial and institutional
                            environments. Our focus remains on quality,
                            precision, and lasting performance.
                        </p>

                        {/* STATS */}
                        <div className="about-stats mt-5 grid grid-cols-3 gap-3 border-t border-[var(--border-color)] pt-5">
                            {STATS.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="about-stat-card"
                                    >
                                        <Icon
                                            size={22}
                                            strokeWidth={1.5}
                                            className="mb-4 text-[var(--secondary)]"
                                        />

                                        <p className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-semibold leading-none tracking-[-0.06em]">
                                            {stat.value}
                                        </p>

                                        <p className="mt-3 max-w-[120px] text-[11px] leading-5 text-[var(--text-secondary)]">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/contact-us"
                            className="about-reveal group mt-9 inline-flex items-center gap-3 border-b border-[var(--primary)] pb-2 text-sm font-semibold transition-colors hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                        >
                            Get In Touch
                            <ArrowUpRight
                                size={18}
                                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>

            <main className="overflow-hidden">
                <OurJourney />
            </main>

            <section className="relative py-10 sm:py-16">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                    <div className="about-reveal mb-8 flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <span className="h-px w-9 bg-[var(--secondary)]" />
                                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                                    Where We Work
                                </span>
                            </div>

                            <h2 className="text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                                Industries{" "}
                                <span className="text-[var(--secondary)]">
                                    We Serve.
                                </span>
                            </h2>

                            {/* <p className="mt-5 max-w-[600px] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                                Thoughtfully designed restroom cubicle solutions
                                for diverse commercial and institutional environments.
                            </p> */}
                        </div>

                        {/* Swiper navigation */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="industry-prev flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                aria-label="Previous industry"
                            >
                                <ArrowLeft size={19} />
                            </button>

                            <button
                                type="button"
                                className="industry-next flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                aria-label="Next industry"
                            >
                                <ArrowRight size={19} />
                            </button>
                        </div>
                    </div>

                    <Swiper
                        modules={[Autoplay, Navigation]}
                        navigation={{
                            prevEl: ".industry-prev",
                            nextEl: ".industry-next",
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        loop
                        speed={850}
                        spaceBetween={20}
                        slidesPerView={1.15}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.8,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 3.2,
                                spaceBetween: 26,
                            },
                        }}
                        className="!overflow-visible"
                    >
                        {INDUSTRIES.map((industry, index) => {
                            const Icon = industry.icon;

                            return (
                                <SwiperSlide key={industry.title}>
                                    <div className="group relative h-[440px] overflow-hidden rounded-[24px] bg-[var(--primary)] sm:h-[490px]">
                                        <Image
                                            src={industry.image}
                                            alt={industry.title}
                                            fill
                                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 35vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/25 to-transparent" />

                                        {/* Top */}
                                        <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
                                            <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
                                                {industry.category}
                                            </span>

                                            <span className="text-xs font-medium text-white/75">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                                <Icon size={23} strokeWidth={1.5} />
                                            </div>

                                            <h3 className="text-[27px] font-semibold leading-tight tracking-[-0.045em]">
                                                {industry.title}
                                            </h3>

                                            <p className="mt-3 max-w-[310px] text-sm leading-6 text-white/70">
                                                {industry.description}
                                            </p>

                                            <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5">
                                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--secondary)]">
                                                    Explore Solutions
                                                </span>

                                                <ArrowUpRight
                                                    size={20}
                                                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </section>

            <ManufacturingProcess />
            <WhyChooseUs />
            <CertificatesSection />

            <section className="about-cta relative overflow-hidden border-t border-[var(--border-color)] bg-white py-10 sm:py-12">
                {/* Animated architectural background */}
                <svg
                    viewBox="0 0 1440 550"
                    preserveAspectRatio="xMidYMid slice"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
                    aria-hidden="true"
                >
                    <g
                        fill="none"
                        stroke="#00a896"
                        strokeWidth="1.3"
                        strokeDasharray="10 15"
                    >
                        <path
                            className="cta-architectural-line"
                            d="M-100 430L260 250L580 430L930 210L1500 440"
                        />
                        <path
                            className="cta-architectural-line"
                            d="M-100 480L260 300L580 480L930 260L1500 490"
                        />
                        <path
                            className="cta-architectural-line"
                            d="M-100 530L260 350L580 530L930 310L1500 540"
                        />
                    </g>

                    <g fill="#00a896">
                        <circle
                            className="cta-floating-point"
                            cx="260"
                            cy="250"
                            r="6"
                        />
                        <circle
                            className="cta-floating-point"
                            cx="580"
                            cy="430"
                            r="5"
                        />
                        <circle
                            className="cta-floating-point"
                            cx="930"
                            cy="210"
                            r="7"
                        />
                    </g>
                </svg>

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--secondary)]/[0.06] blur-[90px]" />

                <div className="about-reveal relative z-10 mx-auto max-w-[1000px] px-5 text-center sm:px-8">
                    <div className="mb-2 flex items-center justify-center gap-4">
                        <span className="h-px w-9 bg-[var(--secondary)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
                            Let's Build Together
                        </span>
                        <span className="h-px w-9 bg-[var(--secondary)]" />
                    </div>

                    <h2 className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-[1] tracking-[-0.045em]">
                        Your Vision.
                        <br />
                        <span className="text-[var(--secondary)]">
                            Our Expertise.
                        </span>
                    </h2>

                    <p className="mx-auto mt-7 max-w-[600px] text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
                        Planning a new restroom project or upgrading an
                        existing space? Let's create something exceptional
                        together with quality cubicle solutions built to last.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/contact-us"
                            className="group inline-flex items-center gap-5 rounded-full bg-[var(--primary)] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-all hover:bg-[var(--secondary)]"
                        >
                            Start Your Project

                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--secondary)] transition-all group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--primary)]">
                                <ArrowUpRight size={19} />
                            </span>
                        </Link>

                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-white px-7 py-4 text-sm font-semibold transition-all hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                        >
                            Explore Products
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
