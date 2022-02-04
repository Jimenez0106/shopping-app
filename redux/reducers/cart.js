const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];
    case "REMOVE_CART":
      return state.filter((cartItem) => cartItem.id !== action.payload);
    default:
      return state;
  }
};

export default cartReducer;
