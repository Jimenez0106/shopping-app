import { useDispatch, useSelector } from "react-redux";
import { addCategories, resetCategories, setDisplay } from "../redux/actions";
import { useEffect, useState } from "react";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";

const Categories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //ChakraUI Themes
  const colorMode1 = useColorModeValue("white", "#292929");
  const colorMode2 = useColorModeValue("lightgray", "#292929");

  //REDUX Store
  const categories = useSelector((state) => state.categories);
  const itemsList = useSelector((state) => state.items);
  const [items] = itemsList;
  const tempCategories = [];

  useEffect(() => {
    setLoading(true);
    //Set item categories
    items.map((item) => {
      const { category } = item;
      tempCategories.includes(category) ? "" : tempCategories.push(category);
    });
    dispatch(resetCategories());
    tempCategories.map((category) => {
      dispatch(addCategories(category));
    });
    setLoading(false);
  }, []);

  //Filter display based on selected category
  const filterHandler = (category) => {
    const itemsCopy = items;
    let filteredCopy = itemsCopy.filter((item) => item.category === category);
    category === "All"
      ? dispatch(setDisplay(itemsCopy))
      : dispatch(setDisplay(filteredCopy));
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      mb={10}
      p={3}
      bgColor={colorMode1}
      borderBottom={`3px solid ${colorMode2}`}
    >
      <Button
        w="100%"
        variant="ghost"
        colorScheme="teal"
        onClick={() => {
          filterHandler("All");
        }}
      >
        All
      </Button>
      {categories.map((category, index) => {
        const capitalize = category
          .split(" ")
          .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
          .join(" ");
        return (
          <Button
            w="100%"
            variant="ghost"
            colorScheme="teal"
            key={index}
            onClick={() => {
              filterHandler(category);
            }}
          >
            {capitalize}
          </Button>
        );
      })}
    </Flex>
  );
};

export default Categories;
