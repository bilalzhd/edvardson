'use client';
import { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from "./Box";
import AddToCart from "./AddToCart";
import VariationSelector from "./VariationSelector";

export default function Product({ product, variations }: any) {
    const [quantity, setQuantity] = useState(1)
    const sortedVariations = variations?.sort((a: any, b: any) => (a.attributes?.[1]?.option && b.attributes[1]?.option) && parseInt(a.attributes[1].option) - parseInt(b.attributes[1].option));
    const defaultOptions = product.default_attributes?.map((attr: any) => attr.option);
    const stringOptions: string = defaultOptions?.join(", ");
    const defaultOption = sortedVariations.find((variation: any) => variation.name?.toString().toLowerCase().replace(/\b(\w+)\s+(\w+)\b/, '$1-$2') === stringOptions)
    const [mount, setMount] = useState(false);
    const [selected, setSelected] = useState(defaultOption);
    useEffect(() => {
        if (product) {
            setMount(true);
        }
    }, [])
    return (
        <>
            <div>
                {mount ? (
                    <>
                        <h1 className="text-xl font-semibold">{product.name}</h1>
                        <span className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: product.price_html }}></span>
                        <p className="pt-4 pb-5 text-[#333]" dangerouslySetInnerHTML={{ __html: product.short_description }}></p>
                        <p className="text-xs">Art.nr: {product.sku}</p>
                        <p className="text-[13px] text-[#333]" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                    </>) : (
                    <Box width="100%">
                        <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={30} />
                        <Skeleton containerClassName="flex-1" className="mb-40" baseColor="#B1B1B1AA" height={40} />
                        <Skeleton containerClassName="flex-1" baseColor="#B1B1B1AA" height={360} />
                    </Box>)}
            </div>
            <div className="pt-6 text-center mb-2">
                {product.attributes.map((attr: any, index: number) => (
                    <span key={attr.id}>
                        {attr.name}
                        {index < product.attributes.length - 1 ? " / " : ""}
                    </span>
                ))}
            </div>
            {variations.length > 0 && <VariationSelector selected={selected} setSelected={setSelected} defaultAttributes={product.default_attributes} productId={product.id} variations={sortedVariations} />}
            <div className="mt-4 flex gap-2 relative">
                <input type="number" name="quantity" id="quantity" defaultValue={1} min={1} className="border border-black max-w-[52px] text-black p-2 text-center" onChange={(e) => setQuantity(Number(e.target.value))} />
                <AddToCart quantity={null} variations={selected} isProductPage productId={product.id} productType={product.type} productPermalink={product.permalink} />
            </div>
        </>
    )
}
