
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";

import "swiper/css";

const products = [
    {
        id: 1,
        name: "MAXI PRO",
        category: "Premium Restroom Cubicles",
        description:
            "A sophisticated restroom cubicle system designed for premium commercial environments, combining modern aesthetics with dependable performance.",
        image: "/products/Neo.webp",
        href: "/products",
    },
    {
        id: 2,
        name: "DURO PRO",
        category: "High-Performance Partitions",
        description:
            "Engineered for demanding spaces, delivering exceptional durability, practical functionality, and a refined architectural finish.",
        image: "/products/duro pro toilet cubicles.webp",
        href: "/products",
    },
    {
        id: 3,
        name: "KIDDIEZ",
        category: "Children's Restroom Solutions",
        description:
            "Vibrant, functional cubicle systems designed to create safe, welcoming and engaging restroom spaces for children.",
        image: "/products/Kiddiez.webp",
        href: "/products",
    },
    {
        id: 4,
        name: "BLACK MAXI",
        category: "Contemporary Cubicle Systems",
        description:
            "Bold, minimal and architecturally distinctive restroom partitions for modern workplaces and commercial interiors.",
        image: "/products/Black Maxi.webp",
        href: "/products",
    },
    // {
    //     id: 5,
    //     name: "CIELO",
    //     category: "Designer Restroom Partitions",
    //     description:
    //         "A refined collection of restroom cubicles bringing together clean lines, premium finishes and long-lasting quality.",
    //     image: "/products/Cielo.webp",
    //     href: "/products",
    // },
];

export default function ProductShowcase() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const swiperRef = useRef(null);
    const progressRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const update = () => setIsReducedMotion(media.matches);

        update();
        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    // Animate content whenever active product changes
    useEffect(() => {
        if (!contentRef.current || isReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".product-reveal",
                {
                    y: 35,
                    opacity: 0,
                    filter: "blur(5px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.85,
                    stagger: 0.1,
                    ease: "power3.out",
                    overwrite: "auto",
                }
            );
        }, contentRef);

        return () => ctx.revert();
    }, [activeIndex, isReducedMotion]);

    // Progress indicator animation
    useEffect(() => {
        if (!progressRef.current) return;

        gsap.killTweensOf(progressRef.current);

        if (isReducedMotion) {
            gsap.set(progressRef.current, { scaleX: 1 });
            return;
        }

        gsap.fromTo(
            progressRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 5,
                ease: "none",
            }
        );

        return () => {
            gsap.killTweensOf(progressRef.current);
        };
    }, [activeIndex, isReducedMotion]);

    const goNext = () => {
        swiperRef.current?.slideNext();
    };

    const goPrev = () => {
        swiperRef.current?.slidePrev();
    };

    const selectProduct = (index) => {
        swiperRef.current?.slideToLoop(index);
    };

    const activeProduct = products[activeIndex];

    return (
        <section
            ref={sectionRef}
            id="products"
            aria-label="Explore Megha Systems products"
            className="relative isolate flex min-h-[760px] w-full items-center overflow-hidden bg-[var(--primary)] text-white lg:min-h-[700px] lg:h-[90svh]"
        >
            {/* Fullscreen Changing Backgrounds */}
            <div className="absolute inset-0 -z-20">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${index === activeIndex
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                    >
                        <div
                            className={`relative h-full w-full transition-transform duration-[6000ms] ease-linear ${index === activeIndex
                                ? "scale-110"
                                : "scale-100"
                                }`}
                        >
                            <Image
                                src={product.image}
                                alt=""
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dark overlay */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/20 via-black/15 to-black/10" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Main layout */}
            <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-5 pb-12 pt-28 sm:px-8 lg:flex-row lg:items-end lg:gap-10 lg:px-12 lg:pb-20 lg:pt-36">
                {/* Left content */}
                <div
                    ref={contentRef}
                    className="relative z-20 w-full shrink-0 lg:w-[40%] lg:pb-14"
                >
                    <div className="product-reveal mb-5 flex items-center gap-3">
                        <span className="h-px w-9 bg-[var(--secondary)]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-xs">
                            Megha Systems Collection
                        </span>
                    </div>

                    <p className="product-reveal mb-4 text-sm font-medium tracking-[0.06em] text-white/75 sm:text-base">
                        {activeProduct.category}
                    </p>

                    <h2
                        key={`title-${activeIndex}`}
                        className="product-reveal max-w-[600px] text-[clamp(54px,6vw,110px)] font-black uppercase leading-[0.94] tracking-[-0.06em]"
                    >
                        {activeProduct.name}
                    </h2>

                    <p className="product-reveal mt-6 max-w-[480px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                        {activeProduct.description}
                    </p>

                    <div className="product-reveal mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href={activeProduct.href}
                            className="group inline-flex items-center gap-3 rounded-full bg-[var(--secondary)] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
                        >
                            Explore Product
                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>
                </div>

                {/* Right Swiper Cards */}
                <div className="relative z-20 min-w-0 flex-1 lg:pb-1">
                    <div className="overflow-hidden">
                        <Swiper
                            modules={[Autoplay]}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.realIndex);
                            }}
                            loop={true}
                            speed={950}
                            grabCursor={true}
                            watchSlidesProgress={true}
                            autoplay={
                                isReducedMotion
                                    ? false
                                    : {
                                        delay: 5000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true,
                                    }
                            }
                            slidesPerView={1.6}
                            spaceBetween={12}
                            breakpoints={{
                                480: {
                                    slidesPerView: 2.1,
                                    spaceBetween: 14,
                                },
                                768: {
                                    slidesPerView: 2.8,
                                    spaceBetween: 16,
                                },
                                1024: {
                                    slidesPerView: 2.2,
                                    spaceBetween: 16,
                                },
                                1280: {
                                    slidesPerView: 2.8,
                                    spaceBetween: 18,
                                },
                            }}
                            className="!overflow-visible"
                        >
                            {products.map((product, index) => (
                                <SwiperSlide key={product.id}>
                                    <button
                                        type="button"
                                        onClick={() => selectProduct(index)}
                                        aria-label={`View ${product.name}`}
                                        aria-current={
                                            activeIndex === index
                                                ? "true"
                                                : undefined
                                        }
                                        className={`group relative block h-[240px] w-full overflow-hidden rounded-xl text-left transition-all duration-500 sm:h-[300px] lg:h-[200px] ${activeIndex === index
                                            ? "ring-2 ring-[var(--secondary)]"
                                            : "ring-1 ring-white/20"
                                            }`}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 55vw, (max-width: 1024px) 35vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                                        <div className="absolute bottom-0 left-0 w-full p-4">
                                            <p className="mb-0 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/75">
                                                {product.category}
                                            </p>

                                            <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.025em] text-white">
                                                {product.name}
                                            </h3>
                                        </div>

                                        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md">
                                            <ArrowUpRight size={16} />
                                        </span>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Bottom navigation */}
                    <div className="mt-7 flex items-center gap-5">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Previous product"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 hover:border-[var(--secondary)] hover:bg-[var(--secondary)]"
                            >
                                <ArrowLeft size={19} />
                            </button>

                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next product"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 hover:border-[var(--secondary)] hover:bg-[var(--secondary)]"
                            >
                                <ArrowRight size={19} />
                            </button>
                        </div>

                        <div className="relative h-[2px] max-w-[170px] flex-1 overflow-hidden bg-white/30">
                            <div
                                ref={progressRef}
                                className="absolute inset-0 origin-left bg-[var(--secondary)]"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </div>

                        <div className="ml-auto flex items-baseline gap-2 font-semibold">
                            <span className="text-3xl tabular-nums text-white">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>

                            <span className="text-sm text-white/50">
                                / {String(products.length).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
