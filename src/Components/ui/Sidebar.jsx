import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { AuthContext } from "../../Context/AuthProvider";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", path: "/", icon: "ri-home-4-fill" },
    { name: "Customers", path: "/Customer", icon: "ri-user-3-fill" },
    { name: "Products", path: "/product", icon: "ri-box-3-fill" },
    { name: "Orders", path: "/order", icon: "ri-edit-box-fill" },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-linear-to-b from-[#020617] to-[#0f172a] text-white border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-xl">
          <i className="ri-layout-4-fill"></i>
        </div>
        <h1 className="text-lg font-semibold tracking-wide">Business MS</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <i className="ri-logout-circle-r-line text-lg"></i>
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
