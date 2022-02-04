const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CATEGORIES":
      return [...state, action.payload];
    case "REMOVE_CATEGORIES":
      return [];
    case "RESET_CATEGORIES":
      return [];

    default:
      return state;
  }
};

export default categoriesReducer;
