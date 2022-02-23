const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter((favoriteItem) => favoriteItem.id !== action.payload);
    case "SET_FAVORITE":
      return action.payload
    default:
      return state;
  }
};

export default favoritesReducer;
