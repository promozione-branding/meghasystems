
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Replace image paths with your actual product images
const products = [
    {
        id: 1,
        name: "Premium Toilet Cubicles",
        category: "CLASSIC RANGE",
        image: "/products/Black Maxi.webp",
    },
    {
        id: 2,
        name: "Designer Cubicle Systems",
        category: "LUXE RANGE",
        image: "/products/Cielo.webp",
    },
    {
        id: 3,
        name: "Compact Restroom Cubicles",
        category: "URINAL PARTITIONS",
        image: "/products/Commercial Urinal Partitions.webp",
    },
    {
        id: 4,
        name: "Luxury Washroom Partitions",
        category: "CLASSIC RANGE",
        image: "/products/Cubi Doorz.webp",
    },
    {
        id: 5,
        name: "Commercial Toilet Cubicles",
        category: "CLASSIC RANGE",
        image: "/products/duro pro toilet cubicles.webp",
    },
    {
        id: 6,
        name: "Modern Cubicle Solutions",
        category: "CLASSIC RANGE",
        image: "/products/Duro-Toilet-Cubicles.webp",
    },
    {
        id: 7,
        name: "Elegant Restroom Interiors",
        category: "KIDS RANGE",
        image: "/products/Kiddiez Pro.webp",
    },
    {
        id: 8,
        name: "High-Performance Partitions",
        category: "KIDS RANGE",
        image: "/products/Kiddiez.webp",
    },
    {
        id: 9,
        name: "High-Performance Partitions",
        category: "KIDS RANGE",
        image: "/products/kids2.webp",
    },
    {
        id: 10,
        name: "High-Performance Partitions",
        category: "CLASSIC RANGE",
        image: "/products/Luron.webp",
    },
    {
        id: 11,
        name: "High-Performance Partitions",
        category: "CLASSIC RANGE",
        image: "/products/Maxi Pro.webp",
    },
    {
        id: 12,
        name: "High-Performance Partitions",
        category: "CLASSIC RANGE",
        image: "/products/Maxi.webp",
    },
    {
        id: 13,
        name: "High-Performance Partitions",
        category: "CLASSIC RANGE",
        image: "/products/Neo.webp",
    },
    {
        id: 14,
        name: "High-Performance Partitions",
        category: "LUXE RANGE",
        image: "/products/Premia.webp",
    },
    {
        id: 15,
        name: "High-Performance Partitions",
        category: "LUXE RANGE",
        image: "/products/Rove.webp",
    },
];

function ProductCard({ product }) {
    return (
        <div className="group relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-2xl bg-[var(--surface)] sm:h-[200px] sm:w-[250px] lg:h-[200px] lg:w-[300px]">
            <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* Top icon */}
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-[var(--secondary)]">
                <ArrowUpRight size={19} />
            </div>

            {/* Product details */}
            <div className="absolute bottom-0 left-0 w-full p-4">
                {/* <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {product.category}
                </p> */}

                <h3 className="text-lg font-semibold leading-tight text-white">
                    {product.category}
                </h3>
            </div>
        </div>
    );
}

function MarqueeRow({ items, direction = "left", speed = 35 }) {
    const rowRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        if (!row || !items.length) return;

        const group = row.querySelector("[data-marquee-group]");
        if (!group) return;

        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const setup = () => {
            animationRef.current?.kill();

            const distance = group.offsetWidth;
            if (!distance) return;

            const movingRight = direction === "right";

            // First product is visible immediately at the left edge.
            gsap.set(row, { x: 0 });

            if (motionQuery.matches) return;

            animationRef.current = gsap.fromTo(
                row,
                {
                    x: movingRight ? -distance : 0,
                },
                {
                    x: movingRight ? 0 : -distance,
                    duration: distance / speed,
                    ease: "none",
                    repeat: -1,
                    overwrite: true,
                    immediateRender: false,
                }
            );

            // Right-moving row starts at the end of the cycle.
            // This keeps the first product visible at initial render.
            if (movingRight) {
                animationRef.current.progress(1);
            }
        };

        setup();

        const observer = new ResizeObserver(setup);
        observer.observe(group);

        return () => {
            observer.disconnect();
            animationRef.current?.kill();
            gsap.set(row, { clearProps: "transform" });
        };
    }, [direction, speed, items]);

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => animationRef.current?.pause()}
            onMouseLeave={() => animationRef.current?.resume()}
        >
            <div
                ref={rowRef}
                className="flex w-max will-change-transform"
            >
                {/* First copy */}
                <div
                    data-marquee-group
                    className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
                >
                    {items.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

                {/* Second copy */}
                <div
                    aria-hidden="true"
                    className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
                >
                    {items.map((product) => (
                        <ProductCard
                            key={`duplicate-${product.id}`}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProductMarquee() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".marquee-heading",
                {
                    y: 60,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".marquee-heading",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".marquee-row",
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".marquee-rows",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[var(--background)] py-5"
        >
            {/* Heading */}
            {/* <div className="marquee-heading mx-auto mb-12 max-w-[1500px] px-5 sm:px-8 lg:mb-16 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-9 bg-[var(--secondary)]" />

          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--secondary)]">
            Explore Our Collection
          </span>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-[800px] text-[clamp(38px,5vw,72px)] font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--primary)]">
              Designed to Impress.
              <br />
              <span className="font-light">
                Built to Perform.
              </span>
            </h2>
          </div>

          <div className="max-w-[380px]">
            <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Discover our range of premium restroom cubicles
              and partition systems, crafted to elevate every
              space with precision and style.
            </p>

            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--secondary)]"
            >
              View All Products

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div> */}

            {/* Two Marquee Rows */}
            {/* Two Marquee Rows */}
            <div className="marquee-rows relative">

                {/* First Row — Moves Right */}
                <div className="marquee-row">
                    <MarqueeRow
                        items={products.slice(0, 8)}
                        direction="right"
                        speed={40}
                    />
                </div>

                {/* Second Row — Moves Left */}
                <div className="marquee-row mt-2">
                    <MarqueeRow
                        items={products.slice(8, 15)}
                        direction="left"
                        speed={35}
                    />
                </div>

                {/* Edge Fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-20" />

                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-20" />

            </div>
        </section>
    );
}
