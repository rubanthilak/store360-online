import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/home/Home';
import Products from './views/products/Products';
import Login from './views/auth/login/index';
import Signup from './views/auth/signup/index';
import ForgotPassword from './views/auth/forgot-password/index';
import ResetPassword from './views/auth/reset-password/index';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/products" >
          <Products />
        </Route>
        <Route path="/reset-password" >
          <ResetPassword />
        </Route>
        <Route path="/forgot-password" >
          <ForgotPassword />
        </Route>
        <Route path="/signup" >
          <Signup />
        </Route>
        <Route path="/login" >
          <Login />
        </Route>
        <Route path="/" >
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
