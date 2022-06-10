import React from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const cartItemsResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems');
      const favoriteItemResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/favorites');
      const itemsResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/items');
      setIsLoading(false);

      setCartItems(cartItemsResp.data);
      setFavoriteItems(favoriteItemResp.data);
      setItems(itemsResp.data);
    }

    fetchData();
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToCart = async (obj) => {
    try {
      let item = cartItems.find((item) => item.title === obj.title);
      if (item) {
        setCartItems(prev => prev.filter(item => item.title !== obj.title));
        axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${item.id}`);
      } else {
        const { data } = await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems', obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("Error in add to cart");
    }

  };

  const onAddToFavorites = async (obj) => {
    try {
      let item = favoriteItems.find((favItem) => favItem.title === obj.title);
      if (item) {
        setFavoriteItems(prev => prev.filter(item => item.title !== obj.title)); // ( window.location.href !== 'http://localhost:3000/favorites' ) ?  : item.favorited = false
        axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites/${item.id}`);
      } else {
        const { data } = await axios.post('https://629f57ac8b939d3dc2959500.mockapi.io/favorites', obj);
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("Error in add to favorite");
    }
  };

  const onCartOpened = () => {
    setCartOpened(true);
    axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems')
      .then(res => {
        setCartItems(res.data);
      });
  }

  const onRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${id}`);
  }

  const cartItemCheck = (title) => {
    return cartItems.some(cartItem => cartItem.title === title);
  }

  const favoriteItemCheck = (title) => {
    return favoriteItems.some(favItem => favItem.title === title);
  }

  return (
    <AppContext.Provider
      value={{
        items, cartItems, favoriteItems, isLoading,
        cartItemCheck, favoriteItemCheck, onAddToCart, onAddToFavorites,
        setCartOpened, setCartItems
      }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer
          items={cartItems}
          onRemove={onRemoveFromCart}
        />}
        <Header onClickCart={() => onCartOpened()} />
        <div className="content p-40">
          <Routes>
            <Route
              path="/"
              element={<Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
              />}
            />
            <Route
              path="/favorites"
              element={<Favorites
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
              />}
            />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App;



