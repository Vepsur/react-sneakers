import React from "react";
import axios from "axios";

import Info from "../components/Info";
import Card from "../components/Card";
import { Item } from "src/redux/slices/itemsSlice";

type OrderItems = {
  id: string;
  items: Item[];
};

const Orders: React.FC = React.memo(() => {
  const [orders, setOrders] = React.useState<OrderItems[]>([]);
  let stub: boolean;
  const inOrder = true;
  const [isOrdersLoading, setIsOrdersLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (
      async () => {
        try {
          setIsOrdersLoading(true);
          const ordersResp = await axios.get('https://629f57ac8b939d3dc2959500.mockapi.io/orders');
          setOrders(ordersResp.data);
        } catch (error) {
          alert('Произошла ошибка при загрузке страницы заказов. Пожалуйста, обновите страницу или повторите позже.');
          console.log('Eror on load orders page', error);
        };
        setIsOrdersLoading(false);
      })();
  }, []);

  const onCancelOrder = async (id: string) => {
    try {
      setIsOrdersLoading(true);
      setOrders(prev => prev.filter(order => order.id !== id));
      await axios.delete(`https://629f57ac8b939d3dc2959500.mockapi.io/orders/${id}`);
    } catch (error) {
      alert('Произошла ошибка при отмене заказа. Пожалуйста, обновите страницу или повторите позже.')
      console.log("Error in cancel order operation", error);
    };
    setIsOrdersLoading(false);
  };

  const renderOrders = () => {
    return (
      (orders.length < 1) ? (
        <Info
          isOrdersLoading={isOrdersLoading}
          favoritePage={false}
        />
      ) : (
        <>
          <div>
            <div className="d-flex align-center justify-between mb-40">
              <h1 className="">Мои заказы</h1>
            </div>
          </div>
          {
            orders.map((order, orderID) => {
              order.items.length < 4 && order.items.push(...Array(4 - order.items.length));

              return (
                <div className="ordersList" key={`order${orderID}`}>
                  <div className="order mb-30 mt-30">
                    <div className="d-flex align-center">
                      <h2 className="mr-20">{`Заказ #${order.id}`}</h2>
                      <button onClick={() => onCancelOrder(order.id)} className="greenButton redBtn">Отменить</button>
                    </div>
                    <div className="orderCardList">
                      {
                        order.items.map((item, index) => {
                          item ? stub = false : stub = true;
                          return (
                          <Card
                            inOrder={inOrder}
                            stub={stub}
                            key={`order${orderID}_card${index}`}
                            {...item}
                          />
                        )})
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </>
      ))
  };

  return (
    <>
      {renderOrders()}
    </>
  )
});

export default Orders;