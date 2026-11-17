import { notFound } from "next/navigation";
import { allProducts } from "@/utils/data";
import SingleProductClient from "./SingleProductClient";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const product = allProducts
        .flatMap((category) => category.products)
        .find((item) => item.slug === slug);

    if (!product) return { title: "Product Not Found" };

    return {
        title: product.metaTitle || `${product.name} | Megha Systems`,
        description: product.metaDescription || product.shortDescription,
    };
}

export function generateStaticParams() {
    return allProducts.flatMap((category) =>
        category.products.map((product) => ({
            slug: product.slug,
        }))
    );
}

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const category = allProducts.find((category) =>
        category.products.some((product) => product.slug === slug)
    );

    if (!category) notFound();

    const product = category.products.find(
        (item) => item.slug === slug
    );

    const relatedProducts = category.products
        .filter((item) => item.slug !== slug)
        .slice(0, 4);

    return (
        <SingleProductClient
            product={product}
            category={category}
            relatedProducts={relatedProducts}
        />
    );
}