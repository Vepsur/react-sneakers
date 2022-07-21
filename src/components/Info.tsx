import React from 'react';
import ContentLoader from "react-content-loader";
import { Link } from 'react-router-dom';

import AppContext from "../context";

type InfoProps = {
  favoritePage?: boolean;
  isOrdersLoading?: boolean;
}


const Info: React.FC<InfoProps> = React.memo(({ favoritePage, isOrdersLoading }) => {
  const { isLoading } = React.useContext(AppContext);

  const random = (min: number, max: number) => {
    let num = 0;
    num = +(min + (max - min) * Math.random()).toFixed(0);
    return num;
  };

  return (
    <div className='orders'>
      {(isLoading || isOrdersLoading) ? (
        <ContentLoader
          viewBox="0 0 400 160"
          height={160}
          width={400}
          backgroundColor="transparent"
        >
          <circle cx="150" cy="86" r="8" />
          <circle cx="194" cy="86" r="8" />
          <circle cx="238" cy="86" r="8" />
        </ContentLoader>
      ) : (
        <div className="hollowOrders">
          <ul>
            <li>
              <img width={60} src={`img/sad_smile_${random(1, 2)}.png`} alt="SadSmile" />
            </li>
            <li>
              <h2>{favoritePage ? "Избранного нет" : "У вас нет заказов"}</h2>
            </li>
            <li>
              <p>{favoritePage ? "Вы ничего не добавили" : "Закажите свои любимые кроссовки в нашем магазине"}</p>
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
      )}
    </div>
  )
});

export default Info;