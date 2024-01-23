'use client'
import { useState } from "react";
import ChevronDown from "./icons/ChevronDown";
import ChevronUp from "./icons/ChevronUp";

export default function VariationSelector({ selected, setSelected, variations, productId, defaultAttributes }: { variations: any, productId: string, defaultAttributes: { id: number, name: string, option: string }[], selected: any, setSelected: any }) {


    const [showAll, setShowAll] = useState(false);

    const [selectedVariation, setSelectedVariation] = useState(selected?.id);
    const visibleVariations = showAll ? variations : variations.slice(0, 5);
    const count = variations.length - 5;

    const showMore = <span className="flex text-white items-center border-b border-r border-l border-white rounded p-2">Show {count} More <ChevronDown className="w-3 h-3 ml-2" /></span>
    const showLess = <span className="flex text-white items-center border-b border-r border-l border-white rounded p-2">Show less <ChevronUp className="w-3 h-3 ml-2" /></span>

    return (
        <div>
            {visibleVariations.map((variation: any) => (
                <label key={variation.id} className={`${selected == variation.id && 'bg-black/70'} text-[14px] transition-all duration-300 rounded py-5 px-2 cursor-pointer hover:bg-black/70 flex justify-between w-full`} htmlFor={variation.id}>
                    <div className="flex gap-4 items-center">
                        <input onChange={() => {
                            setSelected(variation);
                            setSelectedVariation(variation.id)
                        }} className="appearance-none border-2 border-white rounded-full w-4 h-4 checked:bg-white checked:border-white focus:outline-none" name={productId} id={variation.id} value={variation.id} type="radio" checked={selectedVariation == variation.id} />
                        <img width={30} height={30} src={variation.image?.src} />
                        <span>{variation.name}</span>
                    </div>
                    <span>{variation.price}</span>
                </label>
            ))}
            {variations.length > 7 && (
                <div className="flex justify-center w-full">
                    <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? showLess : showMore}
                    </button>
                </div>
            )}
        </div>
    )
}
