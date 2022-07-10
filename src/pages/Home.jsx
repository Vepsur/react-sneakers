import React from "react";
import { useSelector } from 'react-redux'

import Card from "../components/Card";
import { Search } from "../components/Search"

function Home() {
  const inOrder = false;
  const favorite = useSelector((state) => state.favorite.favorite);
  const items = useSelector((state) => state.sneakers.items);
  const sneakersStatus = useSelector((state) => state.sneakers.status);
  const cartStatus = useSelector((state) => state.cart.status);
  const favoriteStatus = useSelector((state) => state.favorite.status);
  const status = (sneakersStatus === "success") && (favoriteStatus === "success") && (cartStatus === "success");

  const favoriteItemCheck = (title) => {
    return favorite.some(favItem => favItem.title === title);
  };

  const renderItems = () => {
    return (
      !status ? [...Array(12)] : items).map((item, index) => (
        <Card
          inOrder={inOrder}
          favoriteItemCheck={favoriteItemCheck}
          key={`homeCard${index}`}
          {...item}
        />
      ))
  };

  return (
    <div>
      <div className="contentTop">
        <h1>Все кроссовки</h1>
        <Search />
      </div>
      <div className="cardList">
        {renderItems()}
      </div>
    </div>
  )
};

export default Home;