import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { setFavorite, setCart } from "../redux/actions";
import CartItem from "../components/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const cart = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  let totalCost = 0;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  //GET UNIQUE ITEMS IN CART TO DISPLAY
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  useEffect(() => {
    //GET AND SET CART AND FAVORITES FOR PAGE CHANGE
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

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
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex justifyContent="space-evenly" alignItems="flex-start" mt={25}>
        {/* CART DISPLAY */}
        <Flex
          direction="column"
          backgroundColor="rgb(224, 224, 224)"
          gap={5}
          p={15}
          w="60%"
        >
          {displayCart.map((item, id) => {
            const { price } = item;
            totalCost += price;
            return (
              <CartItem
                key={id}
                item={item}
                cart={cart}
                displayCart={displayCart}
              />
            );
          })}
          {/* SUBTOTAL OF COSTS */}
          <Flex justifyContent="flex-end" alignItems="center">
            <Text fontSize="x-large">Subtotal:&nbsp;</Text>
            <Heading>{priceFormatter.format(totalCost)}</Heading>
          </Flex>
        </Flex>
        {/* CHECKOUT DISPLAY */}
        <Flex
          direction="column"
          backgroundColor="rgb(224, 224, 224)"
          p={15}
          rounded={15}
          gap={5}
        >
          <Flex direction="row" alignItems="center">
            <Text fontSize="md">Subtotal:&nbsp;</Text>
            <Heading size="lg">{priceFormatter.format(totalCost)}</Heading>
          </Flex>
          {cart.length ? (
            <Button onClick={createCheckoutSession}>Proceed to Checkout</Button>
          ) : (
            <Button onClick={() => router.push("/")}>Go shopping!</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default cart;
