
"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
    Star,
    UserRound,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import "swiper/css";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Project Manager",
        review:
            "The cubicle partitions have a premium finish and excellent build quality. The entire process was handled professionally.",
        rating: 5,
    },
    {
        id: 2,
        name: "Amit Verma",
        role: "Commercial Property Owner",
        review:
            "We wanted a modern and durable restroom solution. The final installation looks excellent and fits our space perfectly.",
        rating: 5,
    },
    {
        id: 3,
        name: "Neha Kapoor",
        role: "Interior Designer",
        review:
            "The range of finishes and customisation options made it easy to achieve the design we had planned for our project.",
        rating: 5,
    },
    {
        id: 4,
        name: "Vikram Singh",
        role: "Facility Manager",
        review:
            "Good product quality and a clean installation. The partitions are practical, sturdy, and easy to maintain.",
        rating: 5,
    },
    {
        id: 5,
        name: "Priya Mehta",
        role: "Architect",
        review:
            "The team understood our requirements and helped us select the right cubicle configuration for the available space.",
        rating: 5,
    },
    {
        id: 6,
        name: "Rohit Gupta",
        role: "Operations Manager",
        review:
            "From material selection to installation, the experience was smooth. The completed restroom looks professional.",
        rating: 5,
    },
    {
        id: 7,
        name: "Sanjay Malhotra",
        role: "Business Owner",
        review:
            "The workmanship and attention to detail were impressive. We are pleased with the overall appearance and finish.",
        rating: 5,
    },
    {
        id: 8,
        name: "Anjali Rao",
        role: "Design Consultant",
        review:
            "The cubicle systems complemented our interiors beautifully. A great combination of functionality and design.",
        rating: 5,
    },
];

function TestimonialCard({ item }) {
    return (
        <article className="flex h-full min-h-[290px] flex-col justify-between rounded-[22px] border border-[var(--border-color)]/70 bg-[var(--surface)] p-6 sm:min-h-[200px]">
            <div>
                <div className="mb-5 flex items-center gap-1 text-[var(--accent)]">
                    {Array.from({ length: item.rating }).map((_, index) => (
                        <Star
                            key={index}
                            size={20}
                            fill="currentColor"
                            strokeWidth={1}
                        />
                    ))}
                </div>

                <p className="text-[15px] leading-[1.8] text-[var(--text-primary)] sm:text-[16px]">
                    {item.review}
                </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
                {/* AVATAR ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)]">
                    <UserRound size={24} strokeWidth={1.5} />
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold text-[var(--text-primary)]">
                        {item.name}
                    </h3>

                    <p className="mt-1 truncate text-[12px] text-[var(--text-secondary)]">
                        {item.role}
                    </p>
                </div>
            </div>
        </article>
    );
}

function TestimonialRow({
    items,
    reverse = false,
    swiperRef,
    onIndexChange,
}) {
    return (
        <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => onIndexChange?.(swiper.realIndex)}
            loop
            grabCursor
            speed={850}
            slidesPerView={1.12}
            spaceBetween={16}
            centeredSlides
            autoplay={{
                delay: reverse ? 3800 : 3200,
                reverseDirection: reverse,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 1.7,
                    spaceBetween: 18,
                    centeredSlides: false,
                },
                900: {
                    slidesPerView: 2.6,
                    spaceBetween: 22,
                    centeredSlides: false,
                },
                1200: {
                    slidesPerView: 3.2,
                    spaceBetween: 24,
                    centeredSlides: false,
                },
            }}
            className="!overflow-visible"
        >
            {items.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                    <TestimonialCard item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default function TestimonialsSection() {
    const firstSwiper = useRef(null);
    const secondSwiper = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const firstRow = TESTIMONIALS.slice(0, 4);
    const secondRow = TESTIMONIALS.slice(4);

    const previous = () => {
        firstSwiper.current?.slidePrev();
        secondSwiper.current?.slidePrev();
    };

    const next = () => {
        firstSwiper.current?.slideNext();
        secondSwiper.current?.slideNext();
    };

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-[var(--background)] border border-[var(--secondary)]/40 py-10"
        >
            {/* HEADER */}
            <div className="mx-auto mb-8 max-w-[1200px] px-5 text-center">
                <div className="mb-2 flex items-center justify-center gap-4">
                    <span className="h-px w-9 bg-[var(--secondary)]" />

                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                        Testimonials
                    </span>

                    <span className="h-px w-9 bg-[var(--secondary)]" />
                </div>

                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.055em] text-[var(--text-primary)]">
                    We love what we do, and
                    <br />
                    <span className="font-serif font-normal italic text-[var(--secondary)]">
                        they love the results.
                    </span>
                </h2>
            </div>

            {/* SWIPER ROWS */}
            <div className="relative">
                {/* FADED LEFT EDGE */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-24 lg:w-40"
                />

                {/* FADED RIGHT EDGE */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24 lg:w-40"
                />

                <div className="mx-auto max-w-[1450px]">
                    <TestimonialRow
                        items={firstRow}
                        swiperRef={firstSwiper}
                        onIndexChange={setActiveIndex}
                    />
                </div>

                <div className="mx-auto max-w-[1450px] mt-4">
                    <TestimonialRow
                        items={secondRow}
                        reverse
                        swiperRef={secondSwiper}
                    />
                </div>
            </div>
        </section>
    );
}
