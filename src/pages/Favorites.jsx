import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import Info from "../components/Info";
import AppContext from "../context";
import Card from "../components/Card";
import { Search } from "../components/Search"

function Favorites() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.value);
  const { cartItemCheck, favoriteItemCheck, favoriteItems } = React.useContext(AppContext);
  const isFlexDisplay = true;

  const renderItems = () => {
    const filterItems = favoriteItems.filter(item =>
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
    (favoriteItems.length < 1) ? (
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