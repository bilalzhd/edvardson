'use client'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { addToCart } from "../lib/store";

export default function AddToCart({ productId, productType, productPermalink }:
  { productId: number, productType: string, productPermalink: string }
) {

  const [cart, setCart, cartKey] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(cartKey)

  async function addToCartHandler() {
    const cart = await addToCart(productId ?? 0, 1, cartKey, setLoading)
    setCart(cart);
  }
  console.log(cart)
  return (
    <>
      {productType == "simple" ? <button
        onClick={() => addToCartHandler()}
        type="submit" className="text-center font-bold w-full py-[13px] px-[28px] transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]">{loading ? "Loading.." : "Add To Cart"}</button> : <Link className="font-bold w-full py-[13px] px-[28px] flex-1 transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]" href={productPermalink || "#"}>Buy</Link>}
    </>
  )
}
