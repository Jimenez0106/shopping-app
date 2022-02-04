import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  removeCart,
  addCart,
} from "../redux/actions";
import styles from "../styles/Items/Items.module.css";

const Item = ({ item }) => {
  const { image, price, rating, title, id } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  //ADD OR REMOVE ITEM FROM FAVORITES STORE
  const favoritesHandler = (item) => {
    const favoritesCopy = favorites;
    const filteredCopy = favoritesCopy.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );
    filteredCopy.length
      ? dispatch(removeFavorite(item.id))
      : dispatch(addFavorite(item));
  };
  const isChecked = (item) => {
    const isFavorite = favorites.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );

    return isFavorite.length ? true : false;
  };

  //ADD OR REMOVE ITEM FROM CART STORE
  const cartHandler = (item) => {
    dispatch(addCart(item));
    // const cartCopy = cart;
    // const filteredCopy = cartCopy.filter((cartItem) => cartItem.id === item.id);
    // filteredCopy.length ? "" : dispatch(addCart(item));
  };

  return (
    <div className={styles.card}>
      <input
        style={{ cursor: "pointer" }}
        type="checkbox"
        onChange={() => {
          favoritesHandler(item);
        }}
        checked={isChecked(item)}
      />
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
        <button onClick={() => cartHandler(item)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item;
