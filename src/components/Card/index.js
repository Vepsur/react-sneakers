import React from 'react';
import styles from './Card.module.scss'

export default function Card({ 
  id, 
  imageUrl, 
  title, 
  price, 
  inCart = false,
  favorited = false, 
  onPlus, 
  onFavorites }) {
  const [isAdded, setIsAdded] = React.useState(inCart);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = (obj) => {
    setIsAdded(!isAdded);
    onPlus(obj);
    // console.log(obj);
  }

  const onClickFavorite = (obj) => {
    setIsFavorite(!isFavorite);
    onFavorites(obj);
    // console.log(obj);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorite ? "/img/heart_checked.svg" : "/img/heart_unchecked.svg"}
          alt="Uliked"
          onClick={() => onClickFavorite({ id, imageUrl, title, price })}
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={() => onClickPlus({ id, imageUrl, title, price })}
          width={32}
          height={32}
          src={isAdded ? "/img/btn_checked.svg" : "/img/btn_unchecked.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}
