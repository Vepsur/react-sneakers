import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { fetchSneakers } from './redux/slices/itemsSlice'
import { fetchCart } from './redux/slices/cartSlice'
import { fetchFavorite } from './redux/slices/favoriteSlice'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.searchValue);
  const firstRender = useSelector((state) => state.sneakers.firstRender);

  React.useEffect(() => {
    async function fetchData() {
      if (firstRender) {
        await dispatch(fetchCart());
        await dispatch(fetchFavorite());
      }

      const search = `?title=${searchValue}`;
      // window.scrollTo(0, 0);
      await dispatch(fetchSneakers(search));
    }
    fetchData();
  }, [searchValue]);

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="react-sneakers/"
            element={<Home />}
          />
          <Route
            path="react-sneakers/favorites/"
            element={<Favorites />}
          />
          <Route
            path="react-sneakers/orders/"
            element={<Orders />}
          />
        </Routes>
      </div>
    </div>
  )
};

export default App;



