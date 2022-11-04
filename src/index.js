import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import Web3 from "web3";
import store from "./logic/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getLibrary = (provider) => {
  const library = new Web3(
    provider ||
      Web3.givenProvider ||
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
  // library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
