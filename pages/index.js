import { useState, useEffect } from "react";
import Header from "../components/Header";
import Items from "../components/Items";
import Categories from "../components/Categories";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addItems, addDisplay } from "../redux/actions";
import { useUser } from "@auth0/nextjs-auth0";

const Home = ({ data }) => {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //ChakraUI Themes
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    dispatch(addItems(data));
    dispatch(addDisplay(data));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Flex
        direction="column"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
        minH="100vh"
        h="100%"
      />
    );
  }

  if (data) {
    return (
      <Flex
        direction="column"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
        minH="100vh"
        h="100%"
      >
        <Header />
        <Categories />
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%" mt="75px">
          <Items />
        </Flex>
      </Flex>
    );
  }
};

//Fetch fakestoreapi products
export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

export default Home;
