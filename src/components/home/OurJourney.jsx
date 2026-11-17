
"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY = [
  {
    year: "2026",
    label: "Today & Beyond",
    title: "Continuing to Build Better Spaces",
    description:
      "Megha Systems continues to focus on innovative restroom cubicle solutions, quality workmanship, and dependable project delivery.",
    image: "/products/Kiddiez.webp",
    number: "01",
  },
  {
    year: "2024",
    label: "Growing Stronger",
    title: "Expanding Our Capabilities",
    description:
      "Continuing to improve product quality, manufacturing processes, and the solutions offered to our clients.",
    image: "/products/duro pro toilet cubicles.webp",
    number: "02",
  },
  {
    year: "2022",
    label: "Product Development",
    title: "Solutions for Modern Spaces",
    description:
      "Focusing on versatile cubicle systems suited to contemporary commercial and institutional requirements.",
    image: "/products/Maxi Pro.webp",
    number: "03",
  },
  {
    year: "2020",
    label: "Our Commitment",
    title: "Designed for Lasting Performance",
    description:
      "Maintaining a strong focus on precision, durability, material quality, and installation standards.",
    image: "/products/Neo.webp",
    number: "04",
  },
  {
    year: "2018",
    label: "Building Expertise",
    title: "Refining Our Craft",
    description:
      "Strengthening our expertise in restroom partition design, manufacturing, and installation.",
    image: "/products/product.png",
    number: "05",
  },
  {
    year: "2015",
    label: "Early Development",
    title: "Laying a Strong Foundation",
    description:
      "Developing our approach to reliable restroom solutions and building lasting client relationships.",
    image: "/products/Premia.webp",
    number: "06",
  },
  {
    year: "2012",
    label: "The Beginning",
    title: "Where Our Story Began",
    description:
      "Megha Systems was established with a vision to deliver high-quality toilet cubicle partitions for commercial and institutional spaces.",
    image: "/products/Kiddiez Pro.webp",
    number: "07",
  },
];

const TOTAL = JOURNEY.length;
const LAST_INDEX = TOTAL - 1;
const SCROLL_PER_YEAR = 450;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function OurJourney() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const timelineRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const triggerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [activeYear, setActiveYear] = useState(0);

  const activeJourney = JOURNEY[activeYear];

  // ==========================================
  // UPDATE YEAR
  // ==========================================
  const updateYear = (index) => {
    const next = Math.max(0, Math.min(index, LAST_INDEX));

    if (next === activeIndexRef.current) return;

    activeIndexRef.current = next;
    setActiveYear(next);
  };

  // ==========================================
  // YEAR BUTTON NAVIGATION
  // ==========================================
  const changeYear = (index) => {
    const next = Math.max(0, Math.min(index, LAST_INDEX));
    const trigger = triggerRef.current;

    if (!trigger || !trigger.enabled) {
      updateYear(next);
      return;
    }

    const progress = (next + 0.5) / TOTAL;

    const target =
      trigger.start +
      (trigger.end - trigger.start) * progress;

    window.scrollTo({
      top: target,
      behavior: reducedMotionRef.current ? "instant" : "smooth",
    });
  };

  // ==========================================
  // PIN FROM TIMELINE BAR
  // ==========================================
  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        id: "megha-journey-timeline",

        // Trigger starts at the timeline container,
        // not the heading.
        trigger: pin,

        // Pin timeline + card + footer.
        pin: pin,

        // Pin when timeline reaches 20px from top.
        start: "top 80px",

        // Scroll through all milestones.
        end: () => `+=${TOTAL * SCROLL_PER_YEAR}`,

        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinReparent: true,

        onUpdate: (self) => {
          const index = Math.min(
            LAST_INDEX,
            Math.floor(self.progress * TOTAL)
          );

          updateYear(index);
        },

        onRefresh: (self) => {
          const index = Math.min(
            LAST_INDEX,
            Math.floor(self.progress * TOTAL)
          );

          updateYear(index);
        },
      });

      triggerRef.current = trigger;
    }, section);

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, []);

  // ==========================================
  // ANIMATE IMAGE AND CONTENT ON YEAR CHANGE
  // ==========================================
  useIsomorphicLayoutEffect(() => {
    const image = imageRef.current;
    const content = contentRef.current;

    if (!image || !content) return;

    gsap.killTweensOf([image, content]);

    if (reducedMotionRef.current) {
      gsap.set([image, content], {
        clearProps: "all",
      });
      return;
    }

    const animation = gsap.timeline();

    animation.fromTo(
      image,
      {
        autoAlpha: 0,
        scale: 1.06,
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      },
      0
    );

    animation.fromTo(
      content,
      {
        autoAlpha: 0,
        y: 20,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      },
      0.05
    );

    return () => animation.kill();
  }, [activeYear]);

  // ==========================================
  // KEEP ACTIVE TIMELINE BUTTON VISIBLE
  // ==========================================
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const button = timeline.querySelector(
      '[aria-current="step"]'
    );

    if (!button) return;

    const target =
      button.offsetLeft +
      button.offsetWidth / 2 -
      timeline.clientWidth / 2;

    timeline.scrollTo({
      left: Math.max(0, target),
      behavior: reducedMotionRef.current ? "auto" : "smooth",
    });
  }, [activeYear]);

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      className="relative border-y border-[var(--border-color)] bg-white"
    >
      {/* ==========================================
          HEADING - SCROLLS NORMALLY
      ========================================== */}
      <div className="mx-auto max-w-[1500px] px-5 pt-12 sm:px-8 lg:px-12 lg:pt-16">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-9 bg-[var(--secondary)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                Our Story
              </span>
            </div>

            <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[var(--primary)]">
              Our{" "}
              <span className="text-[var(--secondary)]">
                Journey.
              </span>
            </h2>
          </div>

          <p className="max-w-[450px] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            From our foundation in 2012 to the present,
            our story is shaped by craftsmanship, dedication,
            and continuous improvement.
          </p>
        </div>
      </div>

      {/* ==========================================
          PINNED AREA STARTS AT TIMELINE
      ========================================== */}
      <div
        ref={pinRef}
        className="relative z-10 bg-white pb-8"
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          {/* ======================================
              TIMELINE BAR
          ====================================== */}
          <div
            ref={timelineRef}
            className="relative mb-5 overflow-x-auto py-5 px-5"
          >
            <div className="relative flex min-w-[650px] items-center justify-between">

              {/* Base line */}
              <div className="absolute left-5 right-5 top-5 h-px bg-[var(--border-color)]" />

              {/* Progress line */}
              <div
                className="absolute left-5 top-5 h-[2px] bg-[var(--secondary)] transition-[width] duration-300"
                style={{
                  width: `calc((100% - 40px) * ${activeYear / LAST_INDEX
                    })`,
                }}
              />

              {JOURNEY.map((item, index) => {
                const isActive = activeYear === index;
                const isCompleted = index < activeYear;

                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => changeYear(index)}
                    aria-label={`View ${item.year} milestone`}
                    aria-current={
                      isActive ? "step" : undefined
                    }
                    className="group relative z-10 flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white transition-all duration-300 ${isActive
                        ? "scale-110 bg-[var(--secondary)] shadow-[0_0_0_1px_#00a896,0_8px_20px_rgba(0,168,150,0.2)]"
                        : isCompleted
                          ? "bg-[var(--secondary)]"
                          : "bg-[#dfe9e6] group-hover:bg-[var(--secondary)]"
                        }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>

                    <span
                      className={`text-sm font-semibold transition-colors ${isActive
                        ? "text-[var(--secondary)]"
                        : "text-[var(--text-secondary)] group-hover:text-[var(--primary)]"
                        }`}
                    >
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================
              MAIN JOURNEY CARD
          ====================================== */}
          <div className="grid min-h-[390px] overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--background)] lg:grid-cols-[0.95fr_1.05fr]">

            {/* ==================================
                LEFT FULL IMAGE
            ================================== */}
            <div className="relative min-h-[300px] overflow-hidden bg-[var(--primary)] lg:min-h-[390px]">

              <div
                ref={imageRef}
                className="absolute inset-0"
              >
                <Image
                  key={activeJourney.image}
                  src={activeJourney.image}
                  alt={`${activeJourney.year} - ${activeJourney.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={activeYear === 0}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/5" />

                {/* Top label */}
                <div className="absolute left-5 top-5 z-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                    Megha Systems / History
                  </span>
                </div>

                {/* Bottom year */}
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-[clamp(4.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                    {activeJourney.year}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    {activeJourney.label}
                  </p>
                </div>
              </div>
            </div>

            {/* ==================================
                RIGHT CONTENT
            ================================== */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

              <div ref={contentRef}>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                  Milestone {activeJourney.number}
                </p>

                <h3 className="max-w-[600px] text-[clamp(2rem,3.5vw,3.7rem)] font-semibold leading-[1.12] tracking-[-0.055em] text-[var(--primary)]">
                  {activeJourney.title}
                </h3>

                <p className="mt-6 max-w-[530px] text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
                  {activeJourney.description}
                </p>
              </div>

              {/* ==================================
                  PREVIOUS / NEXT BUTTONS
              ================================== */}
              <div className="mt-10 flex items-center gap-3">

                <button
                  type="button"
                  onClick={() => changeYear(activeYear - 1)}
                  disabled={activeYear === 0}
                  aria-label="Previous milestone"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={() => changeYear(activeYear + 1)}
                  disabled={activeYear === LAST_INDEX}
                  aria-label="Next milestone"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowRight size={19} />
                </button>

                <span className="ml-4 text-xs tracking-[0.15em] text-[var(--text-secondary)]">
                  {String(activeYear + 1).padStart(2, "0")}
                  {" / "}
                  {String(TOTAL).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ======================================
              FOOTER
          ====================================== */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              A journey of trust and excellence
            </p>

            <span className="hidden text-xs font-semibold text-[var(--secondary)] sm:block">
              2012 — 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
