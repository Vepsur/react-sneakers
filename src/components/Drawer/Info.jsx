import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Drawer.module.scss';
import { setCartOpened } from "../../redux/slices/cartSlice";

const Info = ({ title, description, image }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.emptyCart}>
        <img width={120} src={image} alt="Empty box" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => dispatch(setCartOpened(false))} className={styles.greenButton}>
          Вернуться назад<img
            className={styles.arrow}
            src="img/return_arrow.svg"
            alt="Arrow"
          />
        </button>
      </div>
    </>
  )
};

export default Info;