import React from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { async } from "q";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  // const [itemAdded, setItemAdded] = React.useContext(true);

  React.useEffect(() => {
    axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/items')
      .then(res => {
        setItems(res.data);
      });
    axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/cartItems')
      .then(res => {
        setCartItems(res.data);
      });
    axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/favorites')
      .then(res => {
        setFavoriteItems(res.data);
        // setItems(refresh(items, cartItems, favoriteItems));
      });
    // const refresh = (items, cartItems, favoriteItems) => {
    //   for (let item of items) {
    //     cartItems.find(cartItem => item.title === cartItem.title) ? items.inCart = true : item.inCart = false;
    //     favoriteItems.find(favItem => item.title === favItem.title) ? item.favorited = true : item.favorited = false;
    //   }
    // }
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    console.log(items[0].inCart);
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
        setFavoriteItems(prev => prev.filter(item => item.title !== obj.title));
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

  // const onRemoveFromFavorites = (id) => {
  //   axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/favorites/${id}`);
  // }


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer
        items={cartItems}
        onClickClose={() => setCartOpened(false)}
        onRemove={onRemoveFromCart}
      />}
      {/*=== {cartOpened ? <Drawer onClickClose={() => setCartOpened(false)}/> : null}*/}
      <Header onClickCart={() => onCartOpened()} />
      <div className="content p-40">
        <Routes>
          <Route
            path="/" exact
            element={<Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setFavoriteItems={setFavoriteItems}
              onChangeSearchInput={onChangeSearchInput}
              onPlus={onAddToCart}
              onFavorites={onAddToFavorites}
            />}
          />
          <Route
            path="/favorites"
            element={<Favorites
              items={favoriteItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onPlus={onAddToCart}
              onFavorites={onAddToFavorites}
            />}
          />
        </Routes>
      </div>

    </div>
  )
}

export default App;



