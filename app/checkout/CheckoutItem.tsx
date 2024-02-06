import Refresh from "@/components/icons/Refresh";
import Trash from "@/components/icons/Trash";
import { AppContext } from "@/context";
import { deleteItemFromCart, updateCartItemQuantity } from "@/lib/store";
import { useContext, useState } from "react";

export default function CheckoutItem({ item, setLoading }: any) {
    const [, setCart, cartKey] = useContext(AppContext);
    const [quantity, setQuantity] = useState(item.quantity.value || 1);

    async function deleteItemFromCartHandler(itemKey: string) {
        const cart = await deleteItemFromCart(itemKey, cartKey, setLoading)
        setCart(cart)
    }
    async function updateCartItemQuantityHandler(itemKey: string) {
        const cart = await updateCartItemQuantity(itemKey, quantity, cartKey, setLoading)
        setCart(cart)
    }

    return (
        <div className="flex gap-2 items-center">
            <div className="flex justify-center w-[100px]">
                <img src={item.featured_image} alt={item.name} className="w-[90px] h-[90px] border p-1 border-gray-500" />
            </div>
            <div className="w-[40%]">{item.name}</div>
            <div className="flex w-[100px] text-black bg-white/40 rounded px-3 border">
                <input onChange={e => setQuantity(e.target.value)} type="number" className="focus:outline-none w-full py-3 bg-transparent" defaultValue={quantity} />
                <button onClick={() => updateCartItemQuantityHandler(item.item_key)}><Refresh /></button>
            </div>
            <div className="flex flex-col px-4 text-left w-[calc(60%-140px)]">
                <span className="text-gray-300">Unit: {item.totals.total} SEK</span>
                <span>Total: {item.totals.total * item.quantity.value} SEK</span>
                <span className="text-gray-400 text-sm">(VAT excl.{item.totals.total * item.quantity.value} SEK)</span>
            </div>
            <div className="w-[40px]"><button onClick={() => deleteItemFromCartHandler(item.item_key)}><Trash className="bg-white/60 rounded p-1 h-8 w-8" fill="#000" /></button></div>
        </div>
    ) 
}
