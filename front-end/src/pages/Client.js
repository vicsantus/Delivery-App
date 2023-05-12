import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Cards from '../components/Cards';
import Checkout from '../components/Checkout';

export default function Client() {
  const location = useLocation();
  const checkPathProducts = location.pathname === '/customer/products';
  const checkPathCheckout = location.pathname === '/customer/checkout';
  return (
    <div>
      <NavBar />
      {checkPathProducts && <Cards />}
      {checkPathCheckout && <Checkout />}

    </div>
  );
}
