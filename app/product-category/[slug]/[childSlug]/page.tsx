import BreadCrumb from "@/components/BreadCrumb";
import ProductCategory from "@/components/ProductCategory";
import { getProductCategories, getProductsByCategory } from "@/lib/store";

export default async function CategoryPage({ params }: { params: { childSlug: string } }) {
  const categories = await getProductCategories();
  const currentCategory = categories && categories?.find((cat: any) => cat.slug === params.childSlug);
  const childrenCats = categories.filter((cat: any) => cat.parent == currentCategory?.id);
  const products = await getProductsByCategory(currentCategory?.id);
  return (
    <>
      <BreadCrumb />
      <ProductCategory products={products} currentCategory={currentCategory} childrenCats={childrenCats} />
    </>)
}
