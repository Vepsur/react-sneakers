import React from "react";
import Info from "./Info";
import { useSelector, useDispatch } from "react-redux";

import { fetchDeleteFromCart, deleteFromCart, setTotalPrice, cleaneCart } from '../../redux/slices/cartSlice'
import { setCartOpened } from "../../redux/slices/cartSlice";
import { fetchCreateOrder, setCompleteStatus } from "../../redux/slices/orderSlice";

import styles from './Drawer.module.scss';

const Drawer = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartOpened = useSelector((state) => state.cart.opened);
  const { lastOrderId } = useSelector((state) => state.orders);
  const completeStatus = useSelector((state) => state.orders.completeStatus);
  const cleanStatus = useSelector((state) => state.cart.cleanStatus);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const findItemByTitle = (item, arr) => arr.find((obj) => item.title === obj.title);

  const onClickOrder = async () => {
    dispatch(setCompleteStatus('creating'))
    await dispatch(fetchCreateOrder(cart));

    // Костыль для удаления в mockAPI
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      await dispatch(fetchDeleteFromCart(item));
    };

    dispatch(cleaneCart());
    dispatch(setTotalPrice());
    dispatch(setCompleteStatus('success'));
  };

  const onClickRemove = (obj) => {
    const item = findItemByTitle(obj, cart);
    dispatch(deleteFromCart(item));
    dispatch(setTotalPrice());
    dispatch(fetchDeleteFromCart(item));
  };




  return (
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ''}`}>
      <div onClick={() => dispatch(setCartOpened(false))} className={styles.shading}></div>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={() => dispatch(setCartOpened(false))} className={styles.removeBtn} src="img/remove.svg" alt="Close" />
        </h2>
        {(cart && cart.length > 0) ? (
          <>
            <div className={styles.items}>
              {cart.map((obj, index) => (
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
                    onClick={() => onClickRemove(obj)}
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
              <button disabled={completeStatus === 'creating'} onClick={onClickOrder} className={styles.greenButton}>
                Оформить заказ <img src="img/checkout_arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={cleanStatus === 'empty' ? `Заказ #${lastOrderId} оформлен` : "Корзина пуста"}
            description={
              cleanStatus === 'empty' ?
                `Cкоро он будет передан курьерской доставке. Не беспокойтесь, Ваш адрес мы вычислим по IP :)` :
                "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={cleanStatus === 'empty' ? "img/complete_order.png" : "img/empty_cart.png"}
          />
        )}
      </div>
    </div>
  )
};

export default Drawer;