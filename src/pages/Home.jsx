import React from "react";

import AppContext from "../context";
import Card from "../components/Card";

function Home({
  cartItemCheck,
  searchValue,
  setSearchValue,
  onChangeSearchInput
}) {
  const { items, isLoading, favoriteItemCheck } = React.useContext(AppContext);
  const inOrder = false;

  const renderItems = () => {
    const filterItems = items.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      isLoading ? [...Array(12)] : filterItems).map((item, index) => (
        <Card
          inOrder={inOrder}
          cartItemCheck={cartItemCheck}
          favoriteItemCheck={favoriteItemCheck}
          key={`homeCard${index}`}
          {...item}
        />
      ))
  }

  return (
    <div>
      <div className="contentTop">
        <h1 className="">Все кроссовки</h1>
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
      <div className="cardList">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home;