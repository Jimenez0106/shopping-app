import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, addCart } from "../../redux/actions";
import {
  RiShoppingCart2Line as shoppingCart,
  RiHeartFill as heart,
} from "react-icons/ri";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  Tooltip,
  useColorModeValue,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";

const Item = ({ item, refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  const { image, price, rating, title, id } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //ChakraUI Themes
  const colorMode1 = useColorModeValue("white", "#343434");

  //REDUX stores
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    //Update cart and favorite LocalStorage on any changes
    localStorage.setItem("cart", JSON.stringify(cart));
    if (user) {
      localStorage.setItem(user.name, JSON.stringify(favorites));
    }
  }, [favorites, cart]);

  //Add or remove favorite from REDUX favorite store
  const favoritesHandler = (item) => {
    setRefresh(!refresh);
    const favoritesCopy = favorites;
    const filteredCopy = favoritesCopy.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );
    filteredCopy.length
      ? (dispatch(removeFavorite(item.id)), favoriteToast())
      : (dispatch(addFavorite(item)), favoriteToast(true));
  };

  //Add item to REDUX cart store
  const addToCartHandler = (item) => {
    setRefresh(!refresh);
    dispatch(addCart(item));
    cartToast();
  };

  //Check if item is in favorites LocalStorage, if true 'check' item
  const isChecked = (item) => {
    const userLocalStorage = JSON.parse(localStorage.getItem(user.name));
    if (userLocalStorage === null) return false;
    const isFavorite = userLocalStorage.filter(
      (favoriteItem) => favoriteItem.id === item.id
    );
    return isFavorite.length ? true : false;
  };

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

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {isLoading ? (
        <Skeleton
          flex="1 16%"
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          rounded={15}
          h="421px"
          minW="231px"
          startColor="#F703FE"
          endColor="#05F5FA"
          speed={3}
        />
      ) : (
        <Flex
          direction="column"
          position="relative"
          alignItems="center"
          flex="1 16%"
          p={15}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          rounded={15}
          bgColor={colorMode1}
          gap={3}
        >
          {/* Checkbox */}
          {user ? (
            <Flex justifyContent="flex-end" w="100%" pt={2} pr={2}>
              <Tooltip label="Add to Favorites!" shouldWrapChildren>
                <input
                  aria-label="Favorites"
                  type="checkbox"
                  onChange={() => {
                    favoritesHandler(item);
                  }}
                  checked={isChecked(item)}
                />
              </Tooltip>
            </Flex>
          ) : (
            <Flex justifyContent="flex-end" w="100%">
              <Tooltip label="Login to Add to Favorites!" shouldWrapChildren>
                <input
                  aria-label="Favorites"
                  type="checkbox"
                  disabled="disabled"
                  onChange={false}
                />
              </Tooltip>
            </Flex>
          )}

          {/* Image */}
          <Box
            w="200px"
            h="200px"
            display="flex"
            justifyContent="center"
            bg="white"
            rounded={15}
            pos="relative"
          >
            <Box w="auto" h="200px" cursor="pointer">
              <Link href={`/listings/${id}`}>
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="contain"
                  height={200}
                />
              </Link>
            </Box>
          </Box>

          {/* Title */}
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Heading as="h4" size="sm">
              <Link href={`/listings/${id}`}>
                <Text textAlign="center">{title}</Text>
              </Link>
            </Heading>
          </Flex>

          {/* Price and ratings */}
          <Flex
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            w="100%"
            h="100%"
          >
            {/* Price */}
            <Box rounded={15} bgColor="orange.100" px={2}>
              <Text m={0} color="darkorange" fontWeight="bold">
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
          </Flex>

          {/* Button */}
          <Flex>
            <Button
              colorScheme="cyan"
              variant="ghost"
              onClick={() => addToCartHandler(item)}
            >
              Add to cart
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Item;
