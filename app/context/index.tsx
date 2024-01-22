'use client'
import { useState, useEffect, createContext } from "react";
import { getCart } from "../lib/store";
type Cart = {
    cart_hash: string
    cart_key: string
    coupons: any
    cross_sells: any
    currency: any
    customer: any
    fees: any
    item_count: number
    items: any
    items_weight: number
    needs_payment: boolean
    needs_shipping: boolean
    notices: any
    removed_items: any
    shipping: any
    taxes: any
    totals: any
}
export const AppContext = createContext<[Cart | {}, React.Dispatch<React.SetStateAction<Cart | {}>>, string]>([{}, () => {}, ""]);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | {}>({});
    const [cartKey, setCartKey] = useState("");

    useEffect(() => {
        let cartKey = localStorage.getItem('cart_key') || "";
        async function getCartData() {
            const cartData = await getCart(cartKey);
            setCart(cartData)
        }
        if (cartKey) {
            setCartKey(cartKey)
            getCartData();
        }
    }, [])


    return (
        <AppContext.Provider value={[cart, setCart, cartKey]}>
            {children}
        </AppContext.Provider>
    )
}