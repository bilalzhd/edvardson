'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "../context";

export default function AddToCart({ productType, productPermalink }: { productType: string, productPermalink: string }) {
  const [ cart, setCart ] = useContext(AppContext);
  const [ isAddedToCart, setIsAddedToCart ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  return (<>
    {productType == "simple" ? <button type="submit" className="text-center font-bold w-full py-[13px] px-[28px] transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]">Add To Cart</button> : <Link className="font-bold w-full py-[13px] px-[28px] flex-1 transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]" href={productPermalink || "#"}>Buy</Link>}
  </>)
}
