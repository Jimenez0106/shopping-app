import styles from "../styles/Items/Items.module.css";
import Item from "./Item";
import { useSelector } from "react-redux";

const Items = () => {
  const itemDisplay = useSelector((state) => state.display);
  const [display] = itemDisplay;

  return (
    <section className={styles.container}>
      {display.map((item) => {
        const { id } = item;
        return <Item key={id} item={item} />;
      })}
    </section>
  );
};

export default Items;
