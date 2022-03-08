import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import {
  addCart,
  addFavorite,
  removeFavorite,
} from "../../redux/actions";

const listings = ({ item }) => {
  const [refresh, setRefresh] = useState(false);
  const { description, image, price, rating, title } = item;
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
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

  //Add item to REDUX cart store
  const addToCartHandler = (item) => {
    setRefresh(!refresh);
    dispatch(addCart(item));
    console.log(cart);
  };

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

  if (isLoading) return <div>Loading Item...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        h="100%"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
          p={15}
          rounded={15}
          bgColor="rgb(224, 224, 224)"
          h="50%"
          w="80%"
        >
          <Flex bgColor="white" p={15} rounded={15} gap={5}>
            <Box>
              <Image
                src={image}
                alt={title}
                boxSize={350}
                objectFit="contain"
              />
            </Box>
            <Box bgColor="white" h="100%" w="100%">
              <Heading>{title}</Heading>
              <Stack>
                <Text fontSize="2xl">{priceFormatter.format(price)}</Text>
                <Text fontSize="2xl">{rating.rate}</Text>
                <Text>{description}</Text>
              </Stack>
              <Flex alignItems="flex-end" justifyContent="center" gap={5}>
                <Button onClick={() => addToCartHandler(item)}>
                  Add to cart
                </Button>
                {user ? (
                  <Button onClick={() => favoritesHandler(item)}>{`<3`}</Button>
                ) : (
                  <></>
                )}
              </Flex>
            </Box>
          </Flex>
          <Button onClick={() => history.back()}>
            Return
          </Button>
        </Flex>
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
