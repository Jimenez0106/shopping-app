import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { setFavorite, setCart } from "../redux/actions";
import "../styles/Header/Header.module.css";
import CartItem from "../components/CartItem";
import styles from "../styles/Items/cart.module.css";

const cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  let totalCost = 0;

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <div className="main-container">
          {cart.map((item, id) => {
            const { price } = item;
            totalCost += price;
            return <CartItem key={id} item={item} />;
          })}
          <div className={styles.subtotalContainer}>
            <h3>Subtotal:&nbsp;</h3>
            <h2>${totalCost}</h2>
          </div>
        </div>
        <div> PROCEED TO CHECKOUT HERE</div>
      </div>
    </div>
  );
};

export default cart;
