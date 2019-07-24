import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hello from "./components/hello";

it("renders without crashing", () => {
  const div = document.createElement("div");
  // ReactDOM.render(<App />, div);
  // const div1 = document.createElement("div");
  ReactDOM.render(<Hello />, div);
  ReactDOM.unmountComponentAtNode(div);
});
