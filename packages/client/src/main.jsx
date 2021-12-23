import React from "react";
import ReactDOM from "react-dom";
//Router
import { BrowserRouter } from "react-router-dom";
//Redux
import store from "./store/index";
import { Provider } from "react-redux";
//Tailwind CSS
import "./index.css";
import App from "./App";
import "./firebase-config";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
