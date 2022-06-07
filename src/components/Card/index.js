import React from 'react';
import styles from './Card.module.scss'

export default function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
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
      <img width={133} height={112} src={props.image} alt="Sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} руб.</b>
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
