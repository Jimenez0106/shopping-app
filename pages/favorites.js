import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import FavoriteItem from "../components/favorites/FavoriteItem";
import { Flex, useColorMode } from "@chakra-ui/react";

const favorites = () => {
  const { user, error, isLoading } = useUser();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  //REDUX Stores
  const favorites = useSelector((state) => state.favorites);

  //ChakraUI Theme
  const { colorMode } = useColorMode();

  useEffect(() => {
    //Set REDUX cart/favorites to current localStorage cart/favorites for page change
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      localStorage.getItem(user.name) !== null
        ? dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))))
        : "";
    }
  }, [user, refresh]);

  if (error) return <div>{error.message}</div>;
  return (
    <Flex
      direction="column"
      h="100%"
      minH="100vh"
      className={colorMode === "light" ? "background-light" : "background-dark"}
    >
      <Header />
      {/* Page Content */}
      <Flex justifyContent="center" alignItems="center" w="100%" mt="75px">
        <Flex direction="column" gap={3} p={15} w="90%">
          {favorites.length && favorites !== null ? (
            favorites.map((item) => {
              return (
                <FavoriteItem
                  key={item.id}
                  item={item}
                  user={user}
                  isLoading={isLoading}
                />
              );
            })
          ) : (
            <Flex>You have no favorited items!</Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default favorites;

export const getServerSideProps = withPageAuthRequired();
