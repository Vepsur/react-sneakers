import React from "react";
import axios from "axios";

import Info from "../components/Info";
import Card from "../components/Card";


function Orders() {
  const [orders, setOrders] = React.useState([]);
  const flexDisplay = true;
  const [isOrdersLoading, setIsOrdersLoading] = React.useState(true);

  React.useEffect(() => {
    (
      async () => {
        try {
          setIsOrdersLoading(true);
          const ordersResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/orders');
          setOrders(ordersResp.data);
        } catch (error) {
          console.log('Произошла ошибка при загрузке страницы заказов. Пожалуйста, повторите позже.');
          console.log('Eror on load orders page');
        };
        setIsOrdersLoading(false);
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
        <Info isOrdersLoading={isOrdersLoading}/>
      ) : (
        <>
          <div>
            <div className="d-flex align-center justify-between mb-40">
              <h1 className="">Мои заказы</h1>
            </div>
          </div>
          {
            orders.map((order, orderID) => (
              <div className="ordersList" key={`order${orderID}`}>
                <div className="order mb-30 mt-30">
                  <div className="d-flex align-center">
                    <h2 className="mr-20">{isOrdersLoading ? `Заказ ##` : `Заказ #${order.id}`}</h2>
                    <button onClick={() => onCancelOrder(order.id)} className="greenButton redBtn">Отменить</button>
                  </div>
                  <div className="orderCardList">
                    {
                      order.items.map((item, index) => (
                        <Card
                          flexDisplay={flexDisplay}
                          key={`order${orderID}_card${index}`}
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