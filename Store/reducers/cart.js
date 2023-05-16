import { ADD_TO_CART, ADD_USER_ID_TO_CART, ADD_FETCHED_DATA_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

const initialState = {
  _id: null,
  userId: null,
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log("ADD_TO_CART Cart", action.product);
      console.log("ADD-SSSSSSSS Cart", state);
      const addedProduct = action.product;
      const prodPrice = +addedProduct.price;
      const prodTitle = addedProduct.name;
      let prodImageUrl = null
      if(addedProduct?.imageUrl?.image){
        prodImageUrl = addedProduct?.imageUrl?.image;
      }else{
        prodImageUrl = addedProduct?.imageUrl;
      }

      if (state.items[addedProduct.id]) {
        // already added to the cart
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          prodImageUrl
        );
        console.log("Cart 000", state);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice, prodImageUrl);
        console.log("Cart 111", state);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = state.items[action.pid].quantity;
      console.log("action.pid", action.pid);
      console.log("selectedCartItem", selectedCartItem);
      if (currentQty > 1) {
        // need to reduce it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.image
        );
        return {
          ...state,
          items: { ...state.items, [action.pid]: updatedCartItem },
          totalAmount: state.totalAmount - selectedCartItem.productPrice,
        };
      } else {
        const items =  { ...state.items };
        delete items[action.pid];
        return {
          ...state,
          items: items,
          totalAmount: state.totalAmount - selectedCartItem.productPrice,
        };
        
      }

    case CLEAR_CART:
      return { ...initialState, userId: state.userId }
    case ADD_USER_ID_TO_CART:
      return { ...state, userId: action.userId }
    case ADD_FETCHED_DATA_TO_CART:
      let fetchedItems = {};
      action.cartData.items.forEach(item => {
        const cartItem = new CartItem(
          item.quantity,
          item.productPrice,
          item.productTitle,
          item.sum,
          item.image
        );
        fetchedItems = {...fetchedItems, [item.productId]: cartItem}
      })
      console.log("fetchedItems:",fetchedItems);
      return{
        ...state,
        _id: action.cartData._id,
        items: fetchedItems,
        totalAmount: action.cartData.totalAmount
      }
  }
  //[] we can add or access a dynamic key in a object(vanilla js)
  return state;
};
