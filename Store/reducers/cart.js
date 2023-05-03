import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = +addedProduct.price;
      const prodTitle = addedProduct.name;
      const prodImageUrl = addedProduct.imageUrl;

      if (state.items[addedProduct.id]) {
        // already added to the cart
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          prodImageUrl
        );
        console.log("Cart", state);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice, prodImageUrl);
        console.log("Cart", state);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = state.items[action.pid].quantity;

      if (currentQty > 1) {
        // need to reduce it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.prodPrice,
          selectedCartItem.prodTitle,
          selectedCartItem.sum - selectedCartItem.prodPrice,
          selectedCartItem.image
        );
      } else {
      }
  }
  //[] we can add or access a dynamic key in a object(vanilla js)
  return state;
};
