const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://merablog.merakommunikation.se",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

export const getProducts = async (count = 20, per_page = 12) => {
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


export const flatListToHierarchical = (data = [], { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {}) => {
  const tree: any = [];
  const childrenOf: any = {};
  data.forEach((item: any) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (
      childrenOf[parentId] = childrenOf[parentId] || []
    ).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};

export async function getMenuItems() {
  const query = `{
    menu(id: "dGVybToxNw==") {
      menuItems(first: 30) {
        nodes {
          id
          label
          url
          parentId
          childItems {
            nodes {
              label
              url
              childItems {
                nodes {
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  }`;
  try {
    const response = await fetch(`${process.env.WORDPRESS_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    return flatListToHierarchical(data.data.menu.menuItems.nodes);
  } catch (err) {
    console.error(err);
    return {};
  }
}