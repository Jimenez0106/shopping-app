import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

const CartItems = ({ cart, background1, tooltip1, tooltip2 }) => {
  //Get unique items in cart
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  return (
    <>
      {/* Title */}
      <Box w="90%">
        <Heading textAlign="left">Cart</Heading>
      </Box>
      <Flex direction="column" w="90%" gap={5} mb={10} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
        {/* Cart Container */}
        <Flex
          direction="row"
          gap={5}
          p={5}
          overflowX="auto"
          className="horizontal"
          bgColor={background1}
          rounded={15}
          minH={300}
        >
          {/* Cart Items */}
          {cart.length && cart !== null ? (
            displayCart.map((item) => {
              const { title, image, id } = item;
              return (
                <Flex
                  key={id}
                  justifyContent="center"
                  alignItems="center"
                  minW="200px"
                  maxW="200px"
                  h="100%"
                >
                  <Tooltip
                    label={title}
                    openDelay={300}
                    shouldWrapChildren
                    bgColor={tooltip2}
                    color={tooltip1}
                    textAlign="center"
                    rounded={15}
                  >
                    <LinkBox>
                      <LinkOverlay href={`/listings/${id}`}>
                        {/* Image */}
                        <Box
                          bgColor="white"
                          rounded={15}
                          mb={3}
                          p={3}
                          maxH="300px"
                          maxW="200px"
                        >
                          <Image
                            src={image}
                            alt={title}
                            boxSize={200}
                            objectFit="contain"
                          />
                          {/* Title */}
                          <Text textAlign="center" isTruncated color="#000">
                            {title}
                          </Text>
                        </Box>
                      </LinkOverlay>
                    </LinkBox>
                  </Tooltip>
                </Flex>
              );
            })
          ) : (
            <Text>No items in cart...</Text>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CartItems;
