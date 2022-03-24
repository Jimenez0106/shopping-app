import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Checkout = ({ background, font, setCursor, display, subtotal }) => {
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
      justifyContent="center"
      alignItems="center"
      direction="column"
      backgroundColor={background}
      color={font}
      p={15}
      rounded={15}
      gap={5}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      w="100%"
    >
      <HStack>
        <Text>Subtotal:</Text>
        <Heading size="md" textAlign="center">
          {subtotal}
        </Heading>
      </HStack>

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
