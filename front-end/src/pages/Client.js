import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Cards from '../components/Cards';
import Checkout from '../components/Checkout';

export default function Client() {
  const location = useLocation();
  const checkPath = location.pathname === '/customer/products';
  return (
    <div>
      <NavBar />
      {checkPath ? <Cards /> : <Checkout />}

    </div>
  );
}
