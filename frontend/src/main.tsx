import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App.tsx";
import "./css/index.css";
import { GlobalStateProvider } from "./state/globalVariablesState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </NextUIProvider>
  </React.StrictMode>
);
