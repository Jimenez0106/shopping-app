import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Checkout = ({ background, font, setCursor, display }) => {
  const router = useRouter();

  //REDUX Stores
  const cart = useSelector((state) => state.cart);

  //Stripe Setup
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout_sessions", {
      items: display,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <Flex
      direction="column"
      backgroundColor={background}
      color={font}
      p={15}
      rounded={15}
      gap={5}
    >
      {/* Checkout Button */}
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
  );
};

export default Checkout;
