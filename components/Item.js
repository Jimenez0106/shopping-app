import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, addCart } from "../redux/actions";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
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
      ? dispatch(removeFavorite(item.id))
      : dispatch(addFavorite(item));
  };

  //Add item to REDUX cart store
  const addToCartHandler = (item) => {
    setRefresh(!refresh);
    dispatch(addCart(item));
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

  if (isLoading) return <div>Loading Item...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex
      direction="column"
      position="relative"
      alignItems="center"
      flex="1 16%"
      p={15}
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.25)"
      rounded={15}
      bgColor={colorMode1}
      gap={3}
    >
      {user ? (
        <Flex justifyContent="flex-end" w="100%">
          <Tooltip label="Add to Favorites!" shouldWrapChildren>
            <Checkbox
              type="checkbox"
              size="lg"
              colorScheme="red"
              onChange={() => {
                favoritesHandler(item);
              }}
              isChecked={isChecked(item)}
            />
          </Tooltip>
        </Flex>
      ) : (
        <Flex justifyContent="flex-end" w="100%">
          <Tooltip label="Login to Add to Favorites!" shouldWrapChildren>
            <Checkbox type="checkbox" size="lg" colorScheme="red" isDisabled />
          </Tooltip>
        </Flex>
      )}
      <Box
        w="250px"
        h="250px"
        display="flex"
        justifyContent="center"
        bg="white"
      >
        <Link href={`/listings/${id}`}>
          <Image
            src={image}
            alt={title}
            minH="250px"
            maxW="100%"
            maxH="100%"
            objectFit="scale-down"
            cursor="pointer"
          />
        </Link>
      </Box>
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Heading as="h4" size="sm">
          <Link href={`/listings/${id}`}>
            <Text textAlign="center">{title}</Text>
          </Link>
        </Heading>
      </Flex>

      <Flex
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
        w="100%"
        h="100%"
      >
        <Flex alignItems="center" justifyContent="space-evenly" w="100%" h="100%">
          <Text m={0} color="darkorange" fontWeight="bold">
            {priceFormatter.format(price)}
          </Text>
          <Flex>
            <ReactStars edit={false} value={rating.rate} />
            <Text size="xs">&nbsp;({rating.rate})</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Button onClick={() => addToCartHandler(item)}>Add to cart</Button>
      </Flex>
    </Flex>
  );
};

export default Item;
