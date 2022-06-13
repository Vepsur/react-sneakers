import React from "react";

import Info from "../components/Info";
import AppContext from "../context";
import Card from "../components/Card";

function Favorites({
  cartItemCheck,
  searchValue,
  setSearchValue,
  onChangeSearchInput
}) {
  const { favoriteItemCheck, favoriteItems } = React.useContext(AppContext);
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
  }

  return (
        (favoriteItems.length < 1) ? (
          <Info
            favoritePage={true}
          />
        ) : (
          <div>
            <div className="contentTop">
              <h1 className="">Избранное</h1>
              <div className="search-block d-flex">
                <img src="img/search.svg" alt="Search" />
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                {searchValue &&
                  <img
                    onClick={() => setSearchValue('')}
                    className="clearBtn cu-p"
                    src="img/remove.svg"
                    alt="Clear"
                  />
                }
              </div>
            </div>
            <div className="orderCardList">
              {renderItems()}
            </div>
          </div>
        ))
}

export default Favorites;