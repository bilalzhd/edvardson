'use client'

import { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Box";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function ProductCardListView({ product }: any) {
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
                <div className="mb-2 flex items-center bg-[#fffff0] p-2">
                    <div className="w-[25%] flex justify-center px-2">
                        <img className="border rounded w-[60px] h-[60px]" src={product.images?.[0]?.src} alt={product.name} />
                    </div>
                    <span className="w-[20%] flex justify-center px-2 text-center">{product.price} SEK</span>
                    <div className="w-[35%] flex justify-center px-2 text-center">
                        <Link href={product.permalink || "#"}><span className="hover:underline">{product.name}</span></Link>
                    </div>
                    <div className="w-[20%] flex justify-center px-2">
                        <AddToCart variations={null} isProductPage={false} productId={product.id} productPermalink={product.permalink} productType={productType} />
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