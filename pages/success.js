import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setCart } from "../redux/actions";

const success = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart([]));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  return (
    <>
      <Header />
      <Flex justifyContent="center" alignItems="center" mt={25}>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
          p={15}
          w="90%"
          bgColor="rgb(224, 224, 224)"
        >
          <Heading>Thank you for your purchase!</Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default success;
