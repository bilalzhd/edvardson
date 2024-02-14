"use client"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context";
import CheckoutItem from "./CheckoutItem";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CheckoutItems() {
    const [cart, ,] = useContext(AppContext);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if ((cart as Cart)?.items?.length > 0) {
            setLoading(false)
        }
    })
    return (
        <>
            {(cart as Cart)?.items?.length > 0 && !loading ? (cart as Cart).items?.map((item: any) => (
                <CheckoutItem key={item.id} item={item} />
            )) : loading ? (
                <div className="z-[1000] h-full w-full fixed inset-0 flex items-center justify-center bg-black/40">
                    <LoadingSpinner text="Loading..." />
                </div>) : (<p>No items in the cart</p>)}
        </>
    )
}
