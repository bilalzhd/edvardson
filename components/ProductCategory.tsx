"use client";
import Link from "next/link";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductCardListView from "./ProductCardListView";

type FilterState = "latest" | "name" | "price" | "stock" | "popularity";

export default function ProductCategory({ currentCategory, childrenCats, products }: any) {
    const [productView, setProductView] = useState("grid");
    const [filters, setFilters] = useState<FilterState>("latest");
    const [sortedProducts, setSortedProducts] = useState(products);
    const sortProducts = (attribute: FilterState) => {
        const sortedProductsCopy = [...sortedProducts]
        switch (attribute) {
            case 'latest':
                sortedProductsCopy.sort((a, b) => {
                    const dateA = new Date(a.date_created).getTime();
                    const dateB = new Date(b.date_created).getTime();
                    return dateB - dateA;
                });
                break;
            case 'popularity':
                sortedProductsCopy.sort((a, b) => b.average_rating - a.average_rating);
                break;
            case 'name':
                sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'stock':
                sortedProductsCopy.sort((a, b) => b.stock_quantity - a.stock_quantity);
                break;
            case 'price':
                sortedProductsCopy.sort((a, b) => b.regular_price - a.regular_price);
                break;
            default:
                break;
        }
        setSortedProducts(sortedProductsCopy);
    }
    useEffect(() => {
        sortProducts(filters)
    }, [filters])

    return (
        <div className="min-h-[23.5vh] p-[10px] xl:max-w-[80%] mx-auto 2xl:max-w-[70%] mt-4">
            <div className="flex items-center flex-col">
                <div className="mb-[30px]">
                    <h1 className="text-[24px] text-center uppercase font-bold letter-spacing-0 font-open">{currentCategory?.name}</h1>
                    <p className="text-[14px] letter-spacing-0 font-open text-center">{currentCategory?.description}</p>
                </div>
            </div>
            <div className="flex flex-wrap relative md:mx-3 w-full mt-4">
                {childrenCats?.length > 0 &&
                    childrenCats.map((cat: any) => (
                        <div key={cat.id} className="flex bg-[#F6F6F6] items-center md:min-h-[300px] md:w-[calc(33%-10px)] md:max-w-[calc(33%-10px)] md:basis-[calc(33%-10px)] w-[calc(50%-10px)] 2xl:basis-[calc(25%-10px)] 2xl:max-w-[calc(25%-10px)] 2xl:w-[calc(25%-10px)] max-w-[calc(50%-10px)] basis-[calc(50%-10px)] my-[7.5px] mx-[5px]">
                            <Link href={`/product-category/${cat.slug}`} className="w-full">
                                <div className="text-[#333] font-bold flex-col flex items-stretch justify-start w-full cursor-pointer rounded-[2px] p-1 mb-5">
                                    <div className="bg-[#f0f0f0]">
                                        {cat.image && <img className="md:min-h-[300px] object-contain" src={cat.image.src} />}
                                    </div>
                                    <h2 className="text-center text-[14px] p-[9px]">{cat.name}</h2>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Toolbar filters={filters} setFilters={setFilters} setProductView={setProductView} />
            {productView == "grid" ? (<div className="flex flex-wrap md:mx-4 mt-4 md:gap-[10px] w-full">
                {products?.length > 0 ? sortedProducts?.map((product: any) => {
                    return <ProductCard key={product.id} product={product} isGallery={false} />
                }) : <span className="text-center py-4">No Products yet</span>}
            </div>) : (
                <div>
                    {products?.length > 0 ? sortedProducts?.map((product: any) => {
                        return <ProductCardListView key={product.id} product={product} />
                    }) : <span className="text-center py-4">No Products yet</span>}
                </div>
            )}
        </div>
    )
}
