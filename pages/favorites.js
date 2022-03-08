import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import FavoriteItem from "../components/FavoriteItem";
import { Flex } from "@chakra-ui/react";

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

  if (isLoading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <Flex direction="column" h="100vh">
        <Header />
        {/* Page Content */}
        <Flex justifyContent="center" alignItems="center" w="100%" mt={25}>
          <Flex
            direction="column"
            gap={3}
            p={15}
            w="1000px"
            backgroundColor="rgb(224, 224, 224)"
          >
            {favorites.map((item) => {
              return <FavoriteItem key={item.id} item={item} user={user} />;
            })}
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default favorites;

export const getServerSideProps = withPageAuthRequired();
