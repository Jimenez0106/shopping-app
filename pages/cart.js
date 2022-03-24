import Header from "../components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import CartItem from "../components/cart/CartItem";
import {
  Box,
  Flex,
  Heading,
  Hide,
  Show,
  Skeleton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Checkout from "../components/cart/Checkout";

const cart = () => {
  const { user, error, isLoading } = useUser();

  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [cursor, setCursor] = useState("default");
  const [refresh, setRefresh] = useState(false);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //REDUX Stores
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);

  //Get unique items in cart
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  //ChakraUI Theme
  const { colorMode } = useColorMode();
  const background1 = useColorModeValue("#fff", "#292929");
  const font = useColorModeValue("#000", "#fff");

  useEffect(() => {
    //Set REDUX cart/favorites to current localStorage cart/favorites for page change
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }

    //Keep track of subtotal
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    setSubtotal(priceFormatter.format(total));
  }, [user, refresh]);

  if (error) return <div>{error.message}</div>;
  return (
    <Flex
      direction="column"
      minH="100vh"
      h="100%"
      className={colorMode === "light" ? "background-light" : "background-dark"}
      cursor={cursor}
    >
      <Header />
      <Flex justifyContent="flex-start" alignItems="flex-start" mt={75}>
        {/* Cart Display Container */}
        <Flex direction="column" gap={5} p={15} w="70%" minW="412px" zIndex={1}>
          {/* Has items in cart */}
          {cart.length ? (
            <>
              {displayCart.map((item, id) => {
                return (
                  <CartItem
                    key={id}
                    item={item}
                    cart={cart}
                    displayCart={displayCart}
                    font={font}
                    background={background1}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    user={user}
                    favorites={favorites}
                    isLoading={isLoading}
                  />
                );
              })}
              <Hide below="md">
                {/* Subtotal */}
                <Flex justifyContent="flex-end" alignItems="center">
                  <Text fontSize="x-large">Subtotal:&nbsp;</Text>
                  <Heading>{subtotal}</Heading>
                </Flex>
              </Hide>
            </>
          ) : (
            //No items in cart
            <Flex justifyContent="center" alignItems="center">
              <Heading>Your cart has no items!</Heading>
            </Flex>
          )}
        </Flex>
        {/* Checkout Container */}
        <Hide below="md">
          <Flex
            minH="100%"
            h="100vh"
            mt={-75}
            right={19}
            w="175px"
            justifyContent="flex-end"
            alignItems="center"
            position="fixed"
          >
            <Checkout
              subtotal={subtotal}
              background={background1}
              font={font}
              setCursor={setCursor}
              display={displayCart}
            />
          </Flex>
        </Hide>
      </Flex>
      <Show below="md">
        <Flex pos="sticky" bottom={0} zIndex={1} minW="100%">
          <Checkout
            subtotal={subtotal}
            background={background1}
            font={font}
            setCursor={setCursor}
            display={displayCart}
          />
        </Flex>
      </Show>
    </Flex>
  );
};

export default cart;
