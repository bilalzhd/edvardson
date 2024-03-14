"use client"
import { createWoocommerceCustomer } from "@/lib/store";
import CountrySelector from "./CountrySelector";
import { getSessionToken, getStates } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { InlineCheckout } from '@bambora/checkout-sdk-web';
import { AppContext } from "@/context";
import { useForm } from "react-hook-form";
import { KlarnaComponent } from "./KlarnaComponent";
import BamboraCheckout from "./BamboraCheckout";



const initialData = {
    locale: "sv-SE",
    purchase_country: "SE",
    purchase_currency: "SEK",
    intent: "buy",
    merchant_urls: {
        success: "https://edvardson.netlify.app/thank-you?token=<random_uuid>&sid={{session_id}}&authorization_token={{authorization_token}}",
        cancel: "https://edvardson.netlify.app/cancel?token=<random_uuid>&sid={{session_id}}",
        back: "https://edvardson.netlify.app/back?token=<random_uuid>&sid={{session_id}}",
        failure: "https://edvardson.netlify.app/fail?token=<random_uuid>&sid={{session_id}}",
        error: "https://edvardson.netlify.app/error?token=<random_uuid>&sid={{session_id}}"
    }
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

    const [payWithKlarna, setPayWithKlarna] = useState<Boolean>(false)
    const [cart, ,] = useContext(AppContext);
    // const [paymentMethod, setPaymentMethod] = useState<"bambora" | "klarna">("bambora");
    const [klarnaSession, setKlarnaSession] = useState<any>(null);
    useEffect(() => {
        const bodyData = {
            ...initialData,
            order_amount: (cart as Cart)?.totals?.total / 100,
            order_lines:
                (cart as Cart)?.items?.map((c: any) => {
                    return {
                        type: 'physical',
                        reference: '1',
                        name: c.name,
                        quantity: c.quantity.value,
                        quantity_unit: 'pcs',
                        unit_price: c.price / 100,
                        tax_rate: 0,
                        total_amount: c.totals.total,
                        total_tax_amount: 0,
                    }
                })

        };
        if ((cart as Cart)?.items?.length > 0) {
            fetch('/api/klarna', {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    "Content-Type": "application/json",
                }
                // Add any necessary headers or body data here
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        const dt = data.data;
                        setKlarnaSession(data.data);
                    } else {
                        console.error('Invalid server response:', data);
                        // Handle the case where the server response is invalid or missing data
                    }
                })
                .catch(error => {
                    console.error('Error fetching data from server:', error);
                    // Handle fetch error
                });

        }
    }, [(cart as Cart)?.items])

    function handleKlarnaComplete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Simulate asynchronous completion (replace with your actual async logic)
            setTimeout(() => {
                console.log('Klarna payment completed.');
                resolve(); // Resolve the promise when payment is completed
            }, 2000); // Simulate a 2-second delay
        });
    }
    return (
        <div>
            {(klarnaSession && payWithKlarna) && (
                <KlarnaComponent klarnaSession={klarnaSession} onComplete={handleKlarnaComplete} />
            )}
            {/* <div className="md:w-1/2">
                <h3 className="text-[20px] font-bold">Betalningsmetod</h3>
                <div className="p-4 border rounded flex items-center gap-10">
                    <input onChange={() => setPaymentMethod("bambora")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="bambora" checked={paymentMethod == "bambora"} />
                    <label className="text-[14px]" htmlFor="bambora">Bambora</label>
                </div>
                <div className="p-4 border rounded flex items-center gap-10">
                    <input onChange={() => setPaymentMethod("klarna")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="klarna" check} />
                    <label className="text-[14px]" htmlFor="klarna">Klarna</label>
                </div>
            </div> */}
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
                    <button onClick={() => setPayWithKlarna(true)}>Pay With Klarna</button>
                </div>
            </form>
            <BamboraCheckout />
        </div>
    )
}