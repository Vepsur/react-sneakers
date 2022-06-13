import React from "react";
import Info from "./Info";
import axios from "axios";

import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ opened, onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://629f57ac8b939d3dc2959500.mockapi.io/orders`, { items: cartItems });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      // Костыль для удаления в mockAPI
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/cartItems/${item.id}`);
        await delay(500);
      };

    } catch (error) {
      alert('Произошла ошибка создании заказа. Пожалуйста, повторите позже.');
      console.log('Error in creating order');
    };
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div onClick={() => onClose()} className={styles.shading}></div>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={() => onClose()} className={styles.removeBtn} src="img/remove.svg" alt="Close" />
        </h2>
        {(items.length > 0) ? (
          <>
            <div className={styles.items}>
              {items.map((obj, index) => (
                <div key={`cartItem${index}`} className={`${styles.cartItem} d-flex align-center"`}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className={styles.cartItemImg}>
                  </div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj)}
                    className={styles.removeBtn}
                    src="img/remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 5) / 100} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                Оформить заказ <img src="img/checkout_arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            onClose={onClose}
            title={isOrderComplete ? `Заказ #${orderId} оформлен` : "Корзина пуста"}
            description={
              isOrderComplete ?
                `Cкоро он будет передан курьерской доставке. Не беспокойтесь, Ваш адрес мы вычислим по IP :)` :
                "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "img/complete_order.png" : "img/empty_cart.png"}
          />
        )}
      </div>
    </div>
  )
};

export default Drawer;