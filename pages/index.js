import { useState, useEffect } from "react";
import Header from "../components/Header";
import Items from "../components/Items";
import Categories from "../components/Categories";
import "../styles/Header/Header.module.css";
import "../styles/Items/Items.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItems, addDisplay } from "../redux/actions";

const Home = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const itemDisplay = useSelector((state) => state.display);

  useEffect(() => {
    setLoading(true);
    dispatch(addItems(data));
    dispatch(addDisplay(data));
    setLoading(false);
  }, []);

  return itemDisplay.length ? (
    <div className="page-container">
      <Header />
      <Categories />
      <div className="content">
        <Items />
      </div>
    </div>
  ) : (
    <div>loading</div>
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
