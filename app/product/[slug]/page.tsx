
import ProductGallery from "@/app/components/ProductGallery";
import { getProductBySlug } from "@/app/lib/store"

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  return (
    <div className="flex text-white p-6 bg-black/50 mx-12 font-open">
      <div className="flex flex-col items-center w-1/2 p-4">
        <ProductGallery items={product.images} />
      </div>
      <div className="w-1/2 ml-[8%] px-4">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <span className="text-2xl font-bold" dangerouslySetInnerHTML={{__html: product.price_html}}></span>
        <p className="pt-4 pb-5 text-[#FAFAFA]">News ! Now our wilderness belts are also available in black
          Made in Malungsfors, Sweden.</p>
        <p className="text-xs">{product.sku}</p>
        <img className="pt-4" height="75" width="75" src="//shop.textalk.se/shop/21855/files/sigil_small.png" alt="" />
        <p className="text-[13px] text-[#FAFAFA]" dangerouslySetInnerHTML={{__html: product.description}}></p>
      </div>
    </div>)
}