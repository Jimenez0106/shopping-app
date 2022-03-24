import {
  Box,
  Flex,
  Button,
  LinkBox,
  Icon,
  Image,
  Link,
  LinkOverlay,
  Text,
  Heading,
  useToast,
  useColorModeValue,
  Skeleton,
  Hide,
  Show,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addCart } from "../../redux/actions";
import {
  RiShoppingCart2Line as shoppingCart,
  RiHeartFill as heart,
} from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const Favorite = ({ item, user, isLoading }) => {
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();
  const { description, image, price, rating, title, id } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //REDUX Stores
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  //ChakraUI Theme
  const background1 = useColorModeValue("#fff", "#292929");

  useEffect(() => {
    //Update cart and favorite LocalStorage on any changes
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
  }, [favorites, cart]);

  //***Toasts***
  const toast = useToast();
  //Add to cart
  const cartToast = () => {
    toast({
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
              Added to Cart!
            </Heading>
            <Text textAlign="center">{title}</Text>
          </Box>
        </Flex>
      ),
    });
  };

  //Add or remove from favorites
  const favoriteToast = (isAdded = false) => {
    toast({
      render: () => (
        <Flex
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          p={2}
          bg="#FC8181"
          color="black"
          border="2px solid #000000"
          rounded={20}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          gap={3}
        >
          <Icon as={heart} w="32px" h="32px" />
          <Box>
            <Heading fontSize={18} textAlign="center">
              {isAdded ? "Added to Favorites!" : "Removed from Favorites!"}
            </Heading>
            <Text textAlign="center">{title}</Text>
          </Box>
        </Flex>
      ),
    });
  };

  //Add Item to cart
  const addToCart = () => {
    dispatch(addCart(item));
    cartToast();
  };

  //Remove item from favorites
  const removeFromFavorite = () => {
    dispatch(removeFavorite(id));
    favoriteToast();
  };

  return (
    <>
      <Hide below="md">
        {isLoading ? (
          <Skeleton
            direction="row"
            p={5}
            rounded={15}
            gap={3}
            minH="235px"
            startColor="#F703FE"
            endColor="#05F5FA"
            speed={3}
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          />
        ) : (
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            p={5}
            rounded={15}
            gap={3}
            minH="235px"
            bgColor={background1}
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          >
            {/* Image */}
            <LinkBox bgColor="white" minW="100px">
              <LinkOverlay href={`/listings/${item.id}`}>
                <Image
                  boxSize="180px"
                  objectFit="contain"
                  src={image}
                  alt={title}
                />
              </LinkOverlay>
            </LinkBox>

            {/* Buttons, Item Info, and Item Description */}
            <Flex w="100%" gap={5}>
              {/* Item Info */}
              <Flex
                direction="column"
                w="100%"
                justifyContent="center"
                alignItems="flex-start"
                gap={1}
              >
                <Link href={`/listings/${id}`}>
                  <Heading size="sm">{title}</Heading>
                </Link>
                {/* Price */}
                <Box minW="150px">
                  <Box rounded={15} bgColor="orange.100" w="77px">
                    <Text
                      m={0}
                      color="darkorange"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {priceFormatter.format(price)}
                    </Text>
                  </Box>
                  {/* Ratings */}
                  <Flex alignItems="center">
                    <ReactStars
                      edit={false}
                      value={rating.rate}
                      size={18}
                      activeColor="#F703FE"
                      isHalf
                    />
                    <Text size="xs">&nbsp;({rating.rate})</Text>
                  </Flex>
                </Box>
              </Flex>

              {/* Description */}
              <Flex w="100%" minW={250}>
                <Text>{description}</Text>
              </Flex>

              {/* Buttons */}
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                minH="100%"
              >
                <Button
                  onClick={() => addToCart()}
                  colorScheme="cyan"
                  variant="ghost"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => removeFromFavorite()}
                  colorScheme="cyan"
                  variant="ghost"
                >
                  Unfavorite
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Hide>

      {/* Mobile Favorites Display */}
      <Show below="md">
        {isLoading ? (
          <Skeleton
            rounded={15}
            h="418px"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          />
        ) : (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            p={6}
            rounded={15}
            gap={3}
            bgColor={background1}
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          >
            {/* Image */}
            <LinkBox bgColor="white">
              <LinkOverlay href={`/listings/${item.id}`}>
                <Image
                  boxSize="180px"
                  objectFit="contain"
                  src={image}
                  alt={title}
                />
              </LinkOverlay>
            </LinkBox>
            {/* Description and Price/ratings */}
            <Flex
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Flex direction="column" alignItems="center" w="100%">
                {hidden ? (
                  <Box minW={250}>
                    <Text px={3} noOfLines={2}>
                      {description}
                    </Text>
                  </Box>
                ) : (
                  <Text px={3}>{description}</Text>
                )}
                <Button
                  variant="link"
                  pb={5}
                  colorScheme="blue"
                  size="sm"
                  onClick={() => setHidden(!hidden)}
                >
                  {hidden ? "Show More" : "Show Less"}
                </Button>
                {/* Price and Ratings */}
                {/* Price */}
                <Box rounded={15} bgColor="orange.100" w="77px">
                  <Text
                    m={0}
                    color="darkorange"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {priceFormatter.format(price)}
                  </Text>
                </Box>
                {/* Ratings */}
                <Flex alignItems="center">
                  <ReactStars
                    edit={false}
                    value={rating.rate}
                    size={18}
                    activeColor="#F703FE"
                    isHalf
                  />
                  <Text size="xs">&nbsp;({rating.rate})</Text>
                </Flex>
                <Flex direction="row">
                  <Button
                    onClick={() => addToCart()}
                    colorScheme="cyan"
                    variant="ghost"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => removeFromFavorite()}
                    colorScheme="cyan"
                    variant="ghost"
                  >
                    Unfavorite
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Show>
    </>
  );
};

export default Favorite;
