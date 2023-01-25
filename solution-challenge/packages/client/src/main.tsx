/** @jsxRuntime classic */ // needed on the very top to work properly with IE11
import './polyfills.js';

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@rest-hooks/react";
import MainRoutes from "./router/main-routes";
import "./index.scss";
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
