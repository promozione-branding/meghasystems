
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Faridabad",
    address:
      "Plot Number-P10/J-3, Adore Business City, Sector 72-73, Faridabad, Haryana, 121004",
    mapQuery:
      "Plot Number P10 J3 Adore Business City Sector 72 73 Faridabad Haryana 121004 India",
    active: true,
  },
  {
    name: "Hyderabad",
    address:
      "Plot No.341/1,2,3 & 4, Safdar Nagar, Borabanda, Hyderabad - 500018",
    mapQuery:
      "Plot 341 Safdar Nagar Borabanda Hyderabad Telangana 500018 India",
    active: true,
  },
  {
    name: "New Delhi",
    address:
      "12/1 Ground Floor, Khirki Extension, Malviya Nagar, New Delhi, Delhi - 110017",
    mapQuery:
      "12/1 Ground Floor Khirki Extension Malviya Nagar New Delhi 110017 India",
    active: true,
  },
  {
    name: "Gurgaon",
    address:
      "1344/31, Near Bal Bharti School, Laxman Vihar, Gurgaon",
    mapQuery:
      "1344/31 Near Bal Bharti School Laxman Vihar Gurgaon Haryana India",
    active: true,
  },
  {
    name: "Noida",
    address: "C-36, Sector 135, Noida",
    mapQuery: "C-36 Sector 135 Noida Uttar Pradesh India",
    active: true,
  },
  {
    name: "Ghaziabad",
    address: "Coming Soon",
    mapQuery: "",
    active: false,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/meghasystems/",
    icon: FaFacebook,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/meghasystems",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/megha_systems_restroomcubicles",
    icon: FaInstagram,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919873735716",
    icon: MessageCircle,
  },
];

const products = [
  "Black Maxi",
  "Maxi Pro",
  "Duro",
  "Duro Pro",
  "Cubic Doorz",
  "NEO",
  "Maxi",
  "Luron",
  "Cielo",
  "Premia",
  "Rove",
  "Kiddiez",
  "Kiddiez Pro",
  "Nylon Kiddiez",
  "Urinal Modesty Panels",
  "Other / Custom Solution",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  product: "",
  message: "",
};

export default function ContactClient() {
  const rootRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [formStatus, setFormStatus] = useState("");

  const activeLocation = locations[selectedLocation];

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    activeLocation.mapQuery
  )}&output=embed`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedProduct = params.get("product");

    if (requestedProduct) {
      setForm((prev) => ({
        ...prev,
        product: products.includes(requestedProduct)
          ? requestedProduct
          : "Other / Custom Solution",
        message: products.includes(requestedProduct)
          ? prev.message
          : `I would like to enquire about ${requestedProduct}.`,
      }));
    }
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      gsap.utils.toArray(".contact-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `New Product Enquiry - ${form.product || "General Enquiry"
      }`;

    const body = [
      "Hello Megha Systems Team,",
      "",
      "I would like to submit an enquiry.",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Product: ${form.product}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const mailto = `mailto:contact@meghasystems.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    setFormStatus(
      "Your email application should open with the enquiry details. Please send the email to complete your enquiry."
    );
  };

  const inputClass =
    "w-full rounded-xl border border-[var(--border-color)] bg-[#f8faf9] px-4 py-4 text-sm text-[var(--primary)] outline-none transition-all placeholder:text-gray-400 focus:border-[var(--secondary)] focus:bg-white focus:ring-2 focus:ring-[var(--secondary)]/10";

  return (
    <main ref={rootRef}
      className="min-h-screen overflow-hidden bg-white text-[var(--primary)]"
    >
      <section className="relative flex min-h-[570px] items-center overflow-hidden bg-[var(--primary)] pt-20 text-white lg:min-h-[500px]">
        {/* Replace with your own hero image */}
        <div className="absolute inset-0">
          <Image
            src="/products/Luron.webp"
            alt="Megha Systems premium commercial restroom solutions"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#071720]/25 via-[#071720]/15 to-[#071720]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071720]/60 via-transparent to-transparent" />

        {/* Decorative SVG */}
        <svg
          className="pointer-events-none absolute right-[-120px] top-[10%] hidden h-[600px] w-[600px] opacity-25 lg:block"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="300"
            cy="300"
            r="250"
            stroke="var(--secondary)"
            strokeWidth="1"
          />
          <circle
            cx="300"
            cy="300"
            r="190"
            stroke="var(--secondary)"
            strokeWidth="1"
          />
          <circle
            cx="300"
            cy="300"
            r="130"
            stroke="var(--secondary)"
            strokeWidth="1"
          />
          <path
            d="M0 300H600M300 0V600"
            stroke="white"
            strokeOpacity="0.35"
          />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="contact-hero-reveal mb-10 flex items-center gap-2 text-sm text-white/65">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-white">Contact Us</span>
          </div>

          <div className="contact-hero-reveal mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--secondary)]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Get in Touch
            </span>
          </div>

          <h1 className="contact-hero-reveal max-w-[850px] text-[clamp(3.8rem,8vw,8rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
            Contact <span className="text-[var(--secondary)]">Us.</span>
          </h1>

          {/* <p className="contact-hero-reveal mt-7 max-w-[600px] text-base leading-8 text-white/75 sm:text-lg">
            Have a project in mind? Connect with Megha Systems
            for innovative, durable and beautifully designed
            restroom cubicle solutions.
          </p> */}

          <div className="contact-hero-reveal mt-9 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Explore Products
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="/our-projects"
              className="inline-flex items-center gap-3 rounded-xl border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--primary)]"
            >
              Our Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f8] py-12 lg:py-15">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Connect With Us
                </span>
              </div>

              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
                Let's Start a{" "}
                <span className="text-[var(--secondary)]">
                  Conversation.
                </span>
              </h2>
            </div>

            <p className="max-w-[420px] text-sm leading-7 text-[var(--text-secondary)]">
              Whether you're planning a new installation or upgrading
              an existing space, our team is ready to assist.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* EMAIL */}
            <a
              href="mailto:contact@meghasystems.com"
              className="contact-reveal group rounded-[26px] border border-[var(--border-color)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-xl sm:p-8"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                  <Mail size={26} />
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-gray-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--secondary)]"
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Email Us
              </p>

              <h3 className="mt-3 break-all text-lg font-semibold sm:text-xl">
                contact@meghasystems.com
              </h3>

              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                Send us your questions and enquiries.
              </p>
            </a>

            {/* PHONE */}
            <div className="contact-reveal rounded-[26px] border border-[var(--border-color)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-xl sm:p-8">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                <Phone size={26} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Call Us
              </p>

              <div className="mt-3 space-y-2">
                <a
                  href="tel:+919873735716"
                  className="block text-xl font-semibold transition hover:text-[var(--secondary)]"
                >
                  +91 9873735716
                </a>
                <a
                  href="tel:+919873735713"
                  className="block text-xl font-semibold transition hover:text-[var(--secondary)]"
                >
                  +91 9873735713
                </a>
              </div>

              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                Speak directly with our team.
              </p>
            </div>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/919873735716"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-reveal group rounded-[26px] bg-[var(--primary)] p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--secondary)]">
                  <MessageCircle size={27} />
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-white/50 transition group-hover:text-[var(--secondary)]"
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                WhatsApp Us
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Chat With Our Team
              </h3>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]">
                Start a Conversation
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-15">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--secondary)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Our Presence
              </span>
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
              Our <span className="text-[var(--secondary)]">Locations.</span>
            </h2>

            <p className="mt-5 max-w-[650px] text-sm leading-7 text-[var(--text-secondary)]">
              Find Megha Systems across multiple cities in India.
              Select any location to explore it on the map below.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {locations.map((location, index) => {
              const isSelected = selectedLocation === index;

              return (
                <button
                  key={location.name}
                  type="button"
                  disabled={!location.active}
                  onClick={() => {
                    setSelectedLocation(index);
                    document
                      .getElementById("contact-map")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }}
                  className={`contact-reveal group relative flex min-h-[245px] flex-col rounded-[24px] border p-7 text-left transition-all duration-300 sm:p-8 ${isSelected
                    ? "border-[var(--secondary)] bg-[var(--primary)] text-white shadow-xl"
                    : "border-[var(--border-color)] bg-[#f8faf9] hover:-translate-y-1 hover:border-[var(--secondary)]/40"
                    } ${!location.active ? "cursor-default" : ""}`}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${isSelected
                        ? "bg-white/10 text-[var(--secondary)]"
                        : "bg-[var(--secondary)]/10 text-[var(--secondary)]"
                        }`}
                    >
                      <MapPin size={23} />
                    </div>

                    {location.active ? (
                      <ArrowUpRight
                        size={20}
                        className={
                          isSelected
                            ? "text-[var(--secondary)]"
                            : "text-gray-400 transition group-hover:text-[var(--secondary)]"
                        }
                      />
                    ) : (
                      <span className="rounded-full bg-[var(--secondary)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)]">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight">
                    {location.name}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-7 ${isSelected
                      ? "text-white/65"
                      : "text-[var(--text-secondary)]"
                      }`}
                  >
                    {location.address}
                  </p>

                  {location.active && (
                    <span
                      className={`mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold ${isSelected
                        ? "text-[var(--secondary)]"
                        : "text-[var(--primary)]"
                        }`}
                    >
                      View on Map
                      <ArrowRight size={15} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f8] py-12 lg:py-15">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          {/* LEFT CONTENT */}
          <div className="contact-reveal">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--secondary)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Send an Enquiry
              </span>
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
              Have a Project{" "}
              <span className="text-[var(--secondary)]">
                in Mind?
              </span>
            </h2>

            <p className="mt-6 max-w-[480px] text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
              Share your requirements and our team will help
              you find the ideal cubicle system for your
              commercial or institutional space.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality-Focused Solutions",
                  description:
                    "Durable and thoughtfully engineered restroom systems.",
                },
                {
                  icon: Building2,
                  title: "Commercial Expertise",
                  description:
                    "Solutions for offices, institutions and public spaces.",
                },
                {
                  icon: Sparkles,
                  title: "Custom Project Support",
                  description:
                    "Discuss design preferences and installation requirements.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--secondary)] shadow-sm">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-12 border-t border-[var(--border-color)] pt-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em]">
                Follow Megha Systems
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition-all hover:-translate-y-1 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                    >
                      <Icon size={19} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="contact-reveal rounded-[28px] border border-[var(--border-color)] bg-white p-6 shadow-[0_15px_70px_rgba(0,0,0,0.035)] sm:p-9 lg:p-11">
            <div className="mb-9">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)]">
                <Send size={25} />
              </div>

              <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Send Us a Message
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Fill out the form below to prepare an enquiry email
                for our team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-product"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Select Product <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="contact-product"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Choose a product</option>

                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Tell us about your project requirements..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                Prepare Enquiry Email

                <Send
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {formStatus && (
                <p
                  role="status"
                  className="rounded-xl bg-[#f0f7f5] p-4 text-sm leading-6 text-[var(--primary)]"
                >
                  {formStatus}
                </p>
              )}

              <p className="text-center text-xs leading-6 text-[var(--text-secondary)]">
                This form opens your email application with the
                enquiry details. It does not submit data to a server.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section
        id="contact-map"
        className="scroll-mt-24 bg-white py-12 lg:py-15"
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="contact-reveal mb-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Find Our Office
                </span>
              </div>

              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.025em]">
                Locate <span className="text-[var(--secondary)]">Us.</span>
              </h2>

              <p className="text-sm text-[var(--text-secondary)]">
                Currently showing:{" "}
                <strong className="text-[var(--primary)]">
                  {activeLocation.name}
                </strong>
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                activeLocation.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--secondary)]"
            >
              Open in Google Maps
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="contact-reveal overflow-hidden rounded-[26px] border border-[var(--border-color)] bg-[#eef1ef] shadow-sm">
            <iframe
              key={activeLocation.name}
              src={mapUrl}
              title={`Megha Systems ${activeLocation.name} Location`}
              width="100%"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[350px] w-full border-0 sm:h-[450px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
