import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from "axios";

import { fetchSneakers, Item } from './redux/slices/itemsSlice'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";
import { RootState, useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = React.useState<Item[]>([]);
  const [favoriteItems, setFavoriteItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const {items} = useSelector((state: RootState) => state.sneakers);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [cartItemsResp, favoriteItemResp] = await Promise.all([
          axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems'),
          axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/favorites'),
        ]);

        setCartItems(cartItemsResp.data);
        setFavoriteItems(favoriteItemResp.data);
        setIsLoading(false);
      } catch (error) {
        alert('Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу или повторите позже.');
        console.log('Error in data response', error);
      }
    }

    fetchData();
  }, []);

  React.useEffect(() => {

    const search = searchValue ? `?title=${searchValue}` : '';
    dispatch(fetchSneakers(search));

  }, [searchValue, dispatch]);

  const onAddToCart = async (obj: Item) => {
    try {
      let item = cartItems.find((item) => item.title === obj.title);
      if (item) {
        setCartItems(prev => prev.filter(item => item.title !== obj.title));
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${item.id}`);
      } else {
        setCartItems((prev) => {
          prev.length > 0 ? obj.id = `${+prev[prev.length - 1].id + 1}` : obj.id = "1";
          return [...prev, obj]
        });
        await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems', obj);
      }
    } catch (error) {
      alert("Произошла ошибка при добавлении товара в корзину. Пожалуйста, обновите страницу или повторите позже.");
      console.log("Error in add to cart", error);
    }
  };

  const onAddToFavorites = async (obj: Item) => {
    try {
      let item = favoriteItems.find((favItem) => favItem.title === obj.title);
      if (item) {
        setFavoriteItems(prev => prev.filter(item => item.title !== obj.title));
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites/${item.id}`);
      } else {
        setFavoriteItems((prev) => {
          prev.length > 0 ? obj.id = `${+prev[prev.length - 1].id + 1}` : obj.id = "1";
          return [...prev, obj]
        });
        console.log(obj);
        await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/favorites', obj);
      }
    } catch (error) {
      alert("Произошла ошибка при добавлении товара в избранное. Пожалуйста, обновите страницу или повторите позже.");
      console.log("Error in add to favorite", error);
    }
  };

  const onRemoveFromCart = async (obj: Item) => {
    try {
      setCartItems(prev => prev.filter(item => item.title !== obj.title));
      await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${obj.id}`);
    } catch (error) {
      alert('Произошла ошибка при удалении товара из корзины. Пожалуйста, обновите страницу или повторите позже.');
      console.log('Error on delete from cart', error);
    }
  };

  const cartItemCheck = (title: string): boolean => {
    return cartItems.some(cartItem => cartItem.title === title);
  };

  const favoriteItemCheck = (title: string): boolean => {
    return favoriteItems.some(favItem => favItem.title === title);
  };

  return (
    <AppContext.Provider
      value={{
        items, cartItems, favoriteItems, isLoading,
        cartItemCheck, favoriteItemCheck,
        onAddToCart, onAddToFavorites, setCartItems
      }}>
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveFromCart}
        />
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
    </AppContext.Provider>
  )
};

export default App;



