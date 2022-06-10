import React from "react";

import AppContext from "../context";
import Card from "../components/Card";

function Favorites({
  searchValue,
  setSearchValue,
  onChangeSearchInput
}) {
  const { favoriteItems, isLoading } = React.useContext(AppContext);

  const renderItems = () => {
    const filterItems = favoriteItems.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      isLoading ? [...Array(4)] : filterItems).map((item, index) => (
        <Card
          key={index}
          {...item}
        />
      ))
  }

  return (
    <div>
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">Избранное</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          {searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className="clearBtn cu-p"
              src="/img/remove.svg"
              alt="Clear"
            />
          }
        </div>
      </div>
      <div className="cardList">
        {renderItems()}
      </div>
    </div>
  )
}

export default Favorites;