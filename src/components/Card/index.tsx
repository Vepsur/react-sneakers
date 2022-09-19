import React from 'react';
import ContentLoader from "react-content-loader";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store';

import AppContext from '../../context';
import styles from './Card.module.scss';

type CardProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  inOrder?: boolean;
  stub: boolean;
};

/* const a: Pick<CardProps, "id" | "stub"> = {
  id: 1,
  stub: false
} */

const Card: React.FC<CardProps> = React.memo(({ id, imageUrl, title, price, inOrder, stub }) => {
  const { cartItemCheck, favoriteItemCheck, onAddToCart, onAddToFavorites, isLoading } = React.useContext(AppContext);
  const { itemsRespStatus } = useSelector((state: RootState) => state.sneakers);

  return (
    <div className='d-flex justify-center'>
      <div className={stub ? `${styles.card} ${styles.invisibleStub}` : styles.card}>
        {(isLoading || itemsRespStatus !== 'success')
          ? (
            <ContentLoader
              speed={2}
              width={180}
              height={220}
              viewBox="0 0 150 180"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
              <rect x="0" y="120" rx="5" ry="5" width="93" height="15" />
              <rect x="118" y="148" rx="10" ry="10" width="32" height="32" />
              <rect x="0" y="155" rx="10" ry="10" width="80" height="25" />
              <rect x="0" y="0" rx="5" ry="5" width="150" height="90" />
            </ContentLoader>
          ) : (
            <>
              {!inOrder && favoriteItemCheck &&
                (<div className={styles.card__favorite}>
                  <img
                    src={favoriteItemCheck(title) ? "img/heart_checked.svg" : "img/heart_unchecked.svg"}
                    alt="Uliked"
                    onClick={() => onAddToFavorites({ id, imageUrl, title, price })}
                  />
                </div>)}
              <Link to={`/react-sneakers/sneakers/${id}`}>
                <img width={133} src={imageUrl} alt="Sneakers" />
                <h5>{title}</h5>
              </Link>
              <div className="d-flex justify-between align-center">
                <div className={styles.card__cardInfo}>
                  <span>Цена:</span>
                  <b>{price} руб.</b>
                </div>
                {!inOrder && cartItemCheck &&
                  (<img
                    className={styles.card__plus}
                    onClick={() => onAddToCart({ id, imageUrl, title, price })}
                    width={32}
                    height={32}
                    src={cartItemCheck(title) ? "img/btn_checked.svg" : "img/btn_unchecked.svg"}
                    alt="Plus"
                  />)}
              </div>
            </>)
        }
      </div>
    </div>
  );
});

export default Card;