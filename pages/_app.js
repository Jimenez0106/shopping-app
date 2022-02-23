import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0";
import { createStore } from "redux";
import allReducers from "../redux/reducers";
import "../styles/globals.css";

//REDUX devtools currently offline
const store = createStore(allReducers);

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
};

export default MyApp;
