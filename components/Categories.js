import { useDispatch, useSelector } from "react-redux";
import { addCategories, resetCategories, setDisplay } from "../redux/actions";
import { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";

const Categories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
      borderBottom="2px solid rgb(224, 224, 224)"
      p={2}
    >
      <Button
        onClick={() => {
          filterHandler("All");
        }}
      >
        All
      </Button>
      {categories.map((category, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              filterHandler(category);
            }}
          >
            {category}
          </Button>
        );
      })}
    </Flex>
  );
};

export default Categories;
