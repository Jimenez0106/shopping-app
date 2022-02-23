import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import FavoriteItem from "../components/FavoriteItem";
import "../styles/Header/Header.module.css";

const favorites = () => {
  const { user, error, isLoading } = useUser();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  let favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user, refresh]);

  if (user) {
    return (
      <div className="page-container">
        <Header />
        <div className="content">
          <div className="main-container">
            {favorites.map((item) => {
              return <FavoriteItem key={item.id} item={item} user={user} />;
            })}
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading</div>;
};

export default favorites;

export const getServerSideProps = withPageAuthRequired();
