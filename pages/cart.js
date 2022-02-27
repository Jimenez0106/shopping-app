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
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );
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
      <div className="content" style={{ justifyContent: "space-evenly" }}>
        <div className="main-container">
          {displayCart.map((item, id) => {
            const { price } = item;
            totalCost += price;
            return <CartItem key={id} item={item} cart={cart} />;
          })}
          <div className={styles.subtotalContainer}>
            <h3>Subtotal:&nbsp;</h3>
            <h2>${totalCost}</h2>
          </div>
        </div>
        <div className={styles.proceedContainer}>
          <h1>PROCEED TO CHECKOUT HERE</h1>
        </div>
      </div>
    </div>
  );
};

export default cart;
