
import Product from "@/components/Product";
import ProductCarousel from "@/components/ProductCarousel";
import ProductGallery from "@/components/ProductGallery";

import { getProductBySlug, getProductVariations, getProductsByCategory } from "@/lib/store";


export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  let variations = [];
  if (product?.type === 'variable') {
    variations = await getProductVariations(product.id);
  }
  const categoriesId = product?.categories.map((category: any) => category.id);
  const relatedProducts = await getProductsByCategory(categoriesId[0]);
  return (
    <div className="font-open 2xl:max-w-[70%] xl:px-8 mx-auto">
      <div className="flex md:flex-row flex-col p-6">
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <ProductGallery items={product.images} />
        </div>
        <div className="w-full md:w-1/2 md:ml-[8%] px-4">
          <Product product={product} variations={variations} />

          <div className="text-[13px] mt-5">
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
              Secure payment by card</p>
            <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
              E-mail us, we reply swiftly!</p>

            <div className="w-fit border-b border-black mt-4">
              <span className="font-bold text-[14px] mr-2">Varumärke</span> {product.brands?.map((b: any) => b.name)}
            </div>
            <div className="w-fit border-b border-black my-4">
              <span className="font-bold text-[14px] mr-2">HS Number</span> {product?.meta_data[0]?.value}
            </div>
              <button className="text-md bg-black hover:bg-black/50 rounded text-white py-2 px-4 mt-2">Share</button>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h3 className="text-center text-2xl uppercase md:text-[30px] mb-8 font-bold">Du kanske också behöver</h3>
        <ProductCarousel products={relatedProducts} />
      </div>
      <div className="my-12">
        <h3 className="text-center text-2xl uppercase md:text-[30px] font-bold mb-8">Andra köpte också</h3>
        <ProductCarousel products={relatedProducts} />
      </div>
    </div>
  )
}