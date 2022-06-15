import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";

import { fetchSneakers } from './redux/slices/itemsSlice'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const searchValue = useSelector((state) => state.search.searchValue);
  const {items, status} = useSelector((state) => state.sneakers);

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

    const search = searchValue ? `?search=${searchValue}` : '';

      // window.scrollTo(0, 0);

      dispatch(fetchSneakers(search));

  }, [searchValue]);

  const onAddToCart = async (obj) => {
    try {
      let item = cartItems.find((item) => item.title === obj.title);
      if (item) {
        setCartItems(prev => prev.filter(item => item.title !== obj.title));
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${item.id}`);
      } else {
        setCartItems((prev) => {
          prev.length > 0 ? obj.id = prev.length + 1 : obj.id = 1;
          return [...prev, obj]
        });
        await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems', obj);
      }
    } catch (error) {
      alert("Произошла ошибка при добавлении товара в корзину. Пожалуйста, обновите страницу или повторите позже.");
      console.log("Error in add to cart", error);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      let item = favoriteItems.find((favItem) => favItem.title === obj.title);
      if (item) {
        setFavoriteItems(prev => prev.filter(item => item.title !== obj.title));
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites/${item.id}`);
      } else {
        setFavoriteItems((prev) => {
          prev.length > 0 ? obj.id = prev.length + 1 : obj.id = 1;
          return [...prev, obj]
        });
        await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/favorites', obj);
      }
    } catch (error) {
      alert("Произошла ошибка при добавлении товара в избранное. Пожалуйста, обновите страницу или повторите позже.");
      console.log("Error in add to favorite", error);
    }
  };

  const onRemoveFromCart = async (obj) => {
    try {
      setCartItems(prev => prev.filter(item => item.title !== obj.title));
      await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${obj.id}`);
    } catch (error) {
      alert('Произошла ошибка при удалении товара из корзины. Пожалуйста, обновите страницу или повторите позже.');
      console.log('Error on delete from cart', error);
    }
  };

  const cartItemCheck = (title) => {
    return cartItems.some(cartItem => cartItem.title === title);
  };

  const favoriteItemCheck = (title) => {
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



