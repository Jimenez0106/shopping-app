import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setCart } from "../redux/actions";

const success = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cursor, setCursor] = useState("default");

  //ChakraUI Theme
  const { colorMode } = useColorMode();

  //REDUX Stores
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setCart([]));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100%"
      className={colorMode === "light" ? "background-light" : "background-dark"}
      cursor={cursor}
    >
      <Header />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={25}
        gap={25}
      >
        <Box width="600px">
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Thank you for your purchase!
            </AlertTitle>
            <AlertDescription display="block">
              You should receive an order confirmation email shortly.
            </AlertDescription>
          </Alert>
        </Box>
        <Button
          border="2px solid #000"
          colorScheme="cyan"
          leftIcon={<ArrowBackIcon />}
          onClick={() => {
            router.push("/");
            setCursor("wait");
          }}
        >
          Back Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default success;
