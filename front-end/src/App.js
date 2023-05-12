import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Client from './pages/Client';
import Login from './pages/Login';
import OrderSelerDetails from './pages/OrderSelerDetails';
import Register from './pages/Register';
import Seler from './pages/Seler';
import Admin from './pages/Admin';
import OrderUserDetails from './pages/OrderUserDetails';
import MyOrders from './pages/MyOrders';

function App() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') { history.push('login'); }
  });

  return (
    <Switch>
      <Route exact path="/seller/orders/:id_do_produto" component={ OrderSelerDetails } />
      <Route exact path="/customer/orders/:id" component={ OrderUserDetails } />
      <Route path="/seller/orders" component={ Seler } />
      <Route path="/customer/orders" component={ MyOrders } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route path="/customer" component={ Client } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
    </Switch>

  );
}

export default App;
