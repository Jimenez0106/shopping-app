import { useRouter } from "next/router";
import styles from "../styles/Header/Header.module.css";

export const Header = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <div>Search Bar here</div>
        <ul className={styles.buttons}>
          <li onClick={() => router.push("/")}>Shop</li>
          <li onClick={() => router.push("/favorites")}>Favorites</li>
          <li onClick={() => router.push("/account")}>Account</li>
          <li onClick={() => router.push("/cart")}>Cart</li>
        </ul>
      </div>
    </>
  );
};

export default Header;
