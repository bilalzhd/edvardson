"use client"
import Select from "react-select";
import { countryOptions as options } from "@/lib/constants";
import { useEffect, useState } from "react";
import { getProductsForCheckout } from "@/lib/store";
import ProductCarouselCheckout from "./ProductCarouselCheckout";

export default function UpsellProducts() {
    const [checkoutProducts, setCheckoutProducts] = useState([])
    useEffect(() => {
        getProductsForCheckout("0", "500").then(products => setCheckoutProducts(products));
    }, [])
    return (
        <>
            <div>
                <h2 className="text-center font-semibold text-[20px] mb-5">Andra köpte också</h2>
                <ProductCarouselCheckout products={checkoutProducts || []} />
            </div>
            <div className="bg-white p-4 rounded-md text-black text-[15px]">
                <p>Produkter beställda i December 2023 har bytesrätt t.o.m Januari 2024</p>
            </div>
        </>
    )
}
