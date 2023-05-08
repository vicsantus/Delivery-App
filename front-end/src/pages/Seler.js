import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import DeliveryContext from '../context/DeliveryContext';

export default function Seler() {
  const { dataUser } = useContext(DeliveryContext);
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

  return (
    <>
      <NavBar />
      <main>
        { sales.map((sale) => (
          <section
            key={ sale.id }
          >
            <div>
              <p
                data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
              >
                {`Pedido ${sale.id}`}
              </p>
            </div>
            <div />
          </section>
        ))}
      </main>
    </>
  );
}

// fulana@deliveryapp.com
// fulana@123
