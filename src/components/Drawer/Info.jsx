import React from 'react';
import AppContext from '../../context';

import styles from './Drawer.module.scss';

const Info = ({ title, description, image }) => {
  const {setCartOpened} = React.useContext(AppContext);

  return (
    <>
      <div className={styles.emptyCart}>
        <img width={120} src={image} alt="Empty box" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
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