import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "../components/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { setFavorite, setCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const account = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  //Get unique items in cart
  const displayCart = cart.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  //ChakraUI Theme
  const { colorMode } = useColorMode();
  const tooltip1 = useColorModeValue("#000", "#fff");
  const tooltip2 = useColorModeValue("#fff", "#4F4F4F");

  useEffect(() => {
    //Set REDUX cart/favorites to current localStorage cart/favorites for page change
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))));
    }
  }, [user]);

  if (isLoading) return <div>Loading Account Page</div>;
  if (error) return <div>{error.message}</div>;
  if (user) console.log(useUser());
  return (
    <Flex
      direction="column"
      minH="100vh"
      h="100%"
      className={colorMode === "light" ? "background-light" : "background-dark"}
    >
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
            {/* Name and Image container*/}
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                src={user.picture}
                alt={`${user.name}'s Email Icon`}
                rounded="50%"
                size="2xl"
              />
              <Heading>Hello, {user.given_name}!</Heading>
            </Flex>

            {/* Favorites Container */}
            <Flex direction="column" w="90%" gap={5}>
              <Heading>Favorite items</Heading>

              {/* Favorites */}
              <Flex
                direction="row"
                gap={5}
                p={5}
                overflowX="auto"
                className="horizontal"
              >
                {favorites.length ? (
                  favorites.map((item) => {
                    const { title, image, id } = item;
                    return (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        minW="200px"
                        maxW="200px"
                        h="100%"
                      >
                        <Tooltip
                          label={title}
                          shouldWrapChildren
                          openDelay={500}
                          bgColor={tooltip2}
                          color={tooltip1}
                          textAlign="center"
                          rounded={15}
                        >
                          <LinkBox>
                            <LinkOverlay href={`/listings/${id}`}>
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
                                <Text textAlign="center" isTruncated>
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
                  <Text>No items favorited</Text>
                )}
              </Flex>
            </Flex>

            {/* Cart Container */}
            <Flex direction="column" w="90%" gap={5} mb={10}>
              <Heading>Cart items</Heading>

              {/* Cart */}
              <Flex
                direction="row"
                gap={5}
                p={5}
                overflowX="auto"
                className="horizontal"
              >
                {cart.length ? (
                  displayCart.map((item) => {
                    const { title, image, id } = item;
                    return (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        minW="200px"
                        maxW="200px"
                        h="100%"
                      >
                        <Tooltip
                          label={title}
                          shouldWrapChildren
                          openDelay={500}
                          bgColor={tooltip2}
                          color={tooltip1}
                          textAlign="center"
                          rounded={15}
                        >
                          <LinkBox>
                            <LinkOverlay href={`/listings/${id}`}>
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
                                <Text textAlign="center" isTruncated>
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
                  <Text>No items in cart</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default account;

export const getServerSideProps = withPageAuthRequired();
