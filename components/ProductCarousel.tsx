'use client';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import AddToCart from "./AddToCart";
import Image from "next/image";

export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};
export default function ProductCarousel({ products, isProductPage }: any) {

    return (
        <div className="px-4 md:px-10">
            <Carousel className="gap-[10px] space-x-4" infinite responsive={responsive}>
                {products?.map((product: any) => (
                    <div key={product.id} className={`mb-8 bg-[#F6F6F6] p-2 md:p-5 text-[#333] font-open flex flex-col w-full mx-[6px] md:mx-0`}>
                        <div className='product-thumbnail-bg w-full flex justify-center'>
                            <Link href={product.permalink || "#"}>
                                <Image height={285} width={285} className="md:max-h-[285px] md:min-h-[285px] w-auto h-auto bg-[#F0F0F0] object-contain" src={product.images?.[0]?.src} alt={product.name || ""} />
                            </Link>
                        </div>
                        <div className="flex flex-col mt-2">
                            <span className="text-[.875rem] uppercase opacity-30 min-h-[21px]">{product.sku}</span>
                            <Link className="mt-[calc(1.75rem*.5)] min-h-[48px]" href={product.permalink || "#"}>
                                <span className='font-bold text-sm mb-2 mt-2'>{product.name}</span>
                            </Link>

                            <p className='text-[#0a0a0a] text-xs md:min-h-[64px] min-h-[80px] mt-[calc(1.75rem*.25)]'
                                dangerouslySetInnerHTML={{ __html: product.short_description?.length > 0 ? product.short_description?.substring(0, 100) : product.description.substring(0, 100) }}
                            >
                            </p>

                            <span className="mb-[calc(1.75rem*.5)] text-[12px] md:text-[16px]">Pris: {product.price} SEK</span>
                            <AddToCart isCarousel isCheckout={false} quantity={null} variations={null} isProductPage={false} isRelatedProducts={isProductPage || false} productId={product.id} productPermalink={product.permalink} productType={product.type} />
                        </div>
                    </div>
                )
                )}
            </Carousel>
        </div>
    )
}
