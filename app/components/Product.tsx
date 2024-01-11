'use client';
import { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Loader";

export default function Product({ name, price_html, description, sku }:
    { name: string, price_html: string, description: string, sku: string | "" }) {
    const [mount, setMount] = useState(false);
    useEffect(() => {
        if (name && price_html && description) {
            setMount(true);
        }
    }, [])
    return (
        <div>
            {mount ? (
                <>
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <span className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: price_html }}></span>
                    <p className="pt-4 pb-5 text-[#FAFAFA]">News ! Now our wilderness belts are also available in black
                        Made in Malungsfors, Sweden.</p>
                    <p className="text-xs">{sku}</p>
                    <img className="pt-4" height="75" width="75" src="//shop.textalk.se/shop/21855/files/sigil_small.png" alt="" />
                    <p className="text-[13px] text-[#FAFAFA]" dangerouslySetInnerHTML={{ __html: description }}></p>
                </>) : (
                <Box width="100%">
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={30} />
                    <Skeleton containerClassName="flex-1" className="mb-40" baseColor="#B1B1B1AA" height={40} />
                    <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={360} />
                </Box>)}
        </div>
    )
}
