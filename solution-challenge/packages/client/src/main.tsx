import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@rest-hooks/react";
import MainRoutes from "./router/main-routes";
import "./locales/in18n.ts";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CacheProvider>
    <React.StrictMode>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </React.StrictMode>
  </CacheProvider>
);
