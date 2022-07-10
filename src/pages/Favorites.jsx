import React from "react";
import { useSelector } from 'react-redux'

import Info from "../components/Info";
import Card from "../components/Card";
import { Search } from "../components/Search"

function Favorites() {
  const searchValue = useSelector((state) => state.search.value);
  const favorite = useSelector((state) => state.favorite.favorite);
  const cart = useSelector((state) => state.cart.cart);
  const isFlexDisplay = true;

  const cartItemCheck = (title) => {
    return cart.some(cartItem => cartItem.title === title);
  };

  const favoriteItemCheck = (title) => {
    return favorite.some(favItem => favItem.title === title);
  };

  const renderItems = () => {
    const filterItems = favorite.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      filterItems.map((item, index) => (
        <Card
          cartItemCheck={cartItemCheck}
          key={`fav${index}`}
          isFlexDisplay={isFlexDisplay}
          favoriteItemCheck={favoriteItemCheck}
          {...item}
        />
      )))
  };

  return (
    (favorite.length < 1) ? (
      <Info favoritePage={true} />
    ) : (
      <div>
        <div className="contentTop">
          <h1 className="">Избранное</h1>
          <Search />
        </div>
        <div className="orderCardList">
          {renderItems()}
        </div>
      </div>
    ))
};

export default Favorites;