'use client';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";

export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1800 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 1800, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
export default function ProductCarouselCheckout({ products }: any) {

    return (
        <div className="px-4 md:px-10">
            <Carousel className="gap-[10px] space-x-4" infinite responsive={responsive}>
                {products?.map((product: any) => (
                    <div key={product.id} className={`bg-[#F6F6F6] p-2 md:p-3 text-[#333] font-open flex w-full mx-[6px] md:mx-0 gap-3`}>
                        <div className='product-thumbnail-bg flex justify-center'>
                            <Link href={product.permalink || "#"}>
                                <img className="max-h-[100px] bg-[#F0F0F0]" src={product.images?.[0]?.src} alt={product.name || ""} />
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <Link href={product.permalink || "#"}>
                                <span className='font-bold text-sm mb-2 mt-2'>{product.name?.substring(0, 20)}{product.name.length > 50 && "..."}</span>
                            </Link>
                            <span className="text-[12px] md:text-[16px]">Pris: {product.price} SEK</span>
                            <AddToCart quantity={null} variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={product.type} />
                        </div>
                    </div>
                )
                )}
            </Carousel>
        </div>
    )
}
