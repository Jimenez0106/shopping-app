import { useDispatch, useSelector } from "react-redux";
import { addCategories, resetCategories, setDisplay } from "../../redux/actions";
import { useEffect } from "react";
import { Button, Flex, Hide, useColorModeValue } from "@chakra-ui/react";

const Categories = () => {
  const dispatch = useDispatch();

  //ChakraUI Themes
  const colorMode1 = useColorModeValue("#FFFFFF", "#292929");

  //REDUX Store
  const categories = useSelector((state) => state.categories);
  const itemsList = useSelector((state) => state.items);
  const [items] = itemsList;
  const tempCategories = [];

  useEffect(() => {
    //Set item categories
    items.map((item) => {
      const { category } = item;
      tempCategories.includes(category) ? "" : tempCategories.push(category);
    });
    dispatch(resetCategories());
    tempCategories.map((category) => {
      dispatch(addCategories(category));
    });
  }, []);

  //Filter display based on selected category
  const filterHandler = (category) => {
    const itemsCopy = items;
    let filteredCopy = itemsCopy.filter((item) => item.category === category);
    category === "All"
      ? dispatch(setDisplay(itemsCopy))
      : dispatch(setDisplay(filteredCopy));
  };

  return (
    <Hide below="md">
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        p={3}
        bgColor={colorMode1}
        boxShadow="0 4px 3px -5px #000000"
      >
        <Button
          w="100%"
          variant="ghost"
          colorScheme="cyan"
          fontSize={18}
          fontWeight="bold"
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
              colorScheme="cyan"
              fontSize={18}
              fontWeight="bold"
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
    </Hide>
  );
};

export default Categories;
