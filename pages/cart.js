import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import CartItem from "../components/cart/CartItem";
import {
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
      <Flex justifyContent="space-evenly" alignItems="flex-start" mt="75px">
        {/* Cart Display Container */}
        {isLoading ? (
          <Flex direction="column" gap={5} p={15} w="60%" h="203px">
            <Skeleton p={15} rounded={15} gap={15} h="203px" />
          </Flex>
        ) : (
          <Flex direction="column" gap={5} p={15} w="60%" minW="412px">
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
                    />
                  );
                })}
                {/* Subtotal */}
                <Flex justifyContent="flex-end" alignItems="center">
                  <Text fontSize="x-large">Subtotal:&nbsp;</Text>
                  <Heading>{subtotal}</Heading>
                </Flex>
              </>
            ) : (
              //No items in cart
              <Flex justifyContent="center" alignItems="center">
                <Heading>Your cart has no items!</Heading>
              </Flex>
            )}
          </Flex>
        )}

        {/* Checkout Container */}
        <Hide below="md">
          <Checkout
            background={background1}
            font={font}
            setCursor={setCursor}
          />
        </Hide>
      </Flex>
      <Show below="md">
        <Checkout background={background1} font={font} setCursor={setCursor} display={displayCart} />
      </Show>
    </Flex>
  );
};

export default cart;
