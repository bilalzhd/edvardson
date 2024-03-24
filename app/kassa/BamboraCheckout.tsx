"use client"
import { AppContext } from "@/context";
import { getTokenAndSetCheckout } from "@/lib";
import { useContext, useEffect } from "react";

export default function BamboraCheckout({ paymentMethod, show, customerData }: {paymentMethod: "bambora" | "klarna", show: boolean, customerData: any}) {
    const [cart, , cartKey, ] = useContext(AppContext);
    useEffect(() => {
        const data: BamboraData = {
            order: {
                id: (cart as Cart)?.cart_hash?.substring(0, 19),
                amount: (cart as Cart)?.totals?.total,
                currency: (cart as Cart)?.currency?.currency_code
            },
            url: {
                accept: "https://edvardson.netlify.app/accept",
                cancel: "https://edvardson.netlify.app/cancel"
            }
        }
        getTokenAndSetCheckout(data, cartKey, customerData);
    }, [cart, customerData])

    return (
        <div id={`payment-options ${show ? 'block': 'hidden'}`} className={`${paymentMethod === "bambora" ? "block" : "hidden"}`}></div> 
    )
}
