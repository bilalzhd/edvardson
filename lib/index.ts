import { InlineCheckout } from "@bambora/checkout-sdk-web";

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
const wordpressSiteUrl = "https://merablog.merakommunikation.se";
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

export async function getSessionToken(orderData: OrderData) {
    const accessToken = "pmwdw2rLJvXrfu9VVv6O";
    const merchantNumber = "P859110602";
    const secretToken = "75Ox1Mvsy4XRoo2S2Nq1e86kDycoQPoslYpIxYA8";

    const apiKey = btoa(accessToken + "@" + merchantNumber + ":" + secretToken);
    const response = await fetch("https://api.v1.checkout.bambora.com/sessions", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Authorization": "Basic " + apiKey,
            "Content-Type": "application/json",
        }
    })
    const text = await response.text()
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml")
    const token = xmlDoc.querySelector("token")?.textContent;

    return token;
}

export async function getTokenAndSetCheckout(data: BamboraData) {
    const sessionToken = await getSessionToken(data)
    if (sessionToken) {
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
export async function createKlarnaCheckout(bodyData: any) {
    try {
        const response = await fetch(`http://localhost:3000/api/order`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json"
            }
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