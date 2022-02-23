import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addCart } from "../redux/actions";
import styles from "../styles/Items/favorites.module.css";

const Favorite = ({ item, user }) => {
  const dispatch = useDispatch();
  const { image, price, rating, title, id } = item;
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
  }, [favorites, cart]);

  return (
    <div className={styles.container}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <a href={`/listings/${item.id}`}>
          <img className={styles.image} src={image} alt={title} />
        </a>
      </div>
      {/* Buttons & Description */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px",
        }}
      >
        <div className={styles.descriptionContainer}>
          <h3 className={styles.title}>
            <a href={`/listings/${id}`}>{title}</a>
          </h3>
          <h5>{rating.rate}/5</h5>

          {priceFormatter.format(price)}
        </div>
        <div className={styles.descriptionContainer}>
          <p>{description}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={() => dispatch(addCart(item))}>Add to Cart</button>
          <button onClick={() => dispatch(removeFavorite(id))}>
            Unfavorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
