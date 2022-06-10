import React from "react";

import AppContext from "../context";
import Card from "../components/Card";

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput
}) {
  const { items, isLoading } = React.useContext(AppContext);

  const renderItems = () => {
    const filterItems = items.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      isLoading ? [...Array(12)] : filterItems).map((item, index) => (
        <Card
          key={index}
          {...item}
        />
      ))
  }

  return (
    <div>
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">Все кроссовки</h1>
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

export default Home;