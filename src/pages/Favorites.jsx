import React from "react";

import Info from "../components/Info";
import AppContext from "../context";
import Card from "../components/Card";
import { Search } from "../components/Search"

function Favorites({
  searchValue,
  setSearchValue,
  onChangeSearchInput
}) {
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
          <Search
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="orderCardList">
          {renderItems()}
        </div>
      </div>
    ))
};

export default Favorites;