import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/react-sneakers"} className="d-flex align-center" >
        <img width={40} height={40} src={window.location.origin + "./public/img/logo.png"} alt="Logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p>Магазин стильных кроссовок</p>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30">

          <span className="cu-p" onClick={props.onClickCart}>
            <img
              width={26}
              height={25}
              src="/img/cart.svg"
              alt="Cart"
            />
            {totalPrice} руб.</span>
        </li>
        <li className="cu-p mr-20">
          <Link to={"react-sneakers/favorites"}>
            <img width={25} height={25} src="/img/favorites_unsaved.svg" alt="Favorites" />
          </Link>
        </li>
        <li className="cu-p">
          <Link to={"react-sneakers/orders"}>
            <img width={25} height={25} src="/img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header;