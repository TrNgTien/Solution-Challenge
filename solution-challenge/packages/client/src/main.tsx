import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@rest-hooks/react";
import "./index.scss";
import MainRoutes from "./routes/MainRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CacheProvider>
    <React.StrictMode>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </React.StrictMode>
  </CacheProvider>
);
