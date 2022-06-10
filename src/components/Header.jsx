import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/"} className="d-flex align-center" >
        <img width={40} height={40} src="/img/logo.png" alt="Logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p>Магазин стильных кроссовок</p>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30">

          <span className="cu-p" onClick={props.onClickCart}>
            <img
              width={18}
              height={17}
              src="/img/cart.svg"
              alt="Cart"
            />
            2050 руб.</span>
        </li>
        <li className="cu-p mr-20">
          <Link to={"/favorites"}>
            <img width={20} height={20} src="/img/favorites_unsaved.svg" alt="Favorites" />
          </Link>
        </li>
        <li className="cu-p">
          <img width={20} height={20} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  )
}

export default Header;