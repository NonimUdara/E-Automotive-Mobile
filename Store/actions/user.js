export const ADD_USER_DATA = "ADD_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";

export const addUserData = (userData) => {
  return { type: ADD_USER_DATA, userData: userData };
};

export const removeUserData = () => {
  return { type: REMOVE_USER_DATA };
};
