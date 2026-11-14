
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers3,
  Settings2,
  Wrench,
  Headset,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Design & Planning",
    description:
      "Smart, space-efficient restroom layouts tailored to your project requirements.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Manufacturing",
    description:
      "High-quality cubicle and partition systems built with premium materials.",
    icon: Settings2,
  },
  {
    number: "03",
    title: "Installation",
    description:
      "Professional and precise installation for a seamless fit and finish.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "After-Sales Support",
    description:
      "Dedicated assistance to ensure long-term performance and peace of mind.",
    icon: Headset,
  },
];

function ServiceCard({ service, reverse = false }) {
  const Icon = service.icon;

  return (
    <article
      className={`service-card group relative flex min-h-[175px] flex-col justify-center overflow-hidden rounded-2xl border border-[#e1e8e6] bg-white/95 p-5 transition-all duration-300 hover:border-[var(--secondary)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)] sm:p-6 ${reverse ? "lg:text-right" : ""
        }`}
    >
      <div
        className={`flex items-center gap-3 ${reverse ? "lg:flex-row-reverse" : ""
          }`}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--secondary)_10%,white)] text-[var(--secondary)] transition-colors duration-300 group-hover:bg-[var(--secondary)] group-hover:text-white">
          <Icon size={21} strokeWidth={1.7} />
        </div>

        <span className="text-[25px] font-bold tracking-[0.12em] text-[#a1adaa]">
          {service.number}
        </span>

        <h3 className="flex-1 text-[16px] font-bold leading-snug text-[var(--primary)] sm:text-[17px]">
          {service.title}
        </h3>
      </div>

      <p className="mt-4 text-[13px] leading-[1.7] text-[#74817e] sm:text-sm">
        {service.description}
      </p>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-layout",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".service-image",
        {
          opacity: 0,
          scale: 0.9,
          y: 35,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-layout",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".service-footer",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-footer",
            start: "top 95%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTextMove = (event) => {
    if (event.pointerType === "touch") return;

    const text = textRef.current;
    const spotlight = spotlightRef.current;

    if (!text || !spotlight) return;

    const rect = text.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gsap.to(spotlight, {
      clipPath: `circle(150px at ${x}px ${y}px)`,
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleTextLeave = () => {
    if (!spotlightRef.current) return;

    gsap.to(spotlightRef.current, {
      clipPath: "circle(0px at 50% 50%)",
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-[#fafcfb]"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e8efed 1px, transparent 1px), linear-gradient(to bottom, #e8efed 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 5%, black 85%, transparent)",
        }}
      />

      {/* Animated Megha Systems Typography */}
      <div
        ref={textRef}
        onPointerMove={handleTextMove}
        onPointerLeave={handleTextLeave}
        className="relative mx-auto flex h-[130px] w-full max-w-[1500px] items-center justify-center overflow-hidden px-4 sm:h-[190px] lg:h-[200px]"
      >
        <div className="relative w-full text-center">
          {/* Outlined text */}
          <span
            aria-hidden="true"
            className="block whitespace-nowrap text-[clamp(35px,9vw,145px)] font-black uppercase leading-none tracking-[-0.015em] text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(23,28,32,0.25)",
            }}
          >
            MEGHA SYSTEMS
          </span>

          {/* Cursor-following colored fill */}
          <span
            ref={spotlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block whitespace-nowrap text-[clamp(35px,9vw,145px)] font-black uppercase leading-none tracking-[-0.015em] text-[var(--secondary)]"
            style={{
              clipPath: "circle(0px at 50% 50%)",
            }}
          >
            MEGHA SYSTEMS
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12 py-12 sm:py-15">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[var(--secondary)]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
              What We Offer
            </span>

            <span className="h-px w-9 bg-[var(--secondary)]" />
          </div>

          <h2 id="services-title" className="text-[clamp(38px,5vw,60px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--primary)]">
            Our Services
          </h2>
        </div>

        {/* Main 3-column layout */}
        <div className="services-layout grid items-center gap-5 lg:grid-cols-[1fr_0.95fr_1fr] lg:gap-7">
          {/* Left cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ServiceCard service={services[0]} reverse />
            <ServiceCard service={services[2]} reverse />
          </div>

          {/* Center image */}
          <div className="service-image relative mx-auto w-full max-w-[440px]">
            <div className="relative overflow-hidden rounded-[26px] border-[7px] border-white bg-[#e9eeee] shadow-[0_25px_65px_rgba(0,0,0,0.12)]">
              <div className="relative aspect-[4/5] w-full">
                <video
                  src="/video/Video-91175.mp4"
                  playInline
                  autoPlay
                  muted
                  loop
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Top label */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                <span className="h-2 w-2 rounded-full bg-[var(--secondary)]" />
                Premium Restroom Solutions
              </div>

              {/* Bottom information */}
              <div className="absolute bottom-1 left-4 right-4 rounded-xl bg-[var(--primary)]/95 p-4 text-white backdrop-blur-md">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/60">
                  Megha Systems
                </span>

                <p className="mt-1 text-[15px] font-bold">
                  Built for Lasting Performance
                </p>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-15 z-10 -translate-x-1/2 rounded-xl bg-white px-5 py-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
              <p className="text-3xl font-black tracking-[-0.06em] text-[var(--primary)]">
                25+
              </p>

              <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.13em] text-[#81908b]">
                Years Experience
              </p>
            </div>
          </div>

          {/* Right cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-1">
            <ServiceCard service={services[1]} />
            <ServiceCard service={services[3]} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="service-footer mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-5 rounded-xl bg-[var(--primary)] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--secondary)]"
          >
            Get a Free Quote

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={17} />
            </span>
          </Link>

          <span className="text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
            Quality • Precision • Reliability
          </span>
        </div>
      </div>
    </section>
  );
}
