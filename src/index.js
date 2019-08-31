/*
 * @Auther: renjm
 * @Date: 2019-07-24 16:23:54
 * @LastEditTime: 2019-08-31 08:31:08
 * @Description:
 */
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import App from "./App";

import MainLayout from "./components/mainLayout";
// import Hello from "./components/hello";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>,
  document.getElementById("root")
);
// const div = document.createElement("div");
// ReactDOM.render(<Hello />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
