import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "../styles/Header/Header.module.css";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user && user.picture) {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <div>Search Bar here</div>
          <ul className={styles.buttons}>
            <li onClick={() => router.push("/")}>Shop</li>
            {user ? (
              <>
                <li onClick={() => router.push("/favorites")}>Favorites</li>
                <li onClick={() => router.push("/account")}>Account</li>

                <img
                  className={styles.profilepic}
                  src={user.picture}
                  alt={user.name}
                />
                <li onClick={() => router.push("/api/auth/logout")}>Logout</li>
              </>
            ) : (
              <li onClick={() => router.push("/api/auth/login")}>Login</li>
            )}
            <li onClick={() => router.push("/cart")}>Cart</li>
          </ul>
        </div>
      </>
    );
  }
};

export default Header;
