import PRODUCTS from "../../data/dummy-data";
import {ADD_PRODUCTS} from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
        //console.log("action.userData", action.products);
        //console.log("action.userData.length", action.products.length);
        return { ...state, availableProducts: action.products };
}
  return state;
};

// const initialState = {
//   [PRODUCT_TYPES.car] : [],
//   [PRODUCT_TYPES.van] : [],
//   [PRODUCT_TYPES.lorry] : [],
//   [PRODUCT_TYPES.bus] : [],
//   [PRODUCT_TYPES.other] : [],
//   userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
// };

// export default (state = initialState, action) => {
//   let updatedState = {...state};
//   PRODUCTS.forEach((product) => {
//     return {...updatedState, [product.type] : [...updatedState.product.type, {...product}]}
//   });
  
//   return updatedState;
// };
