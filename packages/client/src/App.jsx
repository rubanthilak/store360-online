import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/home/Home';
import Products from './views/products/Products';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/products" >
          <Products />
        </Route>
        <Route path="/" >
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
