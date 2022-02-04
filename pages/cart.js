import Header from "../components/Header";
import { useSelector } from "react-redux";
import "../styles/Header/Header.module.css";

const cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="page-container">
      <Header />
      {cart.map((item, id) => {
        return <div key={id}>{item.title}</div>;
      })}
    </div>
  );
};

export default cart;
