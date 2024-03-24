import { Dispatch, SetStateAction } from "react";
import { unstable_noStore } from "next/cache";
import CoCartAPI from "@cocart/cocart-rest-api";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const cart_url = "https://admin.edvardson.se/wp-json/cocart/v2";

const CoCart = new CoCartAPI({
    url: "https://admin.edvardson.se",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
});


const api = new WooCommerceRestApi({
    url: "https://admin.edvardson.se",
    consumerKey: "ck_2ddbb0b7040f6f141bf1392850465250cc6ee35f",
    consumerSecret: "cs_cba1a0cb85e35ff19a6843e4e3a2dddfcc5ed2a3",
    version: "wc/v3",
    axiosConfig: {
        headers: {}
    }
})
export const getShippingMethods = async () => {
    try {
        const response = await api.get("shipping_methods")
        return response.data;
    } catch (err) {
        return err;
    }
}
export const getProductCategories = async (lang = "sv") => {
    try {
        const response = await api.get(`products/categories?per_page=40`)
        return response.data;
    } catch (err) {
        return err;
    }
}
export const getProducts = async (per_page = 12, lang = 'sv') => {
    const responseData: ResponseData = { success: false, products: [] };

    try {
        const { data } = await api.get(`products`, { per_page: per_page })
        responseData.success = true;
        responseData.products = data;

        return responseData;
    } catch (err) {
        responseData.success = false;
        responseData.products = [];
        return responseData;
    }
}
export const getSearchedProducts = async (searchTerm: string, per_page = 12) => {
    const responseData: ResponseData = { success: false, products: [] };

    try {
        const { data } = await api.get(`products?search=${searchTerm}`, { per_page: per_page })
        responseData.success = true;
        responseData.products = data;

        return responseData;
    } catch (err) {
        responseData.success = false;
        responseData.products = [];
        return responseData;
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const response = await api.get("products", {
            slug: slug,
            per_page: 1,
        });

        if (response.data && response.data.length > 0) {
            const product = response.data[0];
            return product;
        } else {
            console.error("Product not found.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching product:", error.message);
        throw error;
    }
}

export async function getProductVariations(productId: number) {
    // unstable_noStore();
    try {
        const response = await api.get(`products/${productId}/variations`, {
            per_page: 50
        });
        if (response.data && response.data.length > 0) {
            const products = response.data;
            return products;
        } else {
            console.error("Product not found.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching product:", error.message);
        throw error;
    }
}

export async function getProductsByRelatedIds(relatedIds: number[], lang = 'sv') {
    try {
        const relatedIdsString = relatedIds?.join(',');
        const response = await api.get(`products?include=${relatedIdsString}`, {
            per_page: 10
        });

        if (response.data && response.data.length > 0) {
            const products = response.data;
            return products;
        } else {
            console.error("Products not found for the given related IDs.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching products by related IDs:", error.message);
        throw error;
    }
}


export async function getProductsByCategory(category: string, lang = 'sv') {
    unstable_noStore();
    try {
        const response = await api.get(`products?category=${category}`, {
            per_page: 20
        });
        if (response.data && response.data.length > 0) {
            const products = response.data;
            return products;
        } else {
            console.error("Product not found.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching product:", error.message);
        throw error;
    }
}
export async function getProductsForCheckout(min_price: string, max_price: string, lang = "sv") {
    // unstable_noStore();
    try {
        const response = await api.get('products', {
            min_price,
            max_price,
            per_page: 10,
        });
        if (response.data && response.data.length > 0) {
            const products = response.data;
            return products;
        } else {
            console.error("Product not found.");
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching product:", error.message);
        throw error;
    }
}

export async function addToCart(productId: number, quantity = 1, cart_key: string | null, setLoading: Dispatch<SetStateAction<boolean>>) {
    try {
        setLoading(true);
        const response = await fetch(`${cart_url}/cart/add-item?cart_key=${cart_key}`, {
            method: "POST",
            body: JSON.stringify({
                id: String(productId),
                quantity: String(quantity)
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json();
        if (data.cart_key) {
            setLoading(false);
            const cartKeyAlreadyExist = localStorage.getItem("cart_key");
            if (!cartKeyAlreadyExist) {
                localStorage.setItem("cart_key", data.cart_key);
            }
        }
        return data;

    } catch (error) {
        setLoading(false);
        return error;
    }
    finally {
        setLoading(false)
    }
}

export async function addVariationToCart(
    variation: any, quantity = 1, cart_key: string | null, setLoading: Dispatch<SetStateAction<boolean>>
) {

    setLoading(true);
    const variationData: any = {}
    variation.attributes?.map(function (v: any) {
        variationData["attribute_pa_" + v.name.toLowerCase()] = "" + v.option.toLowerCase()
    })
    var data = {
        "id": String(variation.id),
        "quantity": String(quantity),
        "variation": variationData
    };

    try {
        const response = await fetch(`${cart_url}/cart/add-item?cart_key=${cart_key}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        const responseData = await response.json();

        if (responseData.cart_key) {
            setLoading(false);
            const cartKeyAlreadyExist = localStorage.getItem("cart_key");
            if (!cartKeyAlreadyExist) {
                localStorage.setItem("cart_key", responseData.cart_key);
            }
        }
        return responseData;
    }
    catch (err) {
        setLoading(false);
        return err;
    }
    finally {
        setLoading(false);
    }
}

export async function getCart(cartKey: string) {
    return fetch(`${cart_url}/cart?cart_key=${cartKey}`)
        .then(response => response.json())
        .then(res => res)
        .catch(err => console.error(err))
}

export async function updateCartItemQuantity(itemKey: string, quantity: number, cartKey: string, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    return fetch(`${cart_url}/cart/item/${itemKey}?cart_key=${cartKey}`, {
        method: "POST",
        body: JSON.stringify({ quantity }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(res => res)
        .finally(() => {
            setLoading(false)
        })
}

export async function deleteItemFromCart(itemKey: string, cartKey: string, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    return fetch(`${cart_url}/cart/item/${itemKey}?cart_key=${cartKey}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(res => res)
        .finally(() => {
            setLoading(false)
        })
}

// CHECKOUT /// 


export const createWoocommerceCustomer = async (data: any) => {
    

    const _data = {
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
        username: "john.doe",
        billing: {
            first_name: "John",
            last_name: "Doe",
            company: "",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US",
            email: "john.doe@example.com",
            phone: "(555) 555-5555"
        },
        shipping: {
            first_name: "John",
            last_name: "Doe",
            company: "",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US"
        }
    };


    try {
        const response = await api.post("customers", JSON.stringify(_data))
        return response;
    }
    catch (error: any) {
        console.error(error.response.data);
    };
}

export async function createWoocommerceOrder(data: any) {
    const orderData = {
        payment_method: "klarna_payments",
        payment_method_title: "Klarna",
        set_paid: true,
        billing: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.billingAddress1,
            address_2: data.billingAddress2,
            city: data.billingCity,
            state: "SV-AH",
            postcode: data.billingPostcode,
            country: data.country,
            email: data.email,
            phone: data.billingPhone
        },
        shipping: {
            first_name: data.firstName,
            last_name: data.lastName,
            address_1: data.billingAddress1,
            address_2: data.billingAddress2,
            city: data.billingCity,
            state: "SV-AH",
            postcode: data.billingPostcode,
            country: data.country,
        },
        line_items: data.lineItems?.map((l: any) => {
            return {
                product_id: l.id,
                quantity: l.quantity.value
            }
        }),
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0"
            }
        ]
    };
    const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const orderResponseData = await response.json();
    // TODO: also create woocommerce customer
    return orderResponseData;
}
export async function getWoocommerceOrder(id: string) {
    const response = await api.get("orders/" + id)
    const data = response.data;
    return data;
}

export async function clearCart(cartKey: string) {
    return fetch(cart_url + "/cart/clear?cart_key=" + cartKey, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err)
}


export async function createKlarnaOrder(customerData: any, klarnaData: any) {
    const cusData = {
        purchase_country: "SV",
        purchase_currency: "SEK",
        billing_address: {
            given_name: customerData.firstName,
            family_name: customerData.lastName,
            email: customerData.email,
            title: "Mr",
            street_address: customerData.billingAddress1,
            postal_code: customerData.billingPostcode,
            city: customerData.billingCity,
            phone: customerData.billingPhone,
            country: "SE"
        },
        shipping_address: {
            given_name: customerData.firstName,
            family_name: customerData.lastName,
            email: customerData.email,
            title: "Mr",
            street_address: customerData.billingAddress1,
            postal_code: customerData.billingPostcode,
            city: customerData.billingCity,
            phone: customerData.billingPhone,
            country: "SE"
        },
        order_amount: customerData.totalAmount,
        order_tax_amount: 0,
        order_lines: customerData.lineItems.map((item: any) => {
            return {
                type: "physical",
                reference: item.id,
                name: item.name,
                quantity: item.quantity.value,
                unit_price: item.price,
                tax_rate: 0,
                total_amount: item.totals.subtotal,
                total_discount_amount: 0,
                total_tax_amount: 0,
                product_url: "https://edvardson.se/product/" + item.slug,
                image_url: item.featured_image
            };
        }),
        merchant_urls: {
            confirmation: "https://edvardson.se/confirmation",
            notification: "https://edvardson.se/pending"
        },
        // FIXME: merchant_reference1: "45aa52f387871e3a210645d4",
        // TODO: fix merchant reference with dynamic original one
    }
    const authToken = klarnaData[0].authorization_token;
    const response = await fetch("/api/klarnaOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerData: cusData, authorizationToken: authToken })
    })
    const data = await response.json();

}