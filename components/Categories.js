import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  addDisplay,
  addItems,
  filterDisplay,
  removeCategories,
  resetCategories,
  resetDisplay,
  resetItems,
  setDisplay,
} from "../redux/actions";
import { useEffect, useState } from "react";
import styles from "../styles/Header/Header.module.css";

const Categories = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const categories = useSelector((state) => state.categories);
  //itemDisplay will hold all filtered items
  const itemDisplay = useSelector((state) => state.display);
  const [display] = itemDisplay;
  //itemList will hold all items
  const itemsList = useSelector((state) => state.items);
  const [items] = itemsList;
  const tempCategories = [];

  useEffect(() => {
    setLoading(true);
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
    <div className={styles.header2}>
      <button
        onClick={() => {
          filterHandler("All");
        }}
      >
        All
      </button>
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              filterHandler(category);
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
