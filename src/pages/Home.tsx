import React from "react";
import { useSelector } from 'react-redux'
// import { useWhyDidYouUpdate } from 'ahooks';

import AppContext from "../context";
import Card from "../components/Card";
import { Search } from "../components/Search"
import { RootState } from "src/redux/store";

const Home = React.memo(() => {
  let { isLoading } = React.useContext(AppContext);
  let { items, itemsRespStatus } = useSelector((state: RootState) => state.sneakers);

  const renderItems = React.useCallback(() => {
    let stub: boolean;
    let loading: boolean = isLoading || itemsRespStatus !== 'success';

    return (
      loading ? [...Array(8)] : items).map((item, index) => {
        item || loading ? stub = false : stub = true;

        return (
          <Card
            stub={stub}
            key={`homeCard${index}`}
            {...item}
          />
        )
      })
  }, [items, itemsRespStatus, isLoading]);

  // useWhyDidYouUpdate('Home', { items, isLoading, itemsRespStatus, renderItems, AppContext });

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
});

export default Home;