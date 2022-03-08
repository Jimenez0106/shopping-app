import React from "react";
import { useState, useEffect } from "react";
import { addCart, setCart } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

const CartItem = ({ item, cart, displayCart }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { image, price, rating, title } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    //Set the counter for each repeat item
    const itemCounter = () => {
      let counter = 0;
      cart.map((cartItem) => {
        item.id === cartItem.id ? (counter += 1) : "";
      });
      setCount(counter);
      displayCart.map((product, index) => {
        if (product.id === item.id) {
          displayCart[index] = { ...displayCart[index], count: count };
        }
      });
    };
    itemCounter();
  }, [cart, count]);

  //Remove all same ID items from cart
  const removeFromCartHandler = (item) => {
    const cartCopy = cart;
    const filteredCopy = cartCopy.filter((cartItem) => cartItem.id !== item.id);
    dispatch(setCart(filteredCopy));
    localStorage.setItem("cart", JSON.stringify(filteredCopy));
    setRefresh(!refresh);
  };

  //Add 1 item to cart counter
  const addItemToCartHandler = () => {
    dispatch(addCart(item));
    localStorage.setItem("cart", JSON.stringify(cart));
    setRefresh(!refresh);
  };

  //Remove 1 item from cart counter
  const removeItemFromCart = () => {
    const cartCopy = cart;
    const filterLimit = 0;
    const filteredCopy = cartCopy.filter((cartItem) => {
      if (filterLimit === 0 && cartItem.id === item.id) {
        filterLimit += 1;
        return false;
      }
      return true;
    });
    dispatch(setCart(filteredCopy));
    localStorage.setItem("cart", JSON.stringify(filteredCopy));
    setRefresh(!refresh);
  };

  return (
    <Flex direction="row" backgroundColor="white" p={15} rounded={15} gap={15}>
      {/* Item Image */}
      <Box>
        <Image src={image} alt={title} maxH="180px" maxW="180px" />
      </Box>
      <Box w="100%">
        {/* Title and Remove Button */}
        <Flex direction="row" justifyContent="space-between">
          <Heading size="md">{title}</Heading>
          <Text>{priceFormatter.format(price * count)}</Text>
        </Flex>
        {/* Price and Quantity */}
        <Flex direction="row" justifyContent="space-between">
          <Button onClick={() => removeFromCartHandler(item)}>Remove</Button>
          <Flex direction="row" gap={3} alignItems="center">
            <Button size="xs" onClick={() => addItemToCartHandler()}>+</Button>
            <Text fontSize="xl">{count}</Text>
            <Button size="xs" onClick={() => removeItemFromCart()}>-</Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CartItem;
