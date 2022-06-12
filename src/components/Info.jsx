import React from 'react'

import { Link } from 'react-router-dom';

function random(min, max) {
  let num = 0;
  return num = +(min + (max - min) * Math.random()).toFixed(0);
}

const Info = ({ favoritePage }) => {
  return (
    <div className='orders'>
      <div className="hollowOrders">
        <ul>
          <li>
            <img width={60} src={`img/sad_smile_${random(1, 2)}.png`} alt="SadSmile" />
          </li>
          <li>
            <h2>{favoritePage ? "Избранного нет" : "У вас нет заказов"}</h2>
          </li>
          <li>
            <p>{favoritePage ? "Вы ничего не добавили" : "Закажите свои любимые кроссовки"}</p>
          </li>
          <li>
            <Link to={"/react-sneakers/"}>
              <button className="greenButton">
                На главную <img src="img/return_arrow.svg" alt="Arrow" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Info;