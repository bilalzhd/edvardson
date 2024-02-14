"use client"
import LoadingSpinner from "@/components/LoadingSpinner";
import Refresh from "@/components/icons/Refresh";
import Trash from "@/components/icons/Trash";
import { AppContext } from "@/context";
import { deleteItemFromCart, updateCartItemQuantity } from "@/lib/store";
import { useContext, useState } from "react";

export default function CheckoutItem({ item }: any) {
    const [, setCart, cartKey] = useContext(AppContext);
    const [quantity, setQuantity] = useState(item.quantity.value || 1);
    const [loading, setLoading] = useState(false)

    async function deleteItemFromCartHandler(itemKey: string) {
        const cart = await deleteItemFromCart(itemKey, cartKey, setLoading)
        setCart(cart)
    }
    async function updateCartItemQuantityHandler(itemKey: string) {
        const cart = await updateCartItemQuantity(itemKey, quantity, cartKey, setLoading)
        setCart(cart)
    }

    // console.log(item)

    return (
        <>
            {loading ? <LoadingSpinner text="Loading..." /> : (
                <div className="flex md:flex-row flex-col gap-2 items-start md:items-center md:border-0 md:pb-0 border-b border-b-gray-300 pb-2">
                    <div className="flex md:items-center justify-center items-start gap-2 w-full">
                        <div className="flex justify-center w-[80px] md:w-[100px]">
                            <img src={item.featured_image} alt={item.name} className="md:w-[90px] md:h-[90px] border p-1 rounded md:rounded-none border-gray-500" />
                        </div>
                        <div className="w-full md:w-[40%]">
                            {item.name}
                            <div className="md:hidden block">
                                <div className="flex flex-col text-left">
                                    <span className="text-gray-600">Unit: {item.totals.total} SEK</span>
                                    <span>Total: {item.totals.total * item.quantity.value} SEK</span>
                                    <span className="text-gray-700 text-sm">(VAT incl.{item.totals.total * item.quantity.value} SEK)</span>
                                </div>
                            </div>
                        </div>
                        {/* Show on desktop */}
                        <div className="hidden md:flex w-[100px] text-black bg-white/40 rounded px-3 border">
                            <input onChange={e => setQuantity(e.target.value)} type="number" className="focus:outline-none w-full py-3 bg-transparent" defaultValue={quantity} />
                            <button onClick={() => updateCartItemQuantityHandler(item.item_key)}><Refresh /></button>
                        </div>
                        <div className="hidden md:flex flex-col px-4 text-left w-[calc(60%-140px)]">
                            <span className="text-gray-300">Unit: {item.totals.total} SEK</span>
                            <span>Total: {item.totals.total * item.quantity.value} SEK</span>
                            <span className="text-gray-400 text-sm">(VAT excl.{item.totals.total * item.quantity.value} SEK)</span>
                        </div>
                        <div className="w-[40px] hidden md:block">
                            <button onClick={() => deleteItemFromCartHandler(item.item_key)}><Trash className="bg-white/60 rounded p-1 h-8 w-8" fill="#000" /></button>
                        </div>
                    </div>
                    {/* Show on mobile */}
                    <div className="md:hidden flex w-full justify-between items-center mt-4">
                        <div className="w-[100px] text-black bg-white/40 rounded px-3 border border-gray-600 flex">
                            <input onChange={e => setQuantity(e.target.value)} type="number" className="focus:outline-none w-full py-3 bg-transparent" value={quantity} />
                            <button onClick={() => updateCartItemQuantityHandler(item.item_key)}><Refresh /></button>
                        </div>
                        <div className="w-[40px] border p-1 border-gray-600 flex justify-center">
                            <button onClick={() => deleteItemFromCartHandler(item.item_key)}>
                                <Trash className="bg-white/60 rounded p-1 h-8 w-8" fill="#000" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
