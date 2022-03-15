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
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const cart = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //REDUX Stores
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites)

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

  if (isLoading) return <div>Loading Account Page</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Flex
      direction="column"
      minH="100vh"
      h="100%"
      className={colorMode === "light" ? "background-light" : "background-dark"}
    >
      <Header />
      <Flex justifyContent="space-evenly" alignItems="flex-start" mt={25}>
        {/* Cart Display Container */}
        <Flex direction="column" gap={5} p={15} w="60%">
          {/* Cart Items */}
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
        </Flex>
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
              onClick={() => router.push("/")}
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
