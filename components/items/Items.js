import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setFavorite } from "../../redux/actions";
import { Flex } from "@chakra-ui/react";

const Items = () => {
  const [refresh, setRefresh] = useState(false);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  //Get collection of items from REDUX Store
  const itemDisplay = useSelector((state) => state.display);
  const [display] = itemDisplay;

  useEffect(() => {
    //Check cart LocalStorage for cart history, set it as current REDUX Cart Store
    const cartHistoryCheck = () => {
      if (localStorage.getItem("cart")) {
        JSON.parse(localStorage.getItem("cart")).length
          ? dispatch(setCart(JSON.parse(localStorage.getItem("cart"))))
          : "";
      }
    };
    //Check user's favorite LocalStorage for favorite history, set as current REDUX Favorite Store
    const userFavoriteHistoryCheck = () => {
      user && JSON.parse(localStorage.getItem(user.name))
        ? dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))))
        : "";
    };
    cartHistoryCheck();
    userFavoriteHistoryCheck();
  }, [user, refresh, dispatch]);

  return (
    <Flex wrap="wrap" gap={18} width="90%" p={15} rounded={15} mb={10} mt={75}>
      {display.map((item) => {
        const { id } = item;
        return (
          <Item
            key={id}
            item={item}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        );
      })}
    </Flex>
  );
};

export default Items;
