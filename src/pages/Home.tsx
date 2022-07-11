import React from "react";
import { useSelector } from 'react-redux'


import AppContext from "../context";
import Card from "../components/Card";
import { Search } from "../components/Search"
import { RootState } from "src/redux/store";

function Home() {
  const { items, isLoading, favoriteItemCheck } = React.useContext(AppContext);
  const inOrder = false;
  const { itemsRespStatus } = useSelector((state: RootState) => state.sneakers);

  const renderItems = () => {
    return (
      isLoading || itemsRespStatus !== 'success' ? [...Array(12)] : items).map((item, index) => (
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