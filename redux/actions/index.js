//ALL ITEMS ACTIONS
export const addItems = (item) => {
  return {
    type: "ADD_ITEMS",
    payload: item,
  };
};

//ITEM DISPLAY ACTIONS
export const addDisplay = (item) => {
  return {
    type: "ADD_DISPLAY",
    payload: item,
  };
};
export const filterDisplay = (item) => {
  return {
    type: "FILTER_DISPLAY",
    payload: item,
  };
};
export const setDisplay = (item) => {
  return {
    type: "SET_DISPLAY",
    payload: item,
  };
};

//FAVORITE ACTIONS
export const addFavorite = (item) => {
  return {
    type: "ADD_FAVORITE",
    payload: item,
  };
};
export const removeFavorite = (item) => {
  return {
    type: "REMOVE_FAVORITE",
    payload: item,
  };
};
export const setFavorite = (item) => {
  return {
    type: "SET_FAVORITE",
    payload: item,
  };
};

//CATEGORY ACTIONS
export const addCategories = (item) => {
  return {
    type: "ADD_CATEGORIES",
    payload: item,
  };
};
export const removeCategories = (item) => {
  return {
    type: "REMOVE_CATEGORIES",
    payload: item,
  };
};
export const resetCategories = () => {
  return {
    type: "RESET_CATEGORIES",
  };
};

//CART ACTIONS
export const addCart = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};
export const removeCart = (item) => {
  return {
    type: "REMOVE_CART",
    payload: item,
  };
};
export const setCart = (item) => {
  return {
    type: "SET_CART",
    payload: item,
  };
};
