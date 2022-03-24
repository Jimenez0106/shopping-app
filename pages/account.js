import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "../components/header/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { setFavorite, setCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import FavoriteItems from "../components/account/favoriteItems";
import CartItems from "../components/account/cartItems";

const account = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  //REDUX Stores
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  //ChakraUI Theme
  const { colorMode } = useColorMode();
  const background1 = useColorModeValue("#fff", "#292929");
  const tooltip1 = useColorModeValue("#000", "#fff");
  const tooltip2 = useColorModeValue("#fff", "#4F4F4F");

  useEffect(() => {
    //Set REDUX cart/favorites to current localStorage cart/favorites for page refresh
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      localStorage.getItem(user.name) !== null
        ? dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))))
        : "";
    }
  }, [user]);

  if (isLoading)
    return (
      <Flex
        direction="column"
        minH="100vh"
        h="100%"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
      >
        <Header />
        <Flex
          mt={67}
          direction="column"
          alignItems="center"
          justifyContent="center"
          mb={100}
          gap={5}
        >
          <SkeletonCircle size="128px" />
          <Skeleton w={250} h={43} />
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Skeleton gap={5} rounded={15} minH={300} w="88%" />
        </Flex>
      </Flex>
    );
  if (error) return <div>{error.message}</div>;
  if (user)
    return (
      <Flex
        direction="column"
        minH="100vh"
        h="100%"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
      >
        <Header />
        {/* Content */}
        <Flex justifyContent="center" alignItems="center" w="100%" mt="75px">
          {/* Main Container */}
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            w="100%"
            gap={10}
          >
            {/* Name and Image container*/}
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                src={user.picture}
                alt={`${user.name}'s Email Icon`}
                rounded="50%"
                size="2xl"
              />
              <Heading>Hello, {user.name}!</Heading>
            </Flex>

            {/* Favorites Container */}
            <FavoriteItems
              favorites={favorites}
              background1={background1}
              tooltip1={tooltip1}
              tooltip2={tooltip2}
            />

            {/* Cart Container */}
            <CartItems
              cart={cart}
              background1={background1}
              tooltip1={tooltip1}
              tooltip2={tooltip2}
            />
          </Flex>
        </Flex>
      </Flex>
    );
};

export default account;

export const getServerSideProps = withPageAuthRequired();
