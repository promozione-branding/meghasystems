import { allProducts } from "@/utils/data";
import AllProductsClient from "./Products";

export const metadata = {
    title: "Our Products | Megha Systems",
    description:
        "Explore premium toilet cubicle partitions and restroom solutions by Megha Systems for commercial and institutional spaces.",
};

export default function ProductsPage() {
    return <AllProductsClient categories={allProducts} />;
}