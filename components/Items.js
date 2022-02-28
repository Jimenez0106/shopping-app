import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import styles from "../styles/Items/Items.module.css";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setFavorite } from "../redux/actions";

const Items = () => {
  const [refresh, setRefresh] = useState(false);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const itemDisplay = useSelector((state) => state.display);
  const [display] = itemDisplay;

  useEffect(() => {
    //CHECK CART LOCALSTORAGE FOR HISTORY OF ITEMS, THEN SET TO CART STORE
    const cartHistoryCheck = () => {
      JSON.parse(localStorage.getItem("cart")).length
        ? dispatch(setCart(JSON.parse(localStorage.getItem("cart"))))
        : "";
    };
    //CHECK FAVORITE LOCALSTORAGE FOR HISTORY OF ITEMS, THEN SET TO FAVORITES STORE
    const userFavoriteHistoryCheck = () => {
      user && JSON.parse(localStorage.getItem(user.name))
        ? dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))))
        : "";
    };
    cartHistoryCheck();
    userFavoriteHistoryCheck();
  }, [user, refresh]);

  if (isLoading) return <div>Loading Items...</div>;
  if (error) return <div>{error.message}</div>;
  if (display && display.length) {
    return (
      <section className={styles.container}>
        {display.map((item) => {
          const { id } = item;
          return (
            <Item
              key={id}
              item={item}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          );
        })}
      </section>
    );
  }
  return <div>Loading Items</div>;
};

export default Items;
