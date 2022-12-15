import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "@/app/auth/LoginPage";
import NotFound from "@/app/not-found/NotFound";
import { Helmet } from "react-helmet";

function MainRoutes() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <React.Fragment>
      <Helmet>
        <title>Solution Challenge</title>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Solution Challenge" />
        <meta name="description" content="Solution Challenge" />
      </Helmet>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default MainRoutes;
