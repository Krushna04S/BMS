import React, { useContext, useEffect } from "react";
import PublicRoutes from "./Routes/PublicRoutes";
import { useState } from "react";
import Login from "./Components/pages/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  // useEffect(() => {
  //   // GetLocalStorage();
  //   // setLocalStorage();
  //   // initLocalStorage();
  // });

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <PublicRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
