import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') { history.push('login'); }
  });

  return (
    <Switch>
      <Route />
      <Route path="/login" component={ Login } />
    </Switch>

  );
}

export default App;
