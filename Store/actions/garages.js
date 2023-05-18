export const ADD_GARAGES = "ADD_GARAGES";

export const addGarages = (garages) => {
  return { type: ADD_GARAGES, garages: garages };
};