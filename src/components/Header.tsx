import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useWhyDidYouUpdate } from 'ahooks';

import { setCartOpened } from '../redux/slices/cartSlice';
import { useCart } from '../hooks/useCart';

const Header = React.memo(() => {
  const dispatch = useDispatch();
  let { totalPrice } = useCart();
  
  useWhyDidYouUpdate('Header', { totalPrice, dispatch, setCartOpened, useCart, useDispatch });

  return (
    <header className="d-flex justify-between align-center">
      <Link to={"/react-sneakers/"} className="d-flex align-center" >
        <img width={40} height={40} src="img/logo.png" alt="Logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <h4 className="text-uppercase">RS</h4>
          <p>Магазин стильных кроссовок</p>
        </div>
      </Link>
      <ul className="d-flex">
        <li className={(totalPrice > 0) ? "cartBlock greenBackground" : "cartBlock"} onClick={() => dispatch(setCartOpened(true))}>
          <span>
            {totalPrice} руб.
          </span>
          <img
            width={26}
            height={25}
            src="img/cart.svg"
            alt="Cart"
          />
        </li>
        <li>
          <Link to={"react-sneakers/favorites"}>
            <img width={25} height={25} src="img/favorites_unsaved.svg" alt="Favorites" />
          </Link>
        </li>
        <li>
          <Link to={"react-sneakers/orders"}>
            <img width={25} height={25} src="img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
});

export default Header;