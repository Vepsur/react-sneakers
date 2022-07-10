import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { fetchOrders, fetchCancelOrder, deleteFromOrders } from "../redux/slices/orderSlice";
import Info from "../components/Info";
import Card from "../components/Card";


function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status) === 'success';
  const flexDisplay = true;
  const ordersPage = true;

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const onCancelOrder = (obj) => {
    dispatch(deleteFromOrders(obj))
    dispatch(fetchCancelOrder(obj));
  };

  const renderOrders = () => {
    return (
      (orders.length < 1 || !status) ? (
        <Info ordersPage={ordersPage} />
      ) : (
        <>
          <div>
            <div className="d-flex align-center justify-between mb-40">
              <h1 className="">Мои заказы</h1>
            </div>
          </div>
          {
            orders.map((order, orderIndex) => (
              <div className="ordersList" key={`order${orderIndex}`}>
                <div className="order mb-30 mt-30">
                  <div className="d-flex align-center">
                    <h2 className="mr-20">{!status ? `Заказ ##` : `Заказ #${order.id}`}</h2>
                    <button onClick={() => onCancelOrder(order)} className="greenButton redBtn">Отменить</button>
                  </div>
                  <div className="orderCardList">
                    {
                      order.items.map((item, index) => (
                        <Card
                          inOrder={true}
                          flexDisplay={flexDisplay}
                          key={`order${orderIndex}_card${index}`}
                          {...item}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </>
      ))
  };

  return (
    <>
      {renderOrders()}
    </>
  )
};

export default Orders;