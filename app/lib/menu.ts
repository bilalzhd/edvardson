const WORDPRESS_API_URL: string = 'https://merablog.merakommunikation.se/graphql';

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