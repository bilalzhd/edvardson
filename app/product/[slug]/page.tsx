
import Product from "@/app/components/Product";
import ProductGallery from "@/app/components/ProductGallery";
import VariationSelector from "@/app/components/VariationSelector";
import { getProductBySlug, getProductVariations } from "@/app/lib/store";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  const variations = await getProductVariations(product.id);
  return (
    <>
      <div className="flex text-white p-6 bg-black/50 mx-12 font-open">
        <div className="flex flex-col items-center w-1/2 p-4">
          <ProductGallery items={product.images} />
        </div>
        <div className="w-1/2 ml-[8%] px-4">
          <Product name={product.name} description={product.description} sku={product.sku} price_html={product.price_html} />
          <div className="pt-6 text-center">
            {product.attributes.map((attr: any, index: number) => (
              <span key={attr.id}>
                {attr.name}
                {index < product.attributes.length - 1 ? " / " : ""}
              </span>
            ))}
          </div>
          <VariationSelector defaultAttributes={product.default_attributes} productId={product.id} variations={variations} />
        </div>
      </div >
    </>
  )
}