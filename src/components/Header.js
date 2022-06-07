function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p>Магазин стильных кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30">

          <span className="cu-p" onClick={props.onClickCart}>
            <img
              width={18}
              height={17}
              src="/img/cart.svg"
            />
            2050 руб.</span>
        </li>
        <li>
          <img width={20} height={20} src="/img/user.svg" />
        </li>
      </ul>
    </header>
  )
}

export default Header;