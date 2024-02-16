import BreadCrumb from "@/components/BreadCrumb";
import ProductCategory from "@/components/ProductCategory";
import { getProductCategories, getProductsByCategory } from "@/lib/store";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { slug: string }
}
export async function generateMetadata({ params }: Props,
  parent: ResolvingMetadata): Promise<Metadata> {

  const slug = params.slug;
  const categories = await getProductCategories();
  const currentCategory = categories && categories?.find((cat: any) => cat.slug === slug);

  const prevImages = (await parent).openGraph?.images || [];

  return {
    title: currentCategory.name,
    description: currentCategory.description,
    openGraph: {
      images: [currentCategory.image?.src, ...prevImages]
    }
  }
}

export default async function CategoryPage({ params }: Props) {

  const categories = await getProductCategories();
  const currentCategory = categories && categories?.find((cat: any) => cat.slug === params.slug);
  const childrenCats = categories.filter((cat: any) => cat.parent == currentCategory?.id);
  const products = await getProductsByCategory(currentCategory?.id);

  return (
    <>
      <BreadCrumb />
      <ProductCategory products={products} currentCategory={currentCategory} childrenCats={childrenCats} />
    </>)
}
