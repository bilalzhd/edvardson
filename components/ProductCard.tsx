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
    if (product.description.startsWith("<p><img") && product.id == 1345) {
        productDescription = productDescription.substring(116);

        console.log("Name", product.description, "Changed", productDescription)
    }
            return (
            <>
                {isMount ? (
                    <div className={`mb-8 bg-white p-5 text-[#333] flex flex-col items-center border-r-[gray] border-white border hover:border-2 hover:border-r-[#679761] transition-all duration-300 hover:border-[#679761] ${!isGallery && 'md:w-[calc(25%)]'} w-full`} key={product.id}>
                        <div className='product-thumbnail-bg w-full flex justify-center'>
                            <Link href={product.permalink || "#"}>
                                <img className="max-h-[270px]" src={product.images?.[0]?.src} alt={product.name || ""} />
                            </Link>
                        </div>

                        <Link href={product.permalink || "#"} className="text-center">
                            <span className='uppercase text-sm mb-2 mt-2'>{product.name?.substring(0, 20)}{product.name.length > 50 && "..."}</span></Link>

                        <p className='text-[#0a0a0a] text-xs text-center min-h-[64px]'
                            dangerouslySetInnerHTML={{ __html: product.short_description?.length > 0 ? product.short_description?.substring(0, 100) : productDescription.substring(0, 100)}}
                        >
                        </p>

                        <div className='mt-8 flex items-center flex-col gap-4'>
                            <span>{product.price} SEK</span>
                            {<AddToCart variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={productType} />}
                        </div>
                    </div>
                ) : (
                    <Box width="270px">
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