"use client";
import Link from "next/link";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ProductCardListView from "./ProductCardListView";

export default function ProductCategory({ currentCategory, childrenCats, products }: any) {

    const [productView, setProductView] = useState("grid");

    return (
        <div className="min-h-[23.5vh] bg-black/40  p-[10px]">
            <div className="flex items-center flex-col">
                <div className="mb-[30px]">
                    <h1 className="text-white text-[17px] text-center uppercase font-bold letter-spacing-0 font-open">{currentCategory?.name}</h1>
                    <p className="text-[14px] text-[#bdbdbd] letter-spacing-0 font-open">{currentCategory?.description}</p>
                </div>
                <Toolbar setProductView={setProductView} />
            </div>
            <div className="flex flex-wrap relative">
                {childrenCats?.length > 0 &&
                    childrenCats.map((cat: any) => (
                        <div key={cat.id} className="flex items-stretch md:w-[calc(25%-10px)] max-w-[calc(25%-10px)] basis-[calc(25%-10px)] my-[7.5px] mx-[5px]">
                            <Link href={`/product-category/${cat.slug}`} className="w-full">
                                <div className="bg-[#3D3D3D] text-white flex-col flex items-stretch justify-start w-full cursor-pointer rounded-[2px] md:h-[calc(100%-20px)] p-1 mb-5">
                                    <div className="bg-[rgba(188,160,142,0.7)]">
                                        {cat.image && <img src={cat.image.src} />}
                                    </div>
                                    <h2 className="text-center text-[14px] p-[9px]">{cat.name}</h2>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            {productView == "grid" ? (<div className="flex flex-wrap mx-4 mt-4">
                {products?.length > 0 ? products?.map((product: any) => {
                    return <ProductCard key={product.id} product={product} isGallery={false} />
                }) : <span className="text-white text-center py-4">No Products yet</span>}
            </div>) : (
                <div>
                    {products?.length > 0 ? products?.map((product: any) => {
                        return <ProductCardListView key={product.id} product={product} />
                    }) : <span className="text-white text-center py-4">No Products yet</span>}
                </div>
            )}
        </div>
    )
}
