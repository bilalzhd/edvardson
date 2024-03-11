"use client"
import { createWoocommerceCustomer } from "@/lib/store";
import CountrySelector from "./CountrySelector";
import { getSessionToken, getStates } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { InlineCheckout } from '@bambora/checkout-sdk-web';
import { AppContext } from "@/context";
import { useForm } from "react-hook-form";
import axios from "axios";

// import { FormEvent, useRef } from "react";
// import { useFormState, useFormStatus } from "react-dom";

// let username = process.env.KLARNA_USERNAME || "PK250113_0a0956f8edfc"
// let password = process.env.KLARNA_PASSWORD || "tFAcWacQN4SzUNzq"
async function createKlarnaPayment() {
    const bodyData = {
        locale: "sv-SE",
        purchase_country: "SE",
        purchase_currency: "SEk",
        order_amount: "5000",
        order_lines: [
            {
                type: 'physical',
                reference: '1',
                name: 'Classic Low Bridge Sunglasses',
                color: 'White',
                size: 'Small',
                imgSrc: '/sunglasses2-min.jpg',
                quantity: 0,
                quantity_unit: 'pcs',
                unit_price: 5000,
                tax_rate: 0,
                total_amount: 5000,
                total_tax_amount: 0,
            }
        ],
        intent: "buy",
        merchant_urls: {
            authorization: "https://edvardson.netlify.app/kassa?order=successful"
        }
    
    }
    let username = "PK250113_0a0956f8edfc";
    let password = "tFAcWacQN4SzUNzq";
 // Assuming you have 'username' and 'password' variables defined

// Encode username and password for Basic authentication
const encodedAuth = btoa(`${username}:${password}`);
 
// Fetch API request
fetch("https://api.playground.klarna.com/payments/v1/sessions", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedAuth}`,
    },
    body: JSON.stringify(bodyData)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There was a problem with your fetch operation:', error);
});

}


type Inputs = {
    email: string; firstName: string; lastName: string; billingAddress1: string; billingAddress2: string;
    billingCity: string; country: string; billingPhone: string; billingPostcode: string; message: string;
}

export default function Form({ countriesData }: any) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    function onSubmit(data: Inputs) {
        console.log(data)
        console.log(errors)
    }

    const [token, setToken] = useState("")
    const [cart, ,] = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState<"bambora" | "klarna">("bambora");

    useEffect(() => {

        const data = {
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
        async function getTokenAndSetCheckout() {
            const sessionToken = await getSessionToken(data)
            if (sessionToken) {
                setToken(sessionToken)
                const checkout = new InlineCheckout(sessionToken, {
                    container: document.getElementById("#payment-options"),
                    language: "sv",
                    endpoint: "https://v1.checkout.bambora.com/",
                }
                )
                checkout.initialize(sessionToken);
                checkout.mount(document.getElementById("payment-options") || document.body)
            }
        }

        getTokenAndSetCheckout();
        // if(paymentMethod === "bambora") {
        // } else if (paymentMethod === "klarna") {
            createKlarnaPayment();
        // }

    }, [cart])


    return (
        <>
            <div className="md:w-1/2">
                <h3 className="text-[20px] font-bold">Betalningsmetod</h3>
                <div className="p-4 border rounded flex items-center gap-10">
                    <input onChange={() => setPaymentMethod("bambora")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="bambora" checked />
                    <label className="text-[14px]" htmlFor="bambora">Bambora</label>
                </div>
                <div className="p-4 border rounded flex items-center gap-10">
                    <input onChange={() => setPaymentMethod("klarna")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="klarna" />
                    <label className="text-[14px]" htmlFor="klarna">Klarna</label>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]" noValidate>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <input {...register("email", { required: true })} placeholder="E-postadress*" type="email" id="email" autoComplete="email" className="input-field" />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2.5">
                            <input {...register("firstName", { required: true })} placeholder="Förnamn*" type="text" id="firstName" autoComplete="given-name" className="input-field" />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2.5">
                            <input placeholder="Efternamn*" type="text" {...register("lastName", { required: true })} id="lastName" autoComplete="family-name" className="input-field" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <input className="input-field" placeholder="Adress" type="text" id="billingAddress1" autoCapitalize="sentences" autoComplete="address-line1" aria-label="Adress" aria-invalid="true" {...register("billingAddress1")} />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <input className="input-field" placeholder="Lägenhet, svit etc. (valfritt)" type="text" id="billingAddress2" autoCapitalize="sentences" autoComplete="address-line1" aria-label="" aria-invalid="true" title="Lägenhet, svit etc. (valfritt)"  {...register("billingAddress2")} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="mb-4">Delivery Country</label>
                        <CountrySelector data={{ ...register("country") }} countries={countriesData?.shippingCountries} />
                    </div>
                    <div className="flex items-end">
                        <input type="text" className="input-field" id="billingCity" placeholder="Ort" {...register("billingCity", { required: true })} />
                    </div>
                    <div>
                        <input type="text" className="input-field" id="billingPostcode" placeholder="Postnummer" {...register("billingPostcode", { required: true })} />
                    </div>
                    <div>
                        <input type="text" id="billingPhone" placeholder="Telefon (valfritt)" className="input-field" {...register("billingPhone", { required: true })} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea id="message" {...register("message")} rows={4} className="input-field" />
                        </div>
                    </div>
                </div>
                <div id="payment-options"></div>
                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {/* {data.pending ? 'Loading...' : 'Place Order'} */}
                        Place Order
                    </button>
                </div>
            </form>
        </>
    )
}