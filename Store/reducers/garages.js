import {ADD_GARAGES} from '../actions/garages';

const initialState = {
  availableGarages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GARAGES:
        //console.log("action.userData", action.garages);
        //console.log("action.userData.length", action.garages.length);
        return { ...state, availableGarages: action.garages };
}
  return state;
};
