import { useSelector } from "react-redux";
import Header from "../components/Header";
import "../styles/Header/Header.module.css";

const favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  return (
    <div className="page-container">
      <Header />
      {favorites.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default favorites;
