import { ADD_USER_DATA, REMOVE_USER_DATA } from "../actions/user";

const initialState = {
    id: null,
    name: null,
    email: null,
    phone: null,
    image: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_DATA:
            console.log("action.userData", action.userData);
            return { ...action.userData }
        case REMOVE_USER_DATA:
            return { ...initialState };
    }
    return state;
};