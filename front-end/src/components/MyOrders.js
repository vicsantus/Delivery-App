import { useContext } from 'react';
import DeliveryContext from '../context/DeliveryContext';

export default function MyOrders() {
  const { finalizeOrder } = useContext(DeliveryContext);
  console.log(finalizeOrder);
  return (
    <div>
      my orders
      {/* {finalizeOrder.map((order) => (
        <p key={ order.id }>{order.id}</p>
      ))} */}
    </div>

  );
}
