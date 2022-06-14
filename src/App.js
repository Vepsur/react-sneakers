import React from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      try {
        const [cartItemsResp, favoriteItemResp, itemsResp] = await Promise.all([
          axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems'),
          axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/favorites'),
          axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/items'),
        ]);

        setIsLoading(false);
        window.scrollTo(0, 0);
        setCartItems(cartItemsResp.data);
        setFavoriteItems(favoriteItemResp.data);
        setItems(itemsResp.data);
      } catch (error) {
        alert('Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу или повторите позже.');
        console.log('Error in data response');
      }
    }

    fetchData();
  }, []);

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
      console.log("Error in add to cart");
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
      console.log("Error in add to favorite");
    }
  };

  const onRemoveFromCart = async (obj) => {
    try {
      setCartItems(prev => prev.filter(item => item.title !== obj.title));
      await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${obj.id}`);
    } catch (error) {
      alert('Произошла ошибка при удалении товара из корзины. Пожалуйста, обновите страницу или повторите позже.');
      console.log('Error on delete from cart');
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
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
        onAddToCart, onAddToFavorites,
        setCartOpened, setCartItems
      }}>
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveFromCart}
          opened={cartOpened}
        />
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="react-sneakers/"
              element={<Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />}
            />
            <Route
              path="react-sneakers/favorites/"
              element={<Favorites
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
              />}
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



