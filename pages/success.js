import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { setCart } from "../redux/actions";

const success = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart([]));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <div className="main-container">
          <h1>Thank you for your purchase!</h1>
        </div>
      </div>
    </>
  );
};

export default success;
