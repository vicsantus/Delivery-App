import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Client from './pages/Client';
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
        exact
        path="/customer/products"
        component={ Client }
      />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
      <Route path="/seller/orders" component={ Seler } />
      <Route path="/client" component={ Client } />
    </Switch>

  );
}

export default App;
