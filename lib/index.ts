import { InlineCheckout } from "@bambora/checkout-sdk-web";
import { clearCart, createWoocommerceOrder } from "./store";

export function isEmpty(value: any) {
    if (value == null) {
        return true;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }
    if (Array.isArray(value) || typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}
const wordpressSiteUrl = "https://admin.edvardson.se";
const getCountries = async () => {
    const response = await fetch(`${wordpressSiteUrl}/wp-json/rae/v1/wc/countries/`)
    const data = await response.json();
    return data;
}
export const getStates = async (countryCode: string) => {
    const response = await fetch(`${wordpressSiteUrl}/wp-json/rae/v1/wc/states?countryCode=${countryCode}`)
    const data = await response.json();
    return data;
}

export default getCountries;

export async function getSessionTokenApi(orderData: OrderData) {
    const response = await fetch("/api/bambora", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data?.token, "text/xml")
    const token = xmlDoc.querySelector("token")?.textContent;
    return token;
}

export async function getTokenAndSetCheckout(data: BamboraData, cartKey: string, customerData: any) {
    const sessionToken = await getSessionTokenApi(data)
    if (sessionToken) {
        const checkout = new InlineCheckout(sessionToken, {
            container: document.getElementById("#payment-options"),
            language: "sv",
            endpoint: "https://v1.checkout.bambora.com/",
        }
        )
        checkout.initialize(sessionToken)
        checkout.mount(document.getElementById("payment-options") || document.body)
        checkout.on("*", (event) => {
            if(event == "authorize") {
                createWoocommerceOrder(customerData).then((response) => {
                    clearCart(cartKey).then(res => {
                        window.location.replace("/thank-you/" + response.id)
                    });
                })
            }
        })
    }
}

export async function createKlarnaPayment(bodyData: any) {
    try {
        const response = await fetch(`${process.env.PUBLIC_URL}/api/klarna`, {
            method: 'POST',
            body: JSON.stringify(bodyData)
        })

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return data;

    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    };
}