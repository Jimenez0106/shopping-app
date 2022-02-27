import React from "react";
import styles from "../styles/Items/cart.module.css";
import { useState, useEffect } from "react";
import { addCart, removeCart, setCart } from "../redux/actions";
import { useDispatch } from "react-redux";

const CartItem = ({ item, cart }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { image, price, rating, title } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    //GET COUNT OF SAME ID ITEMS IN CART
    const itemCounter = () => {
      let counter = 0;
      cart.map((cartItem) => {
        item.id === cartItem.id ? (counter += 1) : "";
      });
      setCount(counter);
    };
    itemCounter();
  }, [cart]);

  //REMOVE ALL ITEMS OF SAME ID FROM CART
  const removeFromCartHandler = (item) => {
    const cartCopy = cart;
    const filteredCopy = cartCopy.filter((cartItem) => cartItem.id !== item.id);
    dispatch(setCart(filteredCopy));
    localStorage.setItem("cart", JSON.stringify(filteredCopy));
    setRefresh(!refresh);
  };

  //ADD 1 ITEM TO CART COUNTER
  const addItemToCartHandler = () => {
    dispatch(addCart(item));
    localStorage.setItem("cart", JSON.stringify(cart));
    setRefresh(!refresh);
  };

  //REMOVE 1 ITEM FROM CART COUNTER
  const removeItemFromCart = () => {
    const cartCopy = cart;
    const filterLimit = 0;
    const filteredCopy = cartCopy.filter((cartItem) => {
      if ((filterLimit === 0 && cartItem.id === item.id)) {
        filterLimit += 1;
        return false;
      }
      return true;
    });
    dispatch(setCart(filteredCopy));
    localStorage.setItem("cart", JSON.stringify(filteredCopy));
    setRefresh(!refresh);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <p>{priceFormatter.format(price * count)}</p>
        </div>
        <div className={styles.header} style={{ height: "25px" }}>
          <button onClick={() => removeFromCartHandler(item)}>Remove</button>
          <div className={styles.counter}>
            <button onClick={() => addItemToCartHandler()}>+</button>
            <h5>{count}</h5>
            <button onClick={() => removeItemFromCart()}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
