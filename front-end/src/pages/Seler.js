import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DeliveryContext from '../context/DeliveryContext';
import '../styles/OrdersStyle.css';

export default function Seler() {
  const history = useHistory();

  const sellerOrder = 'seller_orders__element-order-id-';
  const { dataUser, setOrderDetails } = useContext(DeliveryContext);
  const [sales, setSales] = useState([]);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  function checkSellerSales(dbSales) {
    return dbSales.filter((sale) => sale.sellerId === dataUser.id);
  }

  async function requestSales() {
    const request = await fetch('http://localhost:3001/sales', {
      method: 'GET',
      mode: 'cors',
      headers,
    });
    const response = await request.text();
    const json = response === '' ? {} : JSON.parse(response);
    const check = checkSellerSales(json);
    setSales(check);
  }

  useEffect(() => {
    requestSales();
  }, []);

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

  function goToOrderDetails(currentSale) {
    setOrderDetails(currentSale);
    history.push(`/seller/orders/${currentSale.id}`);
  }

  return (
    <>
      <NavBar />
      <div className="container-orders">
        { sales.map((sale, index) => (
          <button
            className="button-order"
            type="button"
            onClick={ () => goToOrderDetails(sale) }
            key={ index }
          >
            <div className="content-order">
              <div className="item">
                <p>Pedido</p>
                <p
                  data-testid={ `${sellerOrder}${sale.id}` }
                >
                  {sale.id}
                </p>
              </div>
              <div
                className="status"
              >
                <p data-testid={ `seller_orders__element-delivery-status-${sale.id}` }>
                  {sale.status}
                </p>

              </div>
              <div className="date-price">
                <p
                  data-testid={ `seller_orders__element-card-price-${sale.id}` }
                >
                  {sale.totalPrice?.toString().replace('.', ',')}
                </p>
                <p
                  data-testid={ `seller_orders__element-order-date-${sale.id}` }
                >
                  {formattedDate(sale.saleDate)}
                </p>
                <span
                  className="adress-order"
                  data-testid={ `seller_orders__element-card-address-${sale.id}` }
                >
                  {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
                </span>
              </div>

              <div />

            </div>

          </button>
        ))}
      </div>
    </>
  );
}

// fulana@deliveryapp.com
// fulana@123
