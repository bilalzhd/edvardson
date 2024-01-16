
import Product from "@/app/components/Product";
import ProductCarousel from "@/app/components/ProductCarousel";
import ProductGallery from "@/app/components/ProductGallery";
import VariationSelector from "@/app/components/VariationSelector";
import { getProductBySlug, getProductVariations, getProductsByCategory } from "@/app/lib/store";

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  let variations = [];
  if (product.type === 'variable') {
    variations = await getProductVariations(product.id);
  }
  const categoriesId = product.categories.map((category: any) => category.id);
  const relatedProducts = await getProductsByCategory(categoriesId[0]);
  return (
    <div className="bg-black/50 mx-12 font-open">
      <div className="flex text-white p-6">
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
          {variations.length > 0 && <VariationSelector defaultAttributes={product.default_attributes} productId={product.id} variations={variations} />}
          <div className="flex gap-2">
            <input type="number" name="quantity" id="quantity" defaultValue={1} min={1} className="max-w-[52px] text-black p-2 text-center" />
            <button type="submit" className="text-center font-bold w-full py-[13px] px-[28px] transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]">Add To Cart</button>
          </div>
          <div className="text-[13px] mt-5">
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>Secure payment by card</p>
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
              E-mail us, we reply swiftly!</p>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h3 className="text-white text-center text-3xl mb-4">You may want to add</h3>
        <ProductCarousel products={relatedProducts} />
      </div>
      <div className="my-12">
        <h3 className="text-white text-center text-3xl mb-4">Others also bought</h3>
        <ProductCarousel products={relatedProducts} />
      </div>
    </div>
  )
}