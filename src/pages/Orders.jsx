import React from "react";
import axios from "axios";

import Info from "../components/Info";
import Card from "../components/Card";


function Orders() {
  const [orders, setOrders] = React.useState([]);
  const inOrder = true;
  const [isOrdersLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (
      async () => {
        try {
          setIsLoading(true);
          const ordersResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/orders');
          setOrders(ordersResp.data);
        } catch (error) {
          console.log('Eror on load orders page');
        }
        setIsLoading(false);
      })();
  }, []);

  const onCancelOrder = async (id) => {
    try {
        setOrders(prev => prev.filter(order => order.id !== id));
        await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/orders/${id}`);
    } catch (error) {
      alert('Произошла ошибка при отмене заказа. Пожалуйста, повторите позже.')
      console.log("Error in cancel order operation");
    }
  };

  const renderOrders = () => {
    return (
      (orders.length < 1) ? (
        <Info />
      ) : (
        orders.map((order, orderID) => (
          <div key={`order${orderID}`}>
            <div className="d-flex align-center justify-between mb-40">
              <h1 className="">Мои заказы</h1>
            </div>
            <div className="ordersList">
              <div className="order mb-30 mt-30">
                <div className="d-flex align-center">
                  <h2 className="mr-20">{isOrdersLoading ? `Заказ ##` : `Заказ #${order.id}`}</h2>
                  <button onClick={() => onCancelOrder(order.id)} className="redButton">Отменить</button>
                </div>
                <div className="orderCardList">
                  {
                    order.items.map((item, index) => (
                      <Card
                        isOrdersLoading={isOrdersLoading}
                        inOrder={inOrder}
                        key={`order${orderID}_card${index}`}
                        {...item}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ))))
  }

  return (
    <>
      {renderOrders()}
    </>
  )
}

export default Orders;