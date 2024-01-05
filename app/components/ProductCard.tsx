'use client'

import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Loader";

export default function ProductCard({ product }: any) {
    const [isMount, setMount] = useState(false);
    useEffect(() => {
        if (product) {
            setMount(true);
        }
    }, [product])
    return (
        <>
            {isMount ? (
                <a href={product.permalink || "#"} className='w-full sm:w-1/2 md:w-1/4 px-4 mb-8 text-white flex flex-col items-center' key={product.id}>
                    <div className='product-thumbnail-bg'>
                        <img src={product.images?.[0]?.src} alt={product.name || ""} width={350} height={350} />
                    </div>
                    <span className='uppercase text-sm mb-2 text-center mt-2'>{product.name}</span>
                    <p className='text-[#bdbdbd] text-xs text-center' dangerouslySetInnerHTML={{ __html: product.description?.substring(0, 100) + "..." }}></p>
                    <div className='mt-8 flex flex-col gap-4'>
                        <span>{product.price} SEK</span>
                        <button className='bg-[#679761] uppercase p-2'>Köp…</button>
                    </div>
                </a>
            ) : <Box>
                <Skeleton containerClassName="flex-1" baseColor="#271A11" height={260} />
                <Skeleton containerClassName="flex-1" baseColor="#271A11" height={20} />
                <Skeleton containerClassName="flex-1" baseColor="#271A11" height={60} />
                <Skeleton containerClassName="flex-1" baseColor="#271A11" height={20} />
                <Skeleton containerClassName="flex-1" baseColor="#271A11" height={30} />
                </Box>} 
        </>
    )
}