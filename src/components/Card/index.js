import React from 'react';
import styles from './Card.module.scss'

export default function Card({ image, title, price, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ image, title, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorite ? "/img/heart_checked.svg" : "/img/heart_unchecked.svg"}
          alt="Uliked"
          onClick={onClickFavorite}
        />
      </div>
      <img width={133} height={112} src={image} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          width={32}
          height={32}
          src={isAdded ? "/img/btn_checked.svg" : "/img/btn_unchecked.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}
