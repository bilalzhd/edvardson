"use client"
import { createWoocommerceCustomer } from "@/lib/store";
import CountrySelector from "./CountrySelector";
import { getSessionToken, getStates } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { InlineCheckout } from '@bambora/checkout-sdk-web';
import { AppContext } from "@/context";
// import { FormEvent, useRef } from "react";
// import { useFormState, useFormStatus } from "react-dom";

function createKlarnaPayment() {
    let username = "K848303_9bce3e325ac0"
    let password = "85LhBOKpub6Z5DwJ"
    const encoded = "Szg0ODMwM185YmNlM2UzMjVhYzA6ODVMaEJPS3B1YjZaNUR3Sg==";
    username = btoa(username);
    password = btoa(password);
    const script = document.createElement("script");
    script.src = "https://x.klarnacdn.net/kp/lib/v1/api.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
        // Perform the POST request to initiate a session
        fetch("https://api.klarna.com/payments/v1/sessions", {
            method: "POST",
            body: JSON.stringify({
                locale: "SE",
                purchase_country: "Sweden",
                purchase_currency: "SEK",
                order_amount: "1000",
                order_lines: "",
                merchant_urls: {
                    authorization: "https://api.klarna.com/payments/v1/sessions"
                }

            }),
            headers: {
                "Authorization": "Basic " + encoded// Make sure encoded is defined somewhere
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create Klarna session');
                }
                return response.json();
            })
            .then(data => {
                console.log("Klarna session created:", data);
                // Do something with the session data if needed
            })
            .catch(error => {
                console.error("Error creating Klarna session:", error);
            });
    };
    return script;
}


export default function Form({ countriesData }: any) {
    const [token, setToken] = useState("")
    const [mount, setMount] = useState(false)
    // const [states, setStates] = useState([])
    const [cart, ,] = useContext(AppContext);



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

        const script = createKlarnaPayment();

        // return () => document.body.removeChild(script);

    }, [cart])


    return (
        <form id="checkoutForm" className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input placeholder="E-postadress*" type="email" name="email" id="email" autoComplete="email" className="input-field" required />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                        <input placeholder="Förnamn*" type="text" name="billing-first_name" id="billing-first_name" autoComplete="given-name" className="input-field" required />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                        <input placeholder="Efternamn*" type="text" name="billing-last_name" id="billing-last_name" autoComplete="family-name" className="input-field" required />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input className="input-field" placeholder="Adress" type="text" id="billing-address_1" autoCapitalize="sentences" autoComplete="address-line1" name="billing-address_1" aria-label="Adress" aria-invalid="true" aria-describedby="validate-error-billing_address_1" required />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input className="input-field" placeholder="Lägenhet, svit etc. (valfritt)" type="text" id="billing-address_2" autoCapitalize="sentences" name="billing-address_2" autoComplete="address-line1" aria-label="" aria-invalid="true" title="Lägenhet, svit etc. (valfritt)" aria-describedby="validate-error-billing_address_1" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="mb-4">Delivery Country</label>
                    <CountrySelector countries={countriesData?.shippingCountries} />
                </div>
                <div className="flex items-end">
                    <input type="text" required className="input-field" name="billing-city" id="billing-city" placeholder="Ort" />
                </div>
                <div>
                    <input type="text" required className="input-field" name="billing-postcode" id="billing-postcode" placeholder="Postnummer" />
                </div>
                <div>
                    <input type="text" required name="billing-phone" id="billing-phone" placeholder="Telefon (valfritt)" className="input-field" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                        Message
                    </label>
                    <div className="mt-2.5">
                        <textarea name="message" id="message" rows={4} className="input-field" />
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
    )
}