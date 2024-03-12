"use client"
import { AppContext } from "@/context";
import { getTokenAndSetCheckout } from "@/lib";
import { useContext, useEffect } from "react";

export default function BamboraCheckout() {
    const [cart, ,] = useContext(AppContext);
    useEffect(() => {
        const data: BamboraData = {
            order: {
                id: (cart as Cart)?.cart_hash?.substring(0, 19),
                amount: (cart as Cart)?.totals?.total,
                currency: (cart as Cart)?.currency?.currency_code
            },
            url: {
                accept: "https://edvardson.se/accept",
                cancel: "https://edvardson.se/cancel"
            }
        }
        const response = getTokenAndSetCheckout(data);
    }, [cart])

    return (
        <div id="payment-options"></div>
    )
}
