import { unstable_noStore } from "next/cache";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
import CoCartAPI from "@cocart/cocart-rest-api";
import { Dispatch, SetStateAction } from "react";

const CoCart = new CoCartAPI({
    url: "https://merablog.merakommunikation.se",
    consumerKey: "ck_c7d9a5093230470c7dfb681882744f9aa0ec18ba",
    consumerSecret: "cs_6986ba10b2fd720db1925f456577a7dbb48276de",
    version: "cocart/v1"
})

const api = new WooCommerceRestApi({
    url: "https://merablog.merakommunikation.se",
    consumerKey: "ck_c7d9a5093230470c7dfb681882744f9aa0ec18ba",
    consumerSecret: "cs_6986ba10b2fd720db1925f456577a7dbb48276de",
    version: "wc/v3"
})

export const getProducts = async (per_page = 12) => {
    unstable_noStore();
    const responseData: ResponseData = { success: false, products: [] };

    try {
        const { data } = await api.get('products', { per_page: per_page })
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
    unstable_noStore();
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
    unstable_noStore();
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

export async function getProductsByCategory(category: string) {
    unstable_noStore();
    try {
        const response = await api.get('products', {
            category,
            per_page: 10
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

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export async function addToCart(productId: number, quantity = 1, cart_key: string | null, setLoading: Dispatch<SetStateAction<boolean>>) {
    try {
        setLoading(true);
        const response = await fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, {
            method: "POST",
            body: JSON.stringify({ 
                "id": String(productId),
                "quantity": String(quantity)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (data.cart_key) {
            setLoading(false);
            const cartKeyAlreadyExist = localStorage.getItem("cart_key");
            if (!cartKeyAlreadyExist) {
                localStorage.setItem("cart_key", data.cart_key);
                
            }
            return data;
        }

    } catch (error) {
        setLoading(false);
        return error;
    }
}
export async function getCart(cartKey: string) {
    return fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart?cart_key=${cartKey}`)
        .then(response => response.json())
        .then(res => res)
}