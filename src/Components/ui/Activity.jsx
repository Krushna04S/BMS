import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const Activity = () => {
  const { orders } = useContext(AuthContext);
  const latestOrders = orders?.slice(-3).reverse() || [];

  return (
    <div className="mt-10 bg-linear-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <p className="text-sm text-gray-400">
          Latest customer orders and updates
        </p>
      </div>

      {/* Empty State */}
      {!latestOrders.length && (
        <div className="text-center text-gray-400 py-8">
          No recent activity 🚀
        </div>
      )}

      {/* Table */}
      {latestOrders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="p-3 text-left font-medium">Customer</th>
                <th className="p-3 text-left font-medium">Service / Product</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((elem, id) => (
                <tr
                  key={id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-3 text-white">{elem.customer}</td>
                  <td className="p-3">{elem.product}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        elem.status === "Completed"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-orange-500/15 text-orange-400"
                      }`}
                    >
                      {elem.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{elem.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activity;
