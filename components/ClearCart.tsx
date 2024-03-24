"use client"

import { AppContext } from "@/context"
import { useContext, useState } from "react"
import Trash from "./icons/Trash";
import { clearCart } from "@/lib/store";

export default function ClearCart() {
  const [, setCart, cartKey,] = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  function handleClearCart() {
    setLoading(true)
    clearCart((cartKey)).then(res => {
      setCart(res)
      setLoading(false);
    })
  }
  return (
    <button onClick={handleClearCart} className="mt-4 letter-spacing-1 text-[15px] flex items-center gap-1 bg-white/60 text-[#000] px-[15px] h-[35px] font-semibold rounded uppercase">
      <Trash fill="#000" className="w-4 h-4" />
      {!loading ? "Töm varukorg" : "Läser in..."}
    </button>
  )
}
