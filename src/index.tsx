import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider
    theme={{
      colors: {
        bluePrimary: ["#5E96FC"],
        grey: ["#EAEBED"],
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MantineProvider>
);
