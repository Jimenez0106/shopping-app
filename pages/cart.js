import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { setFavorite, setCart } from "../redux/actions";
import "../styles/Header/Header.module.css";
import CartItem from "../components/CartItem";
import styles from "../styles/Items/cart.module.css";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  useEffect(() => {
    //GET AND SET CART AND FAVORITES FOR PAGE CHANGE
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

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
            return <CartItem key={id} item={item} cart={cart} />;
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
          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button>Proceed to checkout</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default cart;
