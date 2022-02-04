import favoritesReducer from "./favorites";
import { combineReducers } from "redux";
import itemsReducer from "./items";
import categoriesReducer from "./categories";
import displayReducer from "./display";
import cartReducer from "./cart";

const allReducers = combineReducers({
  favorites: favoritesReducer,
  items: itemsReducer,
  categories: categoriesReducer,
  display: displayReducer,
  cart: cartReducer,
});

export default allReducers;
