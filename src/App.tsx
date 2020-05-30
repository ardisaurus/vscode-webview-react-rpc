import React, { useState } from "react";
import "./App.css";
import { RpcBrowser } from "../node_modules/@sap-devx/webview-rpc/out.browser/rpc-browser.js";
import logo from "./logo.svg";
import vscode from "./acquirevscodeapi";

export default function App() {
  const [myText, setMyText] = useState("");

  let functions = {
    runFunctionInWebview: runFunctionInWebview,
  };

  function showMessage() {
    rpc.invoke("showMessage", ["I'm a message"]).then((response: any) => {
      setMyText(response);
    });
  }

  function runFunctionInWebview(res: any) {
    setMyText(res);
    return "updated";
  }

  let rpc = new RpcBrowser(window, vscode);
  Object.keys(functions).map((func: any) => {
    rpc.registerMethod({ func: functions[func] });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">{myText}</p>
      <button onClick={showMessage}>Click me</button>
      <p>*or open command pallete and try "Send Message React Webview"</p>
    </div>
  );
}
