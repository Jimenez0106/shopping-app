import { useState, useEffect } from "react";
import Header from "../components/Header";
import Items from "../components/Items";
import Categories from "../components/Categories";
import { Flex, Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addItems, addDisplay } from "../redux/actions";

const Home = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
    <Flex direction="column" height="100vh">
      <Header />
      <Categories />
      <Flex justifyContent="center" alignItems="center" width="100%" mt={25}>
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
