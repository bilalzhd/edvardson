'use client'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { addToCart, addVariationToCart } from "../lib/store";
import Cart from "../components/icons/Cart";

export default function AddToCart({ quantity, variations, productId, productType, productPermalink, isProductPage = false }:
  { quantity: null | number, variations: any, productId: number, productType: string, productPermalink: string, isProductPage: boolean }
) {


  const [cart, setCart, cartKey, setCartKey] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function addToCartHandler() {
    setError(null)
    const cart = await addToCart(productId ?? 0, quantity ?? 1, cartKey, setLoading)
    if (cart.data?.status > 399) {
      setError(cart.message)
    } else {
      console.log(cart.cart_key)
      setCart(cart);
      localStorage.setItem('cart_key', (cart as any).cart_key);
      setCartKey((cart as any).cart_key)
    }

  }

  async function addVariationToCartHandler() {
    setError(null)
    const cart = await addVariationToCart(variations ?? 0, quantity ?? 1, cartKey, setLoading);
    if ((cart as any).data?.status != 200) {
      setError((cart as any).message)
    } else {
      setCart(cart);
      localStorage.setItem('cart_key', (cart as any).cart_key);
      setCartKey((cart as any).cart_key)
    }
  }
  const addToCartText = loading ? "Loading..." : (<>Lägg i varukorg <Cart /></>);

  return (
    <>
      {(productType == "simple" || isProductPage) ?
        (<button
          onClick={() =>
            (productType === "simple" && !isProductPage) ? addToCartHandler() :
              (productType === "simple" && isProductPage) ? addToCartHandler() : addVariationToCartHandler()
          }
          type="submit" className={`justify-center mx-auto font-bold w-full py-[13px] px-[28px] transition-all duration-200 uppercase hover:border-[#000] border border-[#f6f6f6] text-center bg-transparent flex items-center gap-2 
        ${isProductPage ? '!border-black hover:!bg-black hover:!text-white' : ''}`}>{addToCartText}
        </button>) :
        (<Link className="font-bold w-full py-[13px] px-[28px] flex-1 transition-all duration-200 uppercase border border-[#f6f6f6] hover:border-[#000] bg-transparent md:max-w-[150px] mx-auto text-center" href={productPermalink || "#"}>Köp…</Link>)}

      {error && <span className="absolute error top-[120px] text-[6px] md:text-xs bg-red-500 p-2 text-white font-bold" dangerouslySetInnerHTML={{ __html: error }}></span>}
    </>
  )
}
