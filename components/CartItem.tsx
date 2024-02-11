'use client'
import { useContext, useEffect, useState } from "react";
import Refresh from "./icons/Refresh"
import Trash from "./icons/Trash"
import { deleteItemFromCart, updateCartItemQuantity } from "../lib/store";
import { AppContext } from "../context";
import Link from "next/link";


export default function CartItem({ item, setLoading }: any) {
    const [quantity, setQuantity] = useState(item.quantity.value || 1);
    const [, setCart, cartKey] = useContext(AppContext);

    useEffect(() => {
        setQuantity(item.quantity.value)
    }, [item])

    async function updateCartItemQuantityHandler(itemKey: string) {
        const response = await updateCartItemQuantity(itemKey, quantity, cartKey, setLoading);
        setCart(response)
    }

    async function deleteItemFromCartHandler(itemKey: string) {
        const response = await deleteItemFromCart(itemKey, cartKey, setLoading)
        setCart(response);
    }

    return (
        <div key={item.id} className="flex p-2 mb-2 border-b border-b-gray-300">
            <img src={item.featured_image} alt={item.name} className="border w-12 h-12 mr-2" />
            <div className="flex flex-col pb-2 px-2">
                <Link className="hover:underline" href={`/product/${item.slug}` || "#"}>{item.name}</Link>
                <span className="text-gray-500">Enhet: {item.price.substring(0, item.price.length - 2)} SEK</span>
                <span>Totalt: {item.totals.total}</span>
                <span className="text-gray-500">(Inkl. moms: {item.totals.total + item.totals.tax})</span>
                <div className="flex justify-between">
                    <div className="flex w-fit flex-shrink my-2">
                        <input onChange={(e) => setQuantity(Number(e.target.value))} min={1} className="border border-gray-300 w-12 p-2 rounded-md" type="number" name="cart_product_quantity" id="cart_product_quantity" value={quantity} />
                        <button onClick={() => updateCartItemQuantityHandler(item.item_key)} type="button" id="updateCart">
                            <Refresh />
                        </button>
                    </div>
                    <button type="button" onClick={() => deleteItemFromCartHandler(item.item_key)}><Trash /></button>
                </div>
            </div>
        </div>
    )
}
