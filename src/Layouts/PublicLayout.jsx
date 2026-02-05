import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/ui/Navbar";
import Sidebar from "../Components/ui/Sidebar";

const PublicLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
