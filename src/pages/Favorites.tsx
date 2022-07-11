import React from "react";
import { useSelector } from 'react-redux'

import Info from "../components/Info";
import AppContext from "../context";
import Card from "../components/Card";
import { Search } from "../components/Search"
import { RootState } from "src/redux/store";

function Favorites() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const { favoriteItems } = React.useContext(AppContext);
  let stub: boolean;
  favoriteItems.length < 4 ? stub = true : stub = false;

  const renderItems = () => {
    const filterItems = favoriteItems.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    filterItems.length < 4 && filterItems.push(...Array(4 - filterItems.length));

    return (
      filterItems.map((item, index) => {
        item ? stub = false : stub = true;

        return (
          <Card
            key={`fav${index}`}
            stub={stub}
            {...item}
          />
        )
      }))
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