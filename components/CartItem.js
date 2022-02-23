import React from "react";
import styles from "../styles/Items/cart.module.css";

const CartItem = ({ item }) => {
  const { image, price, rating, title } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <p>{priceFormatter.format(price)}</p>
        </div>

        <button>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;
