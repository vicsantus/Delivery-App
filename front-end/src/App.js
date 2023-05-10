import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Client from './pages/Client';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Register from './pages/Register';
import Seler from './pages/Seler';

function App() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') { history.push('login'); }
  });

  return (
    <Switch>
      <Route
        path="/customer"
        component={ Client }
      />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/seller/orders/:id_do_produto" component={ OrderDetails } />
      <Route path="/seller/orders" component={ Seler } />
    </Switch>

  );
}

export default App;
