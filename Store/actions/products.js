export const ADD_PRODUCTS = "ADD_PRODUCTS";

export const addProducts = (products) => {
  return { type: ADD_PRODUCTS, products: products };
};