
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Search,
  X,
  BookOpen,
  Sparkles,
} from "lucide-react";

const LIMIT = 9;

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

function BlogCard({ blog, index }) {
  const image = blog.image;
  const description =
    blog.metaDescription ||
    "Explore the latest insights, trends and ideas from Megha Systems.";

  return (
    <article className="article-card group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--secondary)]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
      <Link
        href={`/our-articles/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#e9eeec]"
      >
        {image ? (
          <Image
            src={image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen
              size={52}
              className="text-[var(--secondary)]/40"
            />
          </div>
        )}

        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
          Megha Insights
        </span>

        <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[var(--secondary)] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <CalendarDays size={15} className="text-[var(--secondary)]" />
          <span>{formatDate(blog.publishDate || blog.createdAt)}</span>
        </div>

        <Link href={`/our-articles/${blog.slug}`}>
          <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.035em] transition-colors group-hover:text-[var(--secondary)] sm:text-2xl">
            {blog.title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--text-secondary)]">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--border-color)] pt-5">
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Article {String(index + 1).padStart(2, "0")}
          </span>

          <Link
            href={`/our-articles/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] transition-all hover:gap-3"
          >
            Read Article
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogSkeleton() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-white">
      <div className="aspect-[16/10] animate-pulse bg-gray-200" />
      <div className="space-y-4 p-7">
        <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-7 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function ArticlesClient() {
  const heroRef = useRef(null);
  const listRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: LIMIT,
    total: 0,
    totalPages: 0,
  });

  const fetchBlogs = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
      });

      if (search) {
        params.set("search", search);
      }

      const response = await fetch(`/api/blogs?${params}`, {
        signal,
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load articles");
      }

      setBlogs(data.blogs || []);
      setPagination(
        data.pagination || {
          page: 1,
          limit: LIMIT,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(err.message || "Something went wrong.");
      setBlogs([]);
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const controller = new AbortController();

    fetchBlogs(controller.signal);

    return () => controller.abort();
  }, [fetchBlogs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".articles-hero-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading || !listRef.current || blogs.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    }, listRef);

    return () => ctx.revert();
  }, [blogs, loading]);

  const changePage = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.totalPages ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);

    listRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const featuredBlog = !search && page === 1 ? blogs[0] : null;

  const displayedBlogs = featuredBlog ? blogs.slice(1) : blogs;

  return (
    <main className="min-h-screen bg-white text-[var(--primary)]">

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[var(--primary)] pb-20 pt-32 text-white lg:pb-20 lg:pt-40"
      >
        <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[650px] rounded-full bg-[var(--secondary)]/15 blur-[130px]" />

        {/* Decorative SVG */}
        <svg
          className="pointer-events-none absolute right-[-100px] top-[-70px] hidden h-[550px] w-[550px] opacity-20 lg:block"
          viewBox="0 0 550 550"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="275" cy="275" r="240" stroke="var(--secondary)" />
          <circle cx="275" cy="275" r="175" stroke="var(--secondary)" />
          <circle cx="275" cy="275" r="110" stroke="var(--secondary)" />
          <path d="M0 275H550M275 0V550" stroke="white" strokeOpacity=".3" />
        </svg>

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="articles-hero-reveal mb-12 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={15} />
            <span className="text-white">Articles</span>
          </div>

          <div className="articles-hero-reveal mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--secondary)]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
              Knowledge & Inspiration
            </span>
          </div>

          <h1 className="articles-hero-reveal max-w-[1000px] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
            Articles &{" "}
            <span className="text-[var(--secondary)]">Insights.</span>
          </h1>

          {/* <p className="articles-hero-reveal mt-7 max-w-[650px] text-base leading-8 text-white/65 sm:text-lg">
            Explore industry knowledge, modern restroom design,
            material innovations, and practical guides for
            commercial and institutional spaces.
          </p> */}

          <a
            href="#latest-articles"
            className="articles-hero-reveal mt-9 inline-flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Explore Articles
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* ARTICLES */}
      <section
        id="latest-articles"
        ref={listRef}
        className="scroll-mt-24 bg-[#f7f9f8] py-12 lg:py-15"
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          {/* SECTION HEADER */}
          <div className="mb-2 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--secondary)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  Our Blog
                </span>
              </div>

              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.025em]">
                Latest{" "}
                <span className="text-[var(--secondary)]">
                  Articles.
                </span>
              </h2>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-[var(--border-color)] bg-white p-4 sm:p-5">
            <div className="relative w-full max-w-[520px]">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />

              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search articles..."
                className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-[#f7f9f8] pl-12 pr-11 text-sm outline-none transition focus:border-[var(--secondary)]"
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--primary)]">
                {pagination.total}
              </span>{" "}
              Articles Available
            </p>
          </div>

          {/* ERROR */}
          {error && !loading && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => {
                  const controller = new AbortController();
                  fetchBlogs(controller.signal);
                }}
                className="mt-4 text-sm font-semibold text-red-700 underline"
              >
                Try Again
              </button>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : blogs.length === 0 && !error ? (
            /* EMPTY STATE */
            <div className="rounded-[26px] border border-[var(--border-color)] bg-white px-6 py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--secondary)]/10">
                <BookOpen
                  size={32}
                  className="text-[var(--secondary)]"
                />
              </div>

              <h3 className="text-2xl font-semibold">
                No Articles Found
              </h3>

              <p className="mx-auto mt-3 max-w-[450px] text-sm leading-7 text-[var(--text-secondary)]">
                {search
                  ? "We couldn't find any articles matching your search."
                  : "No published articles are available yet. Check back soon."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="mt-7 rounded-xl bg-[var(--secondary)] px-7 py-3.5 text-sm font-semibold text-white"
                >
                  View All Articles
                </button>
              )}
            </div>
          ) : !error ? (
            <>
              {/* FEATURED ARTICLE */}
              {featuredBlog && (
                <div className="mb-12">
                  <div className="mb-6 flex items-center gap-3">
                    <Sparkles
                      size={18}
                      className="text-[var(--secondary)]"
                    />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      Featured Article
                    </span>
                  </div>

                  <article className="group grid overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-white lg:grid-cols-2">
                    <Link
                      href={`/our-articles/${featuredBlog.slug}`}
                      className="relative block min-h-[300px] overflow-hidden bg-[#e9eeec] lg:min-h-[460px]"
                    >
                      {featuredBlog.image ? (
                        <Image
                          src={featuredBlog.image}
                          alt={featuredBlog.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen
                            size={60}
                            className="text-[var(--secondary)]/40"
                          />
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                      <span className="mb-6 w-fit rounded-full bg-[var(--secondary)]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--secondary)]">
                        Featured Insight
                      </span>

                      <div className="mb-5 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <CalendarDays
                          size={16}
                          className="text-[var(--secondary)]"
                        />
                        {formatDate(
                          featuredBlog.publishDate ||
                          featuredBlog.createdAt
                        )}
                      </div>

                      <Link href={`/our-articles/${featuredBlog.slug}`}>
                        <h3 className="text-[clamp(2rem,3vw,3.5rem)] font-semibold leading-[1.12] tracking-[-0.045em] transition-colors group-hover:text-[var(--secondary)]">
                          {featuredBlog.title}
                        </h3>
                      </Link>

                      <p className="mt-6 line-clamp-4 text-sm leading-8 text-[var(--text-secondary)] sm:text-base">
                        {featuredBlog.metaDescription ||
                          "Discover expert insights and industry knowledge from Megha Systems."}
                      </p>

                      <Link
                        href={`/our-articles/${featuredBlog.slug}`}
                        className="mt-9 inline-flex w-fit items-center gap-3 rounded-xl bg-[var(--primary)] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[var(--secondary)]"
                      >
                        Read Full Article
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </article>
                </div>
              )}

              {/* BLOG GRID */}
              {displayedBlogs.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {displayedBlogs.map((blog, index) => (
                    <BlogCard
                      key={blog._id || blog.slug}
                      blog={blog}
                      index={
                        (page - 1) * LIMIT +
                        index +
                        (featuredBlog ? 1 : 0)
                      }
                    />
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {pagination.totalPages > 1 && (
                <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] disabled:opacity-40"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => changePage(pageNumber)}
                      aria-current={
                        page === pageNumber ? "page" : undefined
                      }
                      className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${page === pageNumber
                          ? "bg-[var(--secondary)] text-white"
                          : "border border-[var(--border-color)] bg-white hover:border-[var(--secondary)]"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={page === pagination.totalPages}
                    aria-label="Next page"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-white transition hover:border-[var(--secondary)] disabled:opacity-40"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
