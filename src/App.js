/*
 * @Auther: renjm
 * @Date: 2019-07-24 16:23:54
 * @LastEditTime: 2019-08-27 17:36:59
 * @Description:
 */
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/hello";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello />
      </header>
    </div>
  );
}

export default App;
