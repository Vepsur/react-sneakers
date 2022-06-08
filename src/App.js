import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  // const [itemAdded, setItemAdded] = React.useContext(true);

  React.useEffect(() => {
    fetch('https://629f57ac8b939d3dc2959500.mockapi.io/items')
      .then(res => {
        return res.json();
      }).then(json => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    // setCartItems([...cartItems, obj]); !!! bad practice
    setCartItems(prev => {
        let check = false;
        let counter = 0;
        let cartArr = prev.slice();
        let refresh = false;

        for (let item of prev) {
          item.title === obj.title ? check = counter : check = false;
          if (check !== false) {
            cartArr.splice(check, 1);
            counter--;
            refresh = true;
          }
          counter++;
        }
        
        if (refresh) {
          if (cartArr.length === 0) {
            return [];
          }
          return cartArr;
        } else {
          return [...prev, obj];
        }
    }); // !!! good practice, dont allow to lost data

  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClickClose={() => setCartOpened(false)} />}
      {/*=== {cartOpened ? <Drawer onClickClose={() => setCartOpened(false)}/> : null}*/}
      <Header
        onClickCart={() => setCartOpened(true)}
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              image={item.imageUrl}
              onClickFavorite={() => console.log('Add to favorite')}
              onPlus={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default App;



