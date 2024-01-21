'use client'
import { useState, useEffect, createContext } from "react";
import { getCart } from "../lib/store";

export const AppContext = createContext([{}, ()=>{}, ""]);

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