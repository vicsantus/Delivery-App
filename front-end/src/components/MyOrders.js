import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  function formattedDate(today) {
    const todayFormatted = today.split('T');
    const newDate = new Date(todayFormatted[0]);
    const TEM = 10;
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate();
    if (dd < TEM) dd = `0${dd}`;
    if (mm < TEM) mm = `0${mm}`;
    return `${dd}/${mm}/${yyyy}`;
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    const newUser = JSON.parse(user);
    console.log(newUser);

    async function getOrders() {
      const request = await fetch(`http://localhost:3001/sales/orderUser/${newUser.id}`);
      const response = await request.json();

      if (response.message === 'User without orders') return setOrders([]);
      console.log(response);
      return setOrders(response);
    }

    getOrders();
  }, []);

  return (
    <div>
      {orders.length !== 0 ? orders.map((order) => (
        <Button
          onClick={ () => history.push(`/customer/orders/${order.id}`) }
          key={ order.id }
        >
          <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
            {order.id}

          </p>
          <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
            {order.status}

          </p>
          <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
            {formattedDate(order.saleDate)}

          </p>
          <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
            {order.totalPrice.toString().replace('.', ',')}

          </p>
        </Button>
      ))
        : <h2>Você não tem nenhum pedido</h2>}
    </div>

  );
}
