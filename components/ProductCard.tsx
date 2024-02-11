'use client'

import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Box";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function ProductCard({ product, isGallery = false }: any) {
    const productType = product.type || "";
    const [isMount, setMount] = useState(false);
    useEffect(() => {
        if (product) {
            setMount(true);
        }
    }, [product])
    let productDescription = product.description;
    if (product.description.startsWith("<p><img")) {
        productDescription = productDescription.substring(116);
    }
    function calculateSalePercent(regPrice: number, salePrice: number) {
        const discountPercent = ((regPrice - salePrice) / regPrice) * 100;

        const roundedDiscountPercent = Math.floor(discountPercent);

        return roundedDiscountPercent;
    }
    console.log(product.short_description)
    const description = product.short_description?.length > 0 ? product.short_description?.substring(0, 100) : productDescription.substring(0, 100);
    
    
    return (
        <>
            {isMount ? (
                <div className={`mb-8 bg-[#F6F6F6] p-2 md:p-5 text-[#333] font-open flex flex-col ${!isGallery && 'md:w-[calc(33%-10px)]'} w-[calc(50%-12px)] mx-[6px] md:mx-0 relative`}>
                    <div className='product-thumbnail-bg w-full flex justify-center'>
                        {product?.on_sale && <span className="bg-red-500 absolute left-[-5px] text-white text-sm p-1 top-0">-{calculateSalePercent(product.regular_price, product.sale_price)}%</span>}
                        <Link href={product.permalink || "#"}>
                            <img className="md:max-h-[285px] bg-[#F0F0F0]" src={product.images?.[0]?.src} alt={product.name || ""} />
                        </Link>
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-[.875rem] uppercase opacity-30">{product.sku}</span>
                        <Link className="mt-[calc(1.75rem*.5)] min-h-[48px]" href={product.permalink || "#"}>
                            <span className='font-bold text-sm mb-2 mt-2'>{product.name?.substring(0, 20)}{product.name.length > 50 && "..."}</span>
                        </Link>

                        <p className='text-[#0a0a0a] text-xs md:min-h-[64px] min-h-[80px] mt-[calc(1.75rem*.25)]'
                            dangerouslySetInnerHTML={{ __html: description}}
                        >
                        </p>

                        <span className="mb-[calc(1.75rem*.5)] text-[12px] md:text-[16px]" dangerouslySetInnerHTML={{ __html: product.price_html }}></span>
                        <AddToCart quantity={null} variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={productType} />
                    </div>
                </div>
            ) : (
                <Box width="320px">
                    <Skeleton className="rounded-none" containerClassName="flex-1" baseColor="#B1B1B1AA" height={260} />
                    <Skeleton className="rounded-none" containerClassName="flex-1" baseColor="#B1B1B1AA" height={20} />
                    <Skeleton className="rounded-none" containerClassName="flex-1" baseColor="#B1B1B1AA" height={60} />
                    <Skeleton className="rounded-none" containerClassName="flex-1" baseColor="#B1B1B1AA" height={20} />
                    <Skeleton className="rounded-none" containerClassName="flex-1" baseColor="#B1B1B1AA" height={30} />
                </Box>
            )}
        </>
    )
}