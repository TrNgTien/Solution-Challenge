import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "@/app/auth/LoginPage";
import NotFound from "@/app/not-found/NotFound";

function MainRoutes() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
