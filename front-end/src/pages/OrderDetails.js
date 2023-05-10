import React, { useContext, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DeliveryContext from '../context/DeliveryContext';

export default function OrderDetails() {
  // const history = useHistory();
  // const { location: { pathname } } = history;
  const { orderDetails } = useContext(DeliveryContext);
  const [sales, setSales] = useState([]);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // async function requestSales() {
  //   setSales(orderDetails.salesPId);
  // }

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
    const response = await request.text();
    console.log(response);
    const json = response === '' ? {} : JSON.parse(response); // Consertar retorno mais tarde
    // const userString = JSON.stringify(json);
    // localStorage.setItem('user', userString);
    return json;
  }

  useEffect(() => {
    setSales(orderDetails.salesPId);
  }, [orderDetails]);

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

  return (
    <>
      <NavBar />
      <main>
        <div>
          <h3 data-testid="seller_order_details__element-order-details-label-order-id">
            Pedido
            {' '}
            {orderDetails.id}
          </h3>
          <h3
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {formattedDate(orderDetails.saleDate)}
          </h3>
          <h3
            data-testid="seller_order_details__
            element-order-details-label-delivery-status"
          >
            {orderDetails.status}
          </h3>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            onClick={ makingOrder }
            name="Preparando"
          >
            PREPARAR PEDIDO
          </button>
          <button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            onClick={ makingOrder }
            name="Em Trânsito"
          >
            SAIU PARA ENTREGA
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
            {sales.map((sale, idx) => (
              <tr
                key={ idx + 1 }
              >
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${
                      idx + 1}`
                  }
                >
                  {idx + 1}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${idx + 1}`
                  }
                >
                  {sale.SaleProductsProductId.name}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${idx + 1}`
                  }
                >
                  {`${sale.quantity}`}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${idx}`
                  }
                >
                  {`R$ ${sale.SaleProductsProductId.price}`}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${idx}`
                  }
                >
                  {`R$ ${(sale.SaleProductsProductId.price * sale.quantity).toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
