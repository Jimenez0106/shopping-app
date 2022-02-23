import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  removeCart,
  addCart,
} from "../redux/actions";

import styles from "../styles/Items/Items.module.css";

const Item = ({ item, refresh, setRefresh }) => {
  const { user, error, isLoading } = useUser();
  const { image, price, rating, title, id } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
  }, [favorites, cart]);

  //ADD OR REMOVE ITEM TO FAVORITES STORE
  const favoritesHandler = (item) => {
    setRefresh(!refresh);
    const favoritesCopy = favorites;
    const filteredCopy = favoritesCopy.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );
    filteredCopy.length
      ? dispatch(removeFavorite(item.id))
      : dispatch(addFavorite(item));
  };

  //ADD ITEM TO CART STORE
  const addToCartHandler = (item) => {
    setRefresh(!refresh);
    dispatch(addCart(item));
  };

  //LOOK UP LOCAL STORAGE TO SEE IF ITEM IS IN IT, CHECK IF TRUE
  const isChecked = (item) => {
    const userLocalStorage = JSON.parse(localStorage.getItem(user.name));
    if (userLocalStorage === null) return false;
    const isFavorite = userLocalStorage.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );
    return isFavorite.length ? true : false;
  };

  return (
    <div className={styles.card}>
      {user ? (
        <input
          style={{ cursor: "pointer" }}
          type="checkbox"
          onChange={() => {
            favoritesHandler(item);
          }}
          checked={isChecked(item)}
        />
      ) : (
        <></>
      )}
      <div className={styles.image}>
        <Link href={`/listings/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
      <div className={styles.title}>
        <Link href={`/listings/${id}`}>
          <h4>{title}</h4>
        </Link>
      </div>
      <div className={styles.footer}>
        <div className={styles.price}>
          <h5>{priceFormatter.format(price)}</h5>
        </div>
        <div className={styles.ratings}>
          <h6>{rating.rate}</h6>
          <h6>stars here</h6>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => addToCartHandler(item)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item;
