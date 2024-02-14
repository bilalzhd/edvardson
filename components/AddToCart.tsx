'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import { addToCart, addVariationToCart } from "../lib/store";
import Cart from "../components/icons/Cart";

export default function AddToCart({ quantity, variations, productId, productType, productPermalink, isProductPage = false }:
  { quantity: null | number, variations: any, productId: number, productType: string, productPermalink: string, isProductPage: boolean }
) {


  const [, setCart, cartKey, setCartKey] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function addToCartHandler() {
    setError(null)
    const cart = await addToCart(productId ?? 0, quantity ?? 1, cartKey, setLoading)
    if (cart.data?.status > 399) {
      setError(cart.message)
    } else {
      setCart(cart);
      localStorage.setItem('cart_key', (cart as any).cart_key);
      setCartKey((cart as any).cart_key)
    }

  }

  async function addVariationToCartHandler() {
    setError(null)
    const cart = await addVariationToCart(variations ?? 0, quantity ?? 1, cartKey, setLoading);
    if (cart.data?.status > 399) {
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
          type="submit" className={`add-to-cart-button ${isProductPage ? '!border-black hover:!bg-black hover:!text-white' : ''}`}>{addToCartText}
        </button>) :
        (<Link className="buy-now-button" href={productPermalink || "#"}>Köp…</Link>)}

      {error && <span className="absolute error top-[120px] text-[6px] md:text-xs bg-red-500 p-2 text-white font-bold" dangerouslySetInnerHTML={{ __html: error }}></span>}
    </>
  )
}
