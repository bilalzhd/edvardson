'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import { addToCart, addVariationToCart } from "../lib/store";
import Cart from "../components/icons/Cart";

export default function AddToCart({ variations, productId, productType, productPermalink, isProductPage = false }:
  { variations: any, productId: number, productType: string, productPermalink: string, isProductPage: boolean }
) {

  const [, setCart, cartKey] = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  async function addToCartHandler() {
    const cart = await addToCart(productId ?? 0, 1, cartKey, setLoading)
    setCart(cart);
  }

  async function addVariationToCartHandler() {
    const cart = await addVariationToCart(variations ?? 0, 1, cartKey, setLoading);
    setCart(cart);
  }
  const addToCartText = loading ? "Loading..." : (<>Add To Cart <Cart /></>);

  return (
    <>
      {(productType == "simple" || isProductPage) ? 
      <button
        onClick={() => 
         (productType === "simple" && !isProductPage) ? addToCartHandler() :
         (productType === "simple" && isProductPage) ? addToCartHandler() : addVariationToCartHandler()
        }
        type="submit" className="text-center font-bold w-full py-[13px] px-[28px] transition-all duration-200 uppercase hover:bg-[#538e4c] border-[#679761] border bg-transparent flex items-center gap-2">{addToCartText}</button> : <Link className="font-bold w-full py-[13px] px-[28px] flex-1 transition-all duration-200 uppercase hover:bg-[#538e4c] bg-transparent border border-[#679761]" href={productPermalink || "#"}>Buy</Link>}
    </>
  )
}
