import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import styles from "../styles/Header/Header.module.css";
import logo from "../public/images/logo.png";

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} height={75} width={70} />
        </div>
        <div>Search Bar here</div>
        <ul className={styles.buttons}>
          <li onClick={() => router.push("/")}>Shop</li>
          {user ? (
            <>
              <li onClick={() => router.push("/favorites")}>Favorites</li>
              <li onClick={() => router.push("/account")}>Account</li>

              <Image
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
};

export default Header;
