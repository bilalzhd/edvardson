import { unstable_noStore } from "next/cache";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: "https://merablog.merakommunikation.se",
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

export const getProducts = async ( per_page = 12 ) => {
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
