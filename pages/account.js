import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "../components/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { setFavorite, setCart } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../styles/Header/Header.module.css";
import styles from "../styles/Account.module.css";

const account = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

  if (isLoading) return <div>Loading Account Page</div>;
  if (error) return <div>{error.message}</div>;

  if (user && user.picture) {
    return (
      <div className="page-container">
        <Header />
        <div className="content">
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <img src={user.picture} />
            </div>
            <h3>Hello, {user.given_name}!</h3>
          </div>
        </div>
      </div>
    );
  }
};

export default account;

export const getServerSideProps = withPageAuthRequired();
