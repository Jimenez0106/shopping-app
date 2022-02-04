const displayReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_DISPLAY":
      return [...state, action.payload];
    case "SET_DISPLAY":
      return [action.payload];

    default:
      return state;
  }
};

export default displayReducer;
