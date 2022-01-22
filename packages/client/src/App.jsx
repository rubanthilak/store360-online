import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/home/Home';
import Products from '@/pages/products/Products';
import Login from '@/pages/auth/login/index';
import Signup from '@/pages/auth/signup/index';
import ForgotPassword from '@/pages/auth/forgot-password/index';
import ResetPassword from '@/pages/auth/reset-password/index';
import TopBar from '@/components/bar/topbar/TopBar';

function App() {
  return (
    <div className="App relative">
      <TopBar></TopBar>
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
