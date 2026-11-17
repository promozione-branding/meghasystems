import { notFound } from "next/navigation";
import { connectDB } from "@/libs/db";
import Blog from "@/models/Blog";
import SingleArticleClient from "./SingleArticleClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getBlog(slug) {
    await connectDB();

    const blog = await Blog.findOne({
        slug,
        publishDate: { $lte: new Date() },
    }).lean();

    if (!blog) return null;

    // Convert MongoDB values into serializable JSON.
    return JSON.parse(JSON.stringify(blog));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Article Not Found | Megha Systems",
        };
    }

    return {
        title: blog.metaTitle || `${blog.title} | Megha Systems`,
        description:
            blog.metaDescription ||
            `Read ${blog.title} on Megha Systems.`,
        openGraph: {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.title,
            type: "article",
            publishedTime: blog.publishDate,
            images: blog.image ? [blog.image] : [],
        },
    };
}

export default async function SingleArticlePage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) notFound();

    return <SingleArticleClient blog={blog} />;
}