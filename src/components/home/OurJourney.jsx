
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function OurJourney() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const timelineRef = useRef(null);
  const contentRef = useRef(null);
  const yearPanelRef = useRef(null);
  const triggerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [activeYear, setActiveYear] = useState(0);
  const [isPinnedMode, setIsPinnedMode] = useState(false);

  const activeJourney = JOURNEY[activeYear];
  const lastIndex = JOURNEY.length - 1;

  // Update the selected milestone.
  const updateYear = (index) => {
    const next = Math.max(0, Math.min(index, lastIndex));

    if (activeIndexRef.current === next) return;

    activeIndexRef.current = next;
    setActiveYear(next);
  };

  // Timeline buttons and arrows.
  const changeYear = (index) => {
    const next = Math.max(0, Math.min(index, lastIndex));
    const trigger = triggerRef.current;

    if (!trigger || !trigger.isEnabled) {
      updateYear(next);
      return;
    }

    // Each year occupies one equal scroll interval.
    // Target its center so the year remains selected.
    const progress = (next + 0.5) / JOURNEY.length;

    const target =
      trigger.start + progress * (trigger.end - trigger.start);

    // Instant scrolling avoids competing with GSAP pin transforms.
    // Lenis users can substitute lenis.scrollTo(target).
    window.scrollTo({
      top: target,
      behavior: reducedMotionRef.current ? "instant" : "smooth",
    });
  };

  // Pin the section and control the selected year from scroll.
  useSafeLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / sufficiently tall viewport.
      mm.add(
        "(min-width: 1024px) and (min-height: 720px)",
        () => {
          setIsPinnedMode(true);

          const trigger = ScrollTrigger.create({
            trigger: section,
            pin: pin,

            start: "top 20px",

            // Seven milestones, each with enough scrolling distance.
            end: () =>
              `+=${JOURNEY.length * Math.max(
                window.innerHeight * 0.55,
                350
              )}`,

            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const index = Math.min(
                lastIndex,
                Math.floor(self.progress * JOURNEY.length)
              );

              updateYear(index);
            },

            onRefresh: (self) => {
              const index = Math.min(
                lastIndex,
                Math.floor(self.progress * JOURNEY.length)
              );

              updateYear(index);
            },
          });

          triggerRef.current = trigger;

          return () => {
            triggerRef.current = null;
            setIsPinnedMode(false);
          };
        }
      );

      // Initial heading reveal.
      if (!reducedMotionRef.current) {
        gsap.from(".journey-heading", {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      }

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [lastIndex]);

  // Animate the milestone whenever its year changes.
  useSafeLayoutEffect(() => {
    const content = contentRef.current;
    const yearPanel = yearPanelRef.current;

    if (!content || !yearPanel) return;

    gsap.killTweensOf([content, yearPanel]);

    if (reducedMotionRef.current) {
      gsap.set([content, yearPanel], {
        clearProps: "all",
      });
      return;
    }

    const tween = gsap.fromTo(
      [yearPanel, content],
      {
        autoAlpha: 0,
        y: 16,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.out",
        overwrite: "auto",
      }
    );

    return () => tween.kill();
  }, [activeYear]);

  // Keep the active timeline button visible on mobile.
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const activeButton = timeline.querySelector(
      '[aria-current="step"]'
    );

    if (!activeButton) return;

    const targetLeft =
      activeButton.offsetLeft +
      activeButton.offsetWidth / 2 -
      timeline.clientWidth / 2;

    timeline.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reducedMotionRef.current ? "auto" : "smooth",
    });
  }, [activeYear]);

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      className="relative border-y border-[var(--border-color)] bg-white"
    >
      <div
        ref={pinRef}
        className="relative bg-white py-8 sm:py-10 lg:py-8"
      >
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">

          {/* ================= HEADING ================= */}
          <div className="journey-heading mb-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[var(--secondary)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                  Our Story
                </span>
              </div>

              <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
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

          {/* ================= TIMELINE ================= */}
          <div
            ref={timelineRef}
            className="journey-years relative mb-5 overflow-x-auto py-5"
          >
            <div className="relative flex min-w-[650px] items-center justify-between">

              {/* Background line */}
              <div className="absolute left-5 right-5 top-5 h-px bg-[var(--border-color)]" />

              {/* Progress line */}
              <div
                className="absolute left-5 top-5 h-[2px] bg-[var(--secondary)] transition-[width] duration-500 ease-out"
                style={{
                  width: `calc((100% - 40px) * ${activeYear / lastIndex
                    })`,
                }}
              />

              {JOURNEY.map((item, index) => (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => changeYear(index)}
                  aria-label={`View ${item.year} milestone`}
                  aria-current={
                    activeYear === index ? "step" : undefined
                  }
                  className="journey-year-btn group relative z-10 flex flex-col items-center gap-2"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white transition-all duration-500 ${activeYear === index
                        ? "scale-110 bg-[var(--secondary)] shadow-[0_0_0_1px_#00a896,0_8px_20px_rgba(0,168,150,0.2)]"
                        : "bg-[#dfe9e6] group-hover:bg-[var(--secondary)]"
                      }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>

                  <span
                    className={`text-sm font-semibold transition-colors ${activeYear === index
                        ? "text-[var(--secondary)]"
                        : "text-[var(--text-secondary)] group-hover:text-[var(--primary)]"
                      }`}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================= JOURNEY CARD ================= */}
          <div className="grid min-h-[350px] overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--background)] lg:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT PANEL */}
            <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[var(--primary)] p-7 text-white sm:p-10 lg:p-10">

              <div className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full border border-white/10" />

              <div className="pointer-events-none absolute -bottom-16 -right-16 h-[250px] w-[250px] rounded-full border border-[var(--secondary)]/30" />

              <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                Megha Systems / History
              </span>

              <div ref={yearPanelRef} className="relative z-10">
                <p className="text-[clamp(5rem,11vw,10rem)] font-semibold leading-none tracking-[-0.09em]">
                  {activeJourney.year}
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/50">
                  {activeJourney.label}
                </p>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div ref={contentRef}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                  Milestone {activeJourney.number}
                </p>

                <h3 className="max-w-[600px] text-[clamp(2rem,3.5vw,3.7rem)] font-semibold leading-[1.12] tracking-[-0.055em]">
                  {activeJourney.title}
                </h3>

                <p className="mt-5 max-w-[530px] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {activeJourney.description}
                </p>
              </div>

              {/* PREVIOUS / NEXT */}
              <div className="mt-8 flex items-center gap-3">
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
                  disabled={activeYear === lastIndex}
                  aria-label="Next milestone"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white transition-all hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowRight size={19} />
                </button>

                <span className="ml-4 text-xs tracking-[0.15em] text-[var(--text-secondary)]">
                  {String(activeYear + 1).padStart(2, "0")}
                  {" / "}
                  {String(JOURNEY.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
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
