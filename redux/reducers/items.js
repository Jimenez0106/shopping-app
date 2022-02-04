const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default itemsReducer;
