import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import DeliveryContext from './DeliveryContext';

export default function DeliveryProvider({ children }) {
  const [dataUser, setDataUser] = useState({});
  const [orderDetails, setOrderDetails] = useState({});

  const value = useMemo(() => ({
    orderDetails,
    setOrderDetails,
    dataUser,
    setDataUser,
  }), [dataUser, setDataUser, setOrderDetails, orderDetails]);

  return (
    <DeliveryContext.Provider value={ value }>
      { children }
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
