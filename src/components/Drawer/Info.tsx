import React from 'react';
import { useDispatch } from "react-redux";

import styles from './Drawer.module.scss';
import { setCartOpened } from "../../redux/slices/cartSlice";
import { Button } from '../Button/Button';

type InfoProps = {
  title: string;
  description: string;
  image: string;
}

const Info: React.FC<InfoProps> = React.memo(({ title, description, image }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.emptyCart}>
        <img width={120} src={image} alt="Empty box" />
        <h2>{title}</h2>
        <p>{description}</p>
        <Button
          arrow
          arrowLeft
          onClick={() => dispatch(setCartOpened(false))}
          widthFull
          size="large"
        >
          Вернуться назад
        </Button>
      </div>
    </>
  )
});

export default Info;