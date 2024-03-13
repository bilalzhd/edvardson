'use client'
import { useState, useEffect, createContext, SetStateAction, Dispatch } from "react";
import { getCart } from "../lib/store";
import { setCookie } from "cookies-next";
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
export const AppContext = createContext<[Cart | {}, Dispatch<SetStateAction<Cart | {}>>, string, Dispatch<SetStateAction<string>>]>([{}, () => { }, "", () => { }]);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | {}>({});
    const [cartKey, setCartKey] = useState("");

    useEffect(() => {
        async function getCartData() {
            const cartData = await getCart(cartKey);
            setCart(cartData)
        }
        let cartKeyFromLocal = localStorage.getItem('cart_key') || "";
        setCartKey(cartKeyFromLocal)
        setCookie("cart_key", cartKeyFromLocal)
        getCartData();

    }, [])


    return (
        <AppContext.Provider value={[cart, setCart, cartKey, setCartKey]}>
            {children}
        </AppContext.Provider>
    )
}