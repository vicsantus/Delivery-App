import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import DeliveryContext from './DeliveryContext';

export default function DeliveryProvider({ children }) {
  const [dataUser, setDataUser] = useState([]);

  const value = useMemo(() => ({
    dataUser,
    setDataUser,
  }), [dataUser, setDataUser]);

  return (
    <DeliveryContext.Provider value={ value }>
      { children }
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
