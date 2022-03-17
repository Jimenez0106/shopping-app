import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { setFavorite, setCart } from "../redux/actions";
import CartItem from "../components/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const cart = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const dispatch = useDispatch();
  const [cursor, setCursor] = useState("default");
  const [refresh, setRefresh] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
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
    setSubtotal(total);
  }, [user, refresh]);

  //Stripe Setup
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout_sessions", {
      items: displayCart,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

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
      <Flex justifyContent="space-evenly" alignItems="flex-start" mt={25}>
        {/* Cart Display Container */}
        {!isLoading ? (
          <Spinner />
        ) : (
          <Flex direction="column" gap={5} p={15} w="60%">
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
                  <Heading>{priceFormatter.format(subtotal)}</Heading>
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
        <Flex
          direction="column"
          backgroundColor={background1}
          color={font}
          p={15}
          rounded={15}
          gap={5}
        >
          <Flex direction="row" alignItems="center">
            <Text fontSize="md">Subtotal:&nbsp;</Text>
            <Heading size="lg">{priceFormatter.format(subtotal)}</Heading>
          </Flex>
          {/* Button */}
          {cart.length ? (
            <Button
              onClick={createCheckoutSession}
              variant="ghost"
              colorScheme="cyan"
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/");
                setCursor("wait");
              }}
              variant="ghost"
              colorScheme="cyan"
            >
              Go shopping!
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default cart;
