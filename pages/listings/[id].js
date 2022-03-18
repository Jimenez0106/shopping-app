import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { addCart, addFavorite, removeFavorite } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import {
  RiShoppingCart2Line as shoppingCart,
  RiHeartFill as heart,
} from "react-icons/ri";
import { ArrowBackIcon } from "@chakra-ui/icons";

const listings = ({ item }) => {
  const dispatch = useDispatch();
  const { description, image, price, rating, title } = item;
  const { user, error, isLoading } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [cursor, setCursor] = useState("default");
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //ChakraUI Themes
  const { colorMode } = useColorMode();
  const background1 = useColorModeValue("#fff", "#000");

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
  const favoritesHandler = () => {
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
  const addToCartHandler = () => {
    setRefresh(!refresh);
    dispatch(addCart(item));
    cartToast();
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

  if (isLoading) return <div>Loading Item...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex
      direction="column"
      className={colorMode === "light" ? "background-light" : "background-dark"}
      h="100vh"
      cursor={cursor}
    >
      <Header />
      {/* Content */}
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        h="100%"
      >
        {/* Main Container */}
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={5}
          rounded={15}
          bgColor={background1}
          h="400px"
          w="60%"
          p={15}
          mb={25}
        >
          {/* Image */}
          <Flex
            justifyContent="center"
            alignItems="center"
            minW="200px"
            h="300px"
          >
            <Image
              minH="200px"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
              src={image}
              alt={title}
              p={15}
            />
          </Flex>
          {/* Info Container */}
          <Flex
            direction="column"
            justifyContent="flex-start"
            h="100%"
            gap={15}
          >
            <Heading>{title}</Heading>
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
            </Flex>

            <Text>{description}</Text>
            <HStack justifyContent="center" alignItems="flex-end" h="100%">
              <Button
                size="lg"
                colorScheme="cyan"
                variant="ghost"
                onClick={() => addToCartHandler()}
              >
                Add to Cart!
              </Button>
              <Button
                size="lg"
                colorScheme="cyan"
                variant="ghost"
                onClick={() => favoritesHandler()}
              >
                Favorite!
              </Button>
            </HStack>
          </Flex>
        </Flex>
        <Button
          border="2px solid #000"
          colorScheme="cyan"
          leftIcon={<ArrowBackIcon />}
          onClick={() => {
            history.back();
            setCursor("wait");
          }}
        >
          Back Home
        </Button>
      </Flex>
    </Flex>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (pageContext) => {
  const id = pageContext.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return {
    props: {
      item: data,
    },
  };
};

export default listings;
