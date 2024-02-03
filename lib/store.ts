import { Dispatch, SetStateAction } from "react";
import { unstable_noStore } from "next/cache";
import CoCartAPI from "@cocart/cocart-rest-api";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;



const CoCart = new CoCartAPI({
    url: "https://merablog.merakommunikation.se",
    consumerKey: "ck_c7d9a5093230470c7dfb681882744f9aa0ec18ba",
    consumerSecret: "cs_6986ba10b2fd720db1925f456577a7dbb48276de"
});

const api = new WooCommerceRestApi({
    url: "https://merablog.merakommunikation.se",
    consumerKey: "ck_c7d9a5093230470c7dfb681882744f9aa0ec18ba",
    consumerSecret: "cs_6986ba10b2fd720db1925f456577a7dbb48276de",
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
export const getProductCategories = async () => {
    try {
        const response = await api.get("products/categories?per_page=40")
        return response.data;
    } catch (err) {
        return err;
    }
}
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
        const response = await api.get(`products?category=${category}`, {   
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
export async function getProductsForCheckout(min_price: string, max_price: string) {
    unstable_noStore();
    try {
        const response = await api.get('products', {
            min_price,
            max_price,
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

export async function addToCart(productId: number, quantity = 1, cart_key: string | null, setLoading: Dispatch<SetStateAction<boolean>>) {
    try {
        setLoading(true);
        const response = await fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, {
            method: "POST",
            body: JSON.stringify({
                id: String(productId),
                quantity: String(quantity)
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
    return fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart/add-item?cart_key=${cart_key}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }

    })
        .then(response => response.json())
        .then(res => res)
        .catch(err => console.error(err))
        .finally(() => setLoading(false))

}

export async function getCart(cartKey: string) {
    return fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart?cart_key=${cartKey}`)
        .then(response => response.json())
        .then(res => res)
        .catch(err => console.error(err))
}

export async function updateCartItemQuantity(itemKey: string, quantity: number, cartKey: string, setLoading: Dispatch<SetStateAction<boolean>>) {
    console.log(itemKey)
    setLoading(true);
    return fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`, {
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
    return fetch(`https://merablog.merakommunikation.se/wp-json/cocart/v2/cart/item/${itemKey}?cart_key=${cartKey}`, {
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