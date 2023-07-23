import { allProducts } from "../db.js";

function productsSortedByOrder(field, order) {
  if (order === 'ASC') {
    const sortedProducts = allProducts
      .slice()
      .sort((productA, productB) => {
        return productA[field] - productB[field];
      });

    return sortedProducts;
  } else {
    const sortedProducts = allProducts
      .slice()
      .sort((productA, productB) => {
        return productB[field] - productA[field];
      });
    return sortedProducts;
  }
}

function productsSortedByCategory(category, products) {
  const productsReturned = products.filter(product => product.category === category);
  return productsReturned;
}

export const resolvers = {
  Query: {
    allProducts(parent, args, contextValue, info) {
      const { sortField, sortOrder, category } = args;

      if (sortField && sortOrder && (category === undefined || category === '')) {
        return productsSortedByOrder(sortField, sortOrder);
      } else if (sortField && sortOrder && category !== undefined) {
        const result = productsSortedByOrder(sortField, sortOrder);
        const resultFiltered = productsSortedByCategory(category, result);
        return resultFiltered
      } else {
        return allProducts;
      }
    },
    Product(parent, args, contextValue, info) {
      return allProducts.find((product) => product.id === args.id);
    }, 
  },
};
