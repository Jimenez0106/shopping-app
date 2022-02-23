import React from "react";
import styles from "../styles/Items/cart.module.css";

const CartItem = ({ item }) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src=""/>
      </div>
      <div>
        buttons & descrioption
        <div>description</div>
        <div>buttons</div>
      </div>
    </div>
  );
};

export default CartItem;
