import React from "react";

import Card from "../components/Card";

const Home = ({ 
  items, 
  searchValue,
  setSearchValue,
  onPlus, 
  onFavorites, 
  onChangeSearchInput 
}) => {
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
        {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
          <Card
            key={item.imageUrl}
            onFavorites={onFavorites}
            onPlus={onPlus}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;