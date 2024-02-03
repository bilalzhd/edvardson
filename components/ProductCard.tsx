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
    return (
        <>
            {isMount ? (
                <div className={`mb-8 bg-[#F6F6F6] p-5 text-[#333] font-open flex flex-col ${!isGallery && 'md:w-[calc(33%-10px)]'} w-full`}>
                    <div className='product-thumbnail-bg w-full flex justify-center'>
                        <Link href={product.permalink || "#"}>
                            <img className="md:max-h-[232px] bg-[#F0F0F0]" src={product.images?.[0]?.src} alt={product.name || ""} />
                        </Link>
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-[.875rem] uppercase opacity-30">{product.sku}</span>
                        <Link className="mt-[calc(1.75rem*.5)]" href={product.permalink || "#"}>
                            <span className='font-bold text-sm mb-2 mt-2'>{product.name?.substring(0, 20)}{product.name.length > 50 && "..."}</span>
                        </Link>

                        <p className='text-[#0a0a0a] text-xs min-h-[64px] mt-[calc(1.75rem*.25)]'
                            dangerouslySetInnerHTML={{ __html: product.short_description?.length > 0 ? product.short_description?.substring(0, 100) : productDescription.substring(0, 100) }}
                        >
                        </p>

                        <span className="mb-[calc(1.75rem*.5)]">Pris: {product.price} SEK</span>
                        <AddToCart variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={productType} />
                    </div>
                </div>
            ) : (
                <Box width="260px">
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