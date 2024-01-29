import BreadCrumb from "@/components/BreadCrumb";
import ProductCard from "@/components/ProductCard";
import Toolbar from "@/components/Toolbar";
import { getProductCategories, getProductsByCategory } from "@/lib/store";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: { childSlug: string } }) {
  const categories = await getProductCategories();
  const currentCategory = categories && categories?.find((cat: any) => cat.slug === params.childSlug);
  const childrenCats = categories.filter((cat: any) => cat.parent == currentCategory?.id);
  const products = await getProductsByCategory(currentCategory?.id);
  return (
    <>
      <BreadCrumb />
      <div className="min-h-[23.5vh] bg-black/40 p-[10px]">
        <div className="flex items-center flex-col">
          <div className="mb-[30px]">
            <h1 className="text-white text-[17px] text-center uppercase font-bold letter-spacing-0 font-open">{currentCategory?.name}</h1>
            <p className="text-[14px] text-[#bdbdbd] letter-spacing-0 font-open">Quality knives for hunting and wilderness life.</p>
          </div>
          <Toolbar />
        </div>
        <div className="flex flex-wrap relative">
          {childrenCats?.length > 0 &&
            childrenCats.map((cat: any) => (
              <div key={cat.id} className="min-h-[225px] flex items-stretch md:w-[calc(25%-10px)] max-w-[calc(25%-10px)] basis-[calc(25%-10px)] my-[7.5px] mx-[5px]">
                <Link href={`/product-category/${cat.slug}`}>
                  <div className="bg-[#3D3D3D] text-white flex-col flex items-stretch justify-start w-full cursor-pointer rounded-[2px] md:h-[calc(100%-20px)] p-1 mb-5">
                    {/* <Link href={`/product-category/${cat.slug}`}> */}
                      <div className="bg-[rgba(188,160,142,0.7)]">
                        {cat.image && <img src={cat.image.src} />}
                      </div>
                    {/* </Link> */}
                    <h2 className="text-center text-[14px] p-[9px]">{cat.name}</h2>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        <div className="flex flex-wrap mx-4 gap-[10px] mt-4">
          {products?.length > 0 ? products?.map((product: any) => {
            return <ProductCard key={product.id} product={product} isGallery={false} />
          }) : <span className="text-white text-center py-4">No Products yet</span>}
        </div>
      </div>
    </>)
}
