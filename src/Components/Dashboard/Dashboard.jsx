import CustomerList from "../ui/CustomerList";
import ProductList from "../ui/ProductList";
import Activity from "../ui/Activity";
import "remixicon/fonts/remixicon.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const Dashboard = () => {
  const { customers, products, orders } = useContext(AuthContext);

  const pendingOrders =
    orders?.filter((elem) => elem.status === "Pending").length || 0;

  const stats = [
    {
      label: "Total Customers",
      value: customers?.length || 0,
      icon: "ri-user-3-fill",
      color: "from-blue-500/20 to-blue-600/5 text-blue-400",
    },
    {
      label: "Total Products",
      value: products?.length || 0,
      icon: "ri-box-3-fill",
      color: "from-emerald-500/20 to-emerald-600/5 text-emerald-400",
    },
    {
      label: "Total Orders",
      value: orders?.length || 0,
      icon: "ri-shopping-cart-2-fill",
      color: "from-orange-500/20 to-orange-600/5 text-orange-400",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: "ri-time-fill",
      color: "from-red-500/20 to-red-600/5 text-red-400",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-[#020617] via-[#0f172a] to-black text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-xl">
          <i className="ri-home-4-fill"></i>
        </div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative p-6 rounded-2xl  bg-linear-to-br ${stat.color} border border-white/10 shadow-lg hover:-translate-y-1 transition`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="text-3xl opacity-80">
                <i className={stat.icon}></i>
              </div>
            </div>

            {/* Glow */}
            <span className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="mt-10">
        <Activity />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <CustomerList />
        <ProductList />
      </div>
    </div>
  );
};

export default Dashboard;
