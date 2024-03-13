"use client"
import getCountries, { createKlarnaCheckout } from "@/lib";
import BamboraCheckout from "./BamboraCheckout";
import CheckoutForm from "./CheckoutForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import KlarnaCheckout from "./KlarnaCheckout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context";
import LoadingSpinner from "@/components/LoadingSpinner";

const initialData = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: "sv-SE",
    merchant_urls: {
        terms: "https://edvardson.netlify.app/terms",
        checkout: "https://edvardson.netlify.app/kassa?order_id={checkout.order.id}",
        confirmation: "https://edvardson.netlify.app/confirmation?order_id={checkout.order.id}",
        push: "https://edvardson.netlify.app/api/push?order_id={checkout.order.id}"
    }
}

export default function Form() {
    const [countries, setCountries] = useState([])
    const [klarnaData, setKlarnaData] = useState<any>(null)
    const cart = useContext(AppContext)[0];

    useEffect(() => {
        const bodyData = {
            ...initialData,
            order_amount: (cart as Cart)?.totals?.total / 100,
            order_tax_amount: (cart as Cart)?.totals?.total_tax,
            order_lines:
                (cart as Cart)?.items?.map((c: any) => {
                    return ({
                        type: "physical",
                        reference: "19-402-USA",
                        name: c.name,
                        quantity: c.quantity.value,
                        quantity_unit: "pcs",
                        unit_price: c.price / 100,
                        tax_rate: c.totals.tax,
                        total_amount: c.totals.total,
                        total_discount_amount: 0,
                        total_tax_amount: c.totals.tax
                    })
                }),
        }
        getCountries().then(res => setCountries(res));
        createKlarnaCheckout(bodyData).then(res => setKlarnaData(res));
    }, [cart])
    return (
        <>
            <PaymentMethodSelector />
            <CheckoutForm countries={countries} />
            <div className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]">
                {/* <BamboraCheckout /> */}
                <KlarnaCheckout
                klarnaData={klarnaData}
                />
                <PlaceOrder />
            </div>
        </>
    )
}

function PlaceOrder() {
    return (
        <div className="mt-10">
            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Place Order</button>
        </div>
    )
}