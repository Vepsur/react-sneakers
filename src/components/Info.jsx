import React from 'react'

import styles from './Drawer/Drawer.module.scss'

const Info = ({ onClose, title, description, image }) => {
  return (
    <>
      <div className={styles.emptyCart}>
        <img width={120} src={image} alt="Empty box" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => onClose(false)} className={styles.greenButton}>
          Вернуться назад<img
            className={styles.arrow}
            src="img/return_arrow.svg"
            alt="Arrow"
          />
        </button>
      </div>
    </>
  )
}

export default Info;