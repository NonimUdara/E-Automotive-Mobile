//Keep in mind all action dispatch receives the action for all reducers
//then if there is a handled case it will run otherwise it will run the default case(this happens in the unrelated reducers)
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const ADD_USER_ID_TO_CART = "ADD_USER_ID_TO_CART";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const clearCart = () => {
  return { type: CLEAR_CART };
};

export const addUserIdToCart = (userId) => {
  return { type: ADD_USER_ID_TO_CART, userId: userId };
};
