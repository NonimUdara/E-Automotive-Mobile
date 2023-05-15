import { ADD_USER_DATA, ADD_INITIAL_CART, REMOVE_USER_DATA } from "../actions/user";

const initialState = {
    userId: null,
    name: null,
    email: null,
    phone: null,
    image: null,
    address: null,
    postalcode: null,
    hasCart: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_DATA:
            console.log("action.userData", action.userData);
            return { ...state, ...action.userData }
        case ADD_INITIAL_CART:
            return { ...state, hasCart: true }
        case REMOVE_USER_DATA:
            return { ...initialState };
    }
    return state;
};