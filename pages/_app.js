import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "../redux/reducers";
import "../styles/globals.css";

//REDUX devtools currently offline
const store = createStore(allReducers);

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
