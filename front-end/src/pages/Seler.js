import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DeliveryContext from '../context/DeliveryContext';

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
      <main>
        { sales.map((sale, index) => (
          <button
            type="button"
            onClick={ () => goToOrderDetails(sale) }
            style={ { border: '1px solid black', margin: '5px' } } // temporario
            key={ index }
          >
            <div>
              <p
                data-testid={ `${sellerOrder}${sale.id}` }
              >
                {sale.id}
              </p>
            </div>
            <div
              data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
            >
              {sale.status}
            </div>
            <div>
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
            </div>
            <p
              data-testid={ `seller_orders__element-card-address-${sale.id}` }
            >
              {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
            </p>
            <div />
          </button>
        ))}
      </main>
    </>
  );
}

// fulana@deliveryapp.com
// fulana@123
