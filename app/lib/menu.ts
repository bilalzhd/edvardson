const WORDPRESS_API_URL: string = 'https://merablog.merakommunikation.se/graphql';
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://merablog.merakommunikation.se",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

export const getMenuItems = async () => {
    const query = `{
        menu(id: "dGVybToxNw==") {
          menuItems {
            nodes {
              id
              label
              url
              childItems {
                nodes {
                  label
                }
              }
            }
          }
        }
      }`;
    try {
        const response = await fetch(WORDPRESS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json();
        return data.data.menu.menuItems.nodes;
    } catch (e) {
        console.error('Error fetching menu data:', e);
        return null;
    }
}

export const getProducts = async (count = 20, per_page = 12) => {
  const responseData: ResponseData = {success: false, products: []};

  try {
    const { data } = await api.get('products', {per_page: per_page})
    responseData.success = true;
    responseData.products = data; 

    return responseData;
  } catch (err) {
    responseData.success = false;
    responseData.products = [];
    return responseData;
  }

}
