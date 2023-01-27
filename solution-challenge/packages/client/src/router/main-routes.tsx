import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ROUTER_PATHS } from "./routes";
import { PrivateRoute } from "./private-routes/private-routes";
import LoginPage from "@page/auth/login-page";
import NotFound from "@page/not-found/not-found";
import Sandbox from "@page/sandbox/sandbox";
export default function MainRoutes() {
  return (
    <>
      <Helmet>
        <title>Solution Challenge</title>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Solution Challenge" />
        <meta name="description" content="Solution Challenge" />
      </Helmet>
        <Routes>
          <Route path={ROUTER_PATHS.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={ROUTER_PATHS.NOT_FOUND_PAGE} element={<NotFound />} />
          <Route path={ROUTER_PATHS.SANDBOX} element={<Sandbox language={""} />} />
        </Routes>
    </>
  );
}
