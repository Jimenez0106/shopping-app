import React from "react";
import { useState, useEffect } from "react";
import { addCart, setCart } from "../redux/actions";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const CartItem = ({
  item,
  cart,
  displayCart,
  font,
  background,
  refresh,
  setRefresh,
  user,
  favorites,
}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

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
    //Update cart and favorite LocalStorage on any changes
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
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
    let filterLimit = 0;
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
    <Flex
      direction="row"
      backgroundColor={background}
      color={font}
      p={15}
      rounded={15}
      gap={15}
    >
      {/* Item Image */}
      <Box bg="white" p={3}>
        <Image src={image} alt={title} boxSize="150px" objectFit="contain" />
      </Box>
      <Box w="100%">
        {/* Title and Price */}
        <Flex direction="row" justifyContent="space-between">
          <Heading size="md">{title}</Heading>
          <Text fontWeight="bold" size="lg">
            {priceFormatter.format(price * count)}
          </Text>
        </Flex>
        {/* Quantity */}
        <Flex direction="row" alignItems="center" py={1} gap={1}>
          <Button
            onClick={() => addItemToCartHandler()}
            variant="ghost"
            colorScheme="cyan"
            fontWeight="bold"
            fontSize={24}
          >
            +
          </Button>
          <Text fontSize={24}>{count}</Text>
          <Button
            onClick={() => removeItemFromCart()}
            fontWeight="bold"
            fontSize={24}
            variant="ghost"
            colorScheme="cyan"
          >
            -
          </Button>
        </Flex>
        {/* Remove Button*/}
        <Flex justifyContent="space-between">
          <Button
            onClick={() => removeFromCartHandler(item)}
            variant="ghost"
            colorScheme="cyan"
          >
            Remove
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CartItem;
