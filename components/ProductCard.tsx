'use client'

import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Box";
import Link from "next/link";
import AddToCart from "./AddToCart";
import Image from "next/image";

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

    // function getSalePercent() {
    //     const regPrice = Number(product.regular_price);
    //     const salePrice = product.price
    //     console.log("reg:" + regPrice + " salePrice:" + salePrice)
    //     return calculateSalePercent(regPrice, salePrice)
    // }
    function calculateSalePercent(regPrice: number, salePrice?: number | null) {
        const discountPercent = ((regPrice - salePrice) / regPrice) * 100;
        const roundedDiscountPercent = Math.floor(discountPercent);
        return roundedDiscountPercent;
    }
    function getSalePercent() {
        // Parse regular price as a floating-point number
        const regPrice = parseFloat(product.regular_price.replace(',', '.'));
        
        // Use regex to extract sale price from price_html
        const salePriceRegex = /<ins[^>]*>.*?<bdi>(.*?)<\/bdi>.*?<\/ins>/;
        const salePriceMatch = product.price_html.match(salePriceRegex);
        
        // Parse sale price as a floating-point number if it exists
        let salePrice = null;
        if (salePriceMatch) {
            salePrice = parseFloat(salePriceMatch[1].replace(',', '.'));
        }
    
        console.log("regPrice:", regPrice, "salePrice:", salePrice);
        return calculateSalePercent(regPrice, salePrice);
    }
    
    productDescription = productDescription.length > 100 ? productDescription.substring(0, 100) : productDescription;
    const description = product.short_description?.length > 0 ? product.short_description?.substring(0, 100) : productDescription;

    return (
        <>
            {isMount ? (
                <div className={`mb-8 bg-[#F6F6F6] p-2 md:p-5 text-[#333] font-open flex flex-col ${!isGallery && '2xl:w-[calc(25%-10px)] md:w-[calc(33%-10px)]'} w-[calc(50%-12px)] mx-[6px] md:mx-0 relative`}>
                    <div className='product-thumbnail-bg w-full flex justify-center'>
                        {product?.on_sale && <span className="bg-red-500 absolute left-[-5px] text-white text-sm p-1 top-0">-{getSalePercent()}
                            %</span>}
                        <Link href={product.permalink || "#"}>
                            <Image height={285} width={285} style={{ width: 'auto', height: 'auto' }} className="md:max-h-[285px] md:min-h-[285px] bg-[#F0F0F0] object-contain" src={product.images?.[0]?.src} alt={product.name || "Product Image"} />
                        </Link>
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-[.875rem] uppercase opacity-30 min-h-[21px]">{product.sku}</span>
                        <Link className="mt-[calc(1.75rem*.5)] min-h-[48px]" href={product.permalink || "#"}>
                            <span className='font-bold text-sm mb-2 mt-2'>{product.name}</span>
                        </Link>

                        <p className='text-[#0a0a0a] text-xs min-h-[80px] mt-[calc(1.75rem*.25)]'
                            dangerouslySetInnerHTML={{ __html: description }}
                        >
                        </p>

                        <span className="mb-[calc(1.75rem*.5)] text-[12px] md:text-[16px]" dangerouslySetInnerHTML={{ __html: product.price_html }}></span>
                        <AddToCart isCarousel={false} isRelatedProducts={false} isCheckout={false} quantity={null} variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={productType} />
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