import React from "react";
import axios from "axios";

import Card from "../components/Card";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const inOrder = true;

  React.useEffect(() => {
    (
      async () => {
        try {
          const ordersResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/orders');
          setOrders(ordersResp.data);
        } catch (error) {
          console.log('Eror on load orders page');
        }
    })();
  }, []);

  const renderOrders = () => {
    return (
      orders.map((order, orderID) => (
        <>
          <div className="order mb-30 mt-30" key={"order" + orderID}>
            <h2>Заказ #{order.id}</h2>
            <div className="orderCardList">
              {
                order.items.map((item, index) => (
                  <Card
                    inOrder={inOrder}
                    key={`order${orderID}_card${index}`}
                    {...item}
                  />
                ))
              }
            </div>
          </div>
        </>
      )))
  }

  return (
    <>
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">Мои заказы</h1>
      </div>
      <div className="ordersList">
        {renderOrders()}
      </div>
    </>
  )
}

export default Orders;