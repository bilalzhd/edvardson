'use client'

import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Loader";
import Link from "next/link";
import AddToCart from "./AddToCart";
import Image from "next/image";

export default function ProductCard({ product }: any) {
    const productType = product.type || "";
    const [isMount, setMount] = useState(false);
    useEffect(() => {
        if (product) {
            setMount(true);
        }
    }, [product])
    return (
        <>
            {isMount ? (
                <div className='w-[calc(25%-10px)] mb-8 text-white flex flex-col items-center' key={product.id}>
                    <div className='product-thumbnail-bg'>
                        <Link href={product.permalink || "#"}>
                            <Image src={product.images?.[0]?.src} alt={product.name || ""} className="w-[282.5px] h-[282.5px]" width={282.5} height={282.5} />
                        </Link>
                    </div>
                    
                    <Link href={product.permalink || "#"}><span className='uppercase text-sm mb-2 text-center mt-2'>{product.name?.substring(0, 20)}{product.name.length > 50 && "..."}</span></Link>
                    <p className='text-[#bdbdbd] text-xs text-center' dangerouslySetInnerHTML={{ __html: product.description?.substring(0, 100) + (product.description.length > 100 && "...") }}></p>
                    
                    <div className='mt-8 flex items-center flex-col gap-4'>
                        <span>{product.price} SEK</span>
                        {<AddToCart productPermalink={product.permalink} productType={productType} />}
                    </div>
                </div>
            ) : (
                <Box width="100%">
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={260} />
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={20} />
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={60} />
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={20} />
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={30} />
                </Box>
            )}
        </>
    )
}