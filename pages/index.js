import { useState, useEffect } from "react";
import Header from "../components/Header";
import Items from "../components/Items";
import Categories from "../components/Categories";
import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addItems, addDisplay } from "../redux/actions";

const Home = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //ChakraUI Themes
  const colorMode1 = useColorModeValue("white", "#121212");

  useEffect(() => {
    setLoading(true);
    dispatch(addItems(data));
    dispatch(addDisplay(data));
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex direction="column" height="100vh" bgColor={colorMode1} bgPosition="center">
      <Header />
      <Categories />
      <Flex justifyContent="center" alignItems="center" width="100%" bgColor={colorMode1}>
        <Items />
      </Flex>
    </Flex>
  );
};

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
