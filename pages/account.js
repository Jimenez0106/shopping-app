import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "../components/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { setFavorite, setCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

const account = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

  if (isLoading) return <div>Loading Account Page</div>;
  if (error) return <div>{error.message}</div>;
  if (user)
    return (
      <Flex direction="column" h="100vh">
        <Header />
        <Flex justifyContent="center" alignItems="center" w="100%" mt={25}>
          <Flex
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            w="100%"
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
              w="100%"
              gap={10}
            >
              {/* Name and Image */}
              <Box>
                <Image src={user.picture} alt={user.name} rounded="50%" />
                <Heading>Hello, {user.given_name}!</Heading>
              </Box>
              {/* Favorites Container */}
              <Flex direction="column" w="90%" gap={5}>
                <Heading>Your Favorites:</Heading>
                <Box gap={0} overflowX="auto">
                  <Flex direction="row" gap={5}>
                    {favorites.map((item) => {
                      const { title, image, id } = item;
                      return (
                        <Flex direction="column" minW="200px">
                          <LinkBox>
                            <LinkOverlay href={`/listings/${id}`}>
                              <Image
                                src={image}
                                alt={title}
                                boxSize={200}
                                objectFit="contain"
                              />
                              <Text>{title}</Text>
                            </LinkOverlay>
                          </LinkBox>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Box>
              </Flex>
              {/* Cart Container */}
              <Flex direction="column" w="90%" gap={5}>
                <Heading>Cart:</Heading>
                <Box gap={0} overflowX="scroll">
                  <Flex direction="row" gap={5}>
                    {cart.map((item) => {
                      const { title, image, id } = item;
                      return (
                        <Flex direction="column" minW="200px">
                          <LinkBox>
                            <LinkOverlay href={`/listings/${id}`}>
                              <Image
                                src={image}
                                alt={title}
                                boxSize={200}
                                objectFit="contain"
                              />
                              <Text>{title}</Text>
                            </LinkOverlay>
                          </LinkBox>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
};

export default account;

export const getServerSideProps = withPageAuthRequired();
