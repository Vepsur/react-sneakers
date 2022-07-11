import React from "react";

import AppContext from "../context";

export const useCart = () => {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);

  return { totalPrice };
};

