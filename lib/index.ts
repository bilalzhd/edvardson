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