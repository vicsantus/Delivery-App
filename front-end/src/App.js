import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') { history.push('login'); }
  });

  return (
    <Switch>
      <Route path="/register" component={ Register } />
      <Route path="/login" component={ Login } />
    </Switch>

  );
}

export default App;
