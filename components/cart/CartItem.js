import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RiShoppingCart2Line as shoppingCart } from "react-icons/ri";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { addCart, setCart } from "../../redux/actions";
import { useRouter } from "next/router";

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
  isLoading,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const { image, price, title, id } = item;
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
    deleteToast();
  };

  //Add 1 item to cart counter
  const addItemToCartHandler = () => {
    dispatch(addCart(item));
    localStorage.setItem("cart", JSON.stringify(cart));
    setRefresh(!refresh);
    cartToast();
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
    cartToast(true);
  };

  //***Toasts***
  const toast = useToast();
  //Add or Remove from cart
  const cartToast = (remove = false) => {
    toast({
      duration: 2000,
      render: () => (
        <Flex
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          p={2}
          bg="#9A65FD"
          color="#000000"
          border="2px solid #000000"
          rounded={20}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          gap={3}
        >
          <Icon as={shoppingCart} w="32px" h="32px" />
          <Box>
            <Heading fontSize={18} textAlign="center">
              {remove ? "Removed 1 item from Cart!" : "Added to Cart!"}
            </Heading>
            <Text textAlign="center">{title}</Text>
          </Box>
        </Flex>
      ),
    });
  };
  //Delete from cart
  const deleteToast = () => {
    toast({
      duration: 2000,
      render: () => (
        <Flex
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          p={2}
          bg="#FC8181"
          color="#000000"
          border="2px solid #000000"
          rounded={20}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          gap={3}
        >
          <Icon as={shoppingCart} w="32px" h="32px" />
          <Box>
            <Heading fontSize={18} textAlign="center">
              Deleted from Cart!
            </Heading>
            <Text textAlign="center">{title}</Text>
          </Box>
        </Flex>
      ),
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton
          rounded={15}
          h="204px"
          minW="412px"
          w="100%"
          startColor="#F703FE"
          endColor="#05F5FA"
          speed={3}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        />
      ) : (
        <Flex
          direction="row"
          backgroundColor={background}
          color={font}
          p={15}
          rounded={15}
          gap={15}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        >
          {/* Item Image */}
          <Box bg="white" p={3} rounded={15}>
            <Image
              src={image}
              alt={title}
              boxSize="150px"
              objectFit="contain"
              cursor="pointer"
              onClick={() => router.push(`/listings/${id}`)}
            />
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
            {/* Delete Button*/}
            <Flex justifyContent="space-between">
              <Button
                onClick={() => removeFromCartHandler(item)}
                variant="ghost"
                colorScheme="cyan"
              >
                Delete
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default CartItem;
