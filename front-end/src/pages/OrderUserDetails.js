import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function OrderUserDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState();
  const customerOrder = 'customer_order_details';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    async function requestOrderDetails() {
      const request = await fetch(`http://localhost:3001/sales/${id}`);
      const result = await request.json();
      setOrderDetails(result);
    }

    requestOrderDetails();
  }, []);

  async function makingOrder({ target }) {
    const data = {
      status: target.name,
    };
    const request = await fetch(`http://localhost:3001/sales/${orderDetails.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    setOrderDetails(response);
  }

  function formattedDate(today) {
    const todayFormatted = today.split('T');
    const newDate = new Date(todayFormatted[0]);
    const TEM = 10;
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate() + 1;
    if (dd < TEM) dd = `0${dd}`;
    if (mm < TEM) mm = `0${mm}`;
    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <>
      <NavBar />
      {orderDetails && (
        <main>
          <div>
            <h3 data-testid={ `${customerOrder}__element-order-details-label-order-id` }>
              Pedido
              {orderDetails.id}
            </h3>
            <h3
              data-testid={ `${customerOrder}__element-order-details-label-order-date` }
            >
              {formattedDate(orderDetails?.saleDate)}
            </h3>
            <h3>
              {orderDetails.status}
            </h3>

            <button
              data-testid={ `${customerOrder}__button-dispatch-check` }
              type="button"
              name="Entregue"
              onClick={ (e) => makingOrder(e) }
              disabled={ orderDetails.status !== 'Em Trânsito' }
            >
              MARCAR COMO ENTREGE
            </button>
          </div>
          <table>
            <thead>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </thead>
            <tbody name="tbody">
              {orderDetails.salesPId?.map((sale, idx) => (
                <tr key={ idx + 1 }>
                  <td
                    data-testid={
                      `${customerOrder}__element-order-table-item-number-${
                        idx + 1}`
                    }
                  >
                    {idx + 1}
                  </td>
                  <td
                    data-testid={
                      `${customerOrder}__element-order-table-name-${idx + 1}`
                    }
                  >
                    {sale.SaleProductsProductId.name}
                  </td>
                  <td
                    data-testid={
                      `${customerOrder}__element-order-table-quantity-${idx + 1}`
                    }
                  >
                    {sale.quantity}
                  </td>
                  <td
                    data-testid={
                      `${customerOrder}__element-order-table-unit-price-${idx}`
                    }
                  >
                    {sale.SaleProductsProductId.price.toString().replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `${customerOrder}__element-order-table-unit-price-${idx}`
                    }
                  >
                    {(sale.SaleProductsProductId.price * sale.quantity).toFixed(2)
                      .toString().replace('.', ',')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 data-testid={ `${customerOrder}__element-order-total-price` }>
            {orderDetails.totalPrice.replace('.', ',')}
          </h2>
        </main>)}
    </>
  );
}
