import { useState, useEffect, createContext } from "react";

export const AppContext = createContext([{}, () => { }]);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            let cartData = localStorage.getItem('next-cart');
            cartData = null != cartData ? JSON.parse(cartData) : [];
            setCart(cartData);
        }
    }, [])

    useEffect(() => {

        if (typeof window === 'undefined') {
            localStorage.setItem('next-cart', JSON.stringify(cart));
        }

    }, [cart]);

    return (
        <AppContext.Provider value={[cart, setCart]}>
            {children}
        </AppContext.Provider>
    )
}