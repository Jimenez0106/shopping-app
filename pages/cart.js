import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { setFavorite, setCart } from "../redux/actions";
import "../styles/Header/Header.module.css";
import CartItem from "../components/CartItem";
import styles from "../styles/Items/cart.module.css";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  let totalCost = 0;
  //GET UNIQUE ITEMS IN CART TO DISPLAY
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  useEffect(() => {
    //GET AND SET CART AND FAVORITES FOR PAGE CHANGE
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);



  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/checkout_sessions', {
      items: displayCart,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  }
  return (
    <div className="page-container">
      <Header />
      <div
        className="content"
        style={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
      >
        {/* CART DISPLAY */}
        <div className="main-container">
          {displayCart.map((item, id) => {
            const { price } = item;
            totalCost += price;
            return <CartItem key={id} item={item} cart={cart} displayCart={displayCart}/>;
          })}
          {/* SUBTOTAL OF COSTS */}
          <div className={styles.subtotalContainer}>
            <h3>Subtotal:&nbsp;</h3>
            <h2>${totalCost}</h2>
          </div>
        </div>
        {/* CHECKOUT DISPLAY */}
        <div className={styles.proceedContainer}>
          <div className={styles.subtotalContainer}>
            <h3>Subtotal:&nbsp;</h3>
            <h2>${totalCost}</h2>
          </div>
          <button onClick={createCheckoutSession}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default cart;
