import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

export default function Seler() {
  const [sales, setSales] = useState([]);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  async function requestSales() {
    const request = await fetch('http://localhost:3001/sales', {
      method: 'GET',
      mode: 'cors',
      headers,
    });
    const response = await request.text();
    const json = response === '' ? {} : JSON.parse(response);
    setSales(json);
  }

  useEffect(() => {
    requestSales();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        { sales.map((sale) => (
          <div key={ sale.id }>
            <p>a</p>
          </div>
        ))}
      </div>
    </>
  );
}

// fulana@deliveryapp.com
// fulana@123
