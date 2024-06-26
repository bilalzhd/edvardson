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
    menu(id: "dGVybToyMDc=") {
      menuItems(first: 30) {
        nodes {
          id
          label
          url
          parentId
          childItems {
            nodes {
              id
              label
              url
              childItems {
                nodes {
                  id
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
    const response = await fetch(`${"https://admin.edvardson.se"}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {revalidate: 10}
    });
    const data = await response.json();
    return flatListToHierarchical(data.data.menu.menuItems.nodes);
  } catch (err) {
    console.error(err);
    return {};
  }
}