
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    Check,
    ChevronRight,
    Copy,
    Link2,
    Mail,
    MessageCircle,
    Share2,
} from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const formatDate = (date) => {
    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) return "";

    return value.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default function SingleArticleClient({ blog }) {
    const heroRef = useRef(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [copied, setCopied] = useState(false);

    const [articleUrl, setArticleUrl] = useState("");

    useEffect(() => {
        setArticleUrl(window.location.href);
    }, []);

    useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".single-article-reveal",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRelated() {
            try {
                const response = await fetch("/api/blogs?limit=6", {
                    signal: controller.signal,
                });

                const data = await response.json();

                if (data.success) {
                    const filtered = (data.blogs || [])
                        .filter((item) => item.slug !== blog.slug)
                        .slice(0, 3);

                    setRelatedBlogs(filtered);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Related blogs error:", error);
                }
            }
        }

        fetchRelated();

        return () => controller.abort();
    }, [blog.slug]);

    const shareArticle = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Share failed:", error);
                }
            }
        } else {
            await copyLink();
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const shareLinks = [
        {
            name: "Facebook",
            icon: FaFacebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                articleUrl
            )}`,
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                articleUrl
            )}`,
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodeURIComponent(
                `${blog.title} ${articleUrl}`
            )}`,
        },
    ];

    return (
        <main className="min-h-screen bg-white text-[var(--primary)]">

            {/* =====================================
          ARTICLE HERO
      ===================================== */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-[var(--primary)] pb-16 pt-32 text-white lg:pb-15 lg:pt-40"
            >
                <div className="pointer-events-none absolute -right-20 -top-32 h-[550px] w-[550px] rounded-full bg-[var(--secondary)]/15 blur-[120px]" />

                <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">

                    {/* BREADCRUMB */}
                    <div className="single-article-reveal mb-8 flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <Link href="/our-articles" className="hover:text-white">
                            Articles
                        </Link>

                        <ChevronRight size={15} />

                        <span className="max-w-[350px] truncate text-white">
                            {blog.title}
                        </span>
                    </div>

                    <div className="single-article-reveal mb-2 flex items-center gap-4">
                        <span className="h-px w-12 bg-[var(--secondary)]" />

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            Megha Systems Insights
                        </span>
                    </div>

                    <h1 className="single-article-reveal max-w-[1100px] text-[clamp(2.6rem,5.5vw,6rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
                        {blog.title}
                    </h1>

                    {/* META */}
                    <div className="single-article-reveal mt-5 flex flex-wrap items-center gap-5 border-t border-white/15 pt-5">
                        <div className="flex items-center gap-2 text-sm text-white/65">
                            <CalendarDays
                                size={17}
                                className="text-[var(--secondary)]"
                            />

                            {formatDate(blog.publishDate || blog.createdAt)}
                        </div>

                        <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />

                        <div className="flex items-center gap-2 text-sm text-white/65">
                            <BookOpen
                                size={17}
                                className="text-[var(--secondary)]"
                            />
                            Megha Systems
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          COVER IMAGE
      ===================================== */}
            {blog.image && (
                <section className="bg-[#f7f9f8]">
                    <div className="mx-auto max-w-[1300px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-[26px] bg-[#e9eeec]">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                priority
                                sizes="(max-width: 1300px) 100vw, 1200px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================
          ARTICLE CONTENT
      ===================================== */}
            <section className="bg-white py-14 lg:py-20">
                <div className="mx-auto grid max-w-[1300px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-16 lg:px-12">

                    {/* ARTICLE BODY */}
                    <article className="min-w-0">
                        <div className="mb-10 flex items-center gap-3">
                            <span className="h-px w-10 bg-[var(--secondary)]" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                The Article
                            </span>
                        </div>

                        {/* CONTENT */}
                        <div
                            className="article-content max-w-none break-words text-[var(--primary)]"
                            dangerouslySetInnerHTML={{
                                __html: blog.content || "",
                            }}
                        />

                        {/* ARTICLE FOOTER */}
                        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--border-color)] pt-8">
                            <Link
                                href="/our-articles"
                                className="inline-flex items-center gap-3 text-sm font-semibold transition hover:text-[var(--secondary)]"
                            >
                                <ArrowLeft size={18} />
                                Back to All Articles
                            </Link>

                            <button
                                type="button"
                                onClick={shareArticle}
                                className="inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                            >
                                <Share2 size={17} />
                                Share Article
                            </button>
                        </div>
                    </article>

                    {/* SIDEBAR */}
                    <aside className="lg:sticky lg:top-28 lg:h-fit">
                        {/* SHARE CARD */}
                        <div className="rounded-[24px] border border-[var(--border-color)] bg-[#f7f9f8] p-6">
                            <h3 className="text-lg font-semibold">
                                Share This Article
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                Found this helpful? Share it with your network.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {shareLinks.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Share on ${item.name}`}
                                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                        >
                                            <Icon size={19} />
                                        </a>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={copyLink}
                                    aria-label="Copy article link"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>

                            {copied && (
                                <p className="mt-3 text-xs font-medium text-[var(--secondary)]">
                                    Link copied successfully!
                                </p>
                            )}
                        </div>

                        {/* HELP CARD */}
                        <div className="mt-5 rounded-[24px] bg-[var(--primary)] p-7 text-white">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--secondary)]">
                                <MessageCircle size={24} />
                            </div>

                            <h3 className="text-2xl font-semibold tracking-tight">
                                Planning a Restroom Project?
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-white/60">
                                Explore premium cubicle systems and speak with
                                our team about your requirements.
                            </p>

                            <Link
                                href="/contact-us"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
                            >
                                Get in Touch
                                <ArrowUpRight size={17} />
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>

            {/* =====================================
          RELATED ARTICLES
      ===================================== */}
            {relatedBlogs.length > 0 && (
                <section className="bg-[#f7f9f8] py-16 lg:py-24">
                    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-px w-10 bg-[var(--secondary)]" />

                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                        Keep Exploring
                                    </span>
                                </div>

                                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.055em]">
                                    Related{" "}
                                    <span className="text-[var(--secondary)]">
                                        Articles.
                                    </span>
                                </h2>
                            </div>

                            <Link
                                href="/our-articles"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]"
                            >
                                View All Articles
                                <ArrowUpRight size={18} />
                            </Link>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {relatedBlogs.map((item) => (
                                <article
                                    key={item._id || item.slug}
                                    className="group overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-white transition hover:shadow-xl"
                                >
                                    <Link
                                        href={`/our-articles/${item.slug}`}
                                        className="relative block aspect-[16/10] overflow-hidden bg-[#e9eeec]"
                                    >
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <BookOpen
                                                    size={45}
                                                    className="text-[var(--secondary)]/40"
                                                />
                                            </div>
                                        )}
                                    </Link>

                                    <div className="p-6">
                                        <p className="mb-3 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                            <CalendarDays
                                                size={15}
                                                className="text-[var(--secondary)]"
                                            />
                                            {formatDate(item.publishDate || item.createdAt)}
                                        </p>

                                        <Link href={`/our-articles/${item.slug}`}>
                                            <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--secondary)]">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--text-secondary)]">
                                            {item.metaDescription}
                                        </p>

                                        <Link
                                            href={`/our-articles/${item.slug}`}
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)]"
                                        >
                                            Read Article
                                            <ArrowUpRight size={17} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================
          BOTTOM CTA
      ===================================== */}
            <section className="relative overflow-hidden bg-[var(--primary)] py-20 text-white">
                <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[var(--secondary)]/15 blur-[110px]" />

                <div className="relative mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-12">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                            Megha Systems
                        </p>

                        <h2 className="max-w-[800px] text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.05em]">
                            Discover Our{" "}
                            <span className="text-[var(--secondary)]">
                                Product Range.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[600px] text-sm leading-7 text-white/60">
                            Explore durable, modern and customizable restroom
                            cubicle systems for your next project.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[var(--secondary)] px-8 py-4 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                        Explore Products
                        <ArrowUpRight size={19} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
