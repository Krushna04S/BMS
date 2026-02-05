import React from "react";
import PublicLayout from "../Layouts/PublicLayout";
import Dashboard from "../Components/Dashboard/Dashboard";
import Customers from "../Components/pages/Customers";
import Products from "../Components/pages/Products";
import Orders from "../Components/pages/Orders";
import { Navigate, Route, Routes } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/product" element={<Products />} />
        <Route path="/order" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
