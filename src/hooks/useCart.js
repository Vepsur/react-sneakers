import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import AppContext from "../context";



export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

  return { totalPrice };
};

