import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const { customers } = useContext(AuthContext);
  const latestCustomer = customers?.slice(-3).reverse() || [];

  return (
    <div className="bg-linear-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Customers</h3>
        <span className="text-xs text-gray-400">Latest 3</span>
      </div>

      {/* Empty */}
      {!latestCustomer.length && (
        <div className="text-center text-gray-400 py-6">No customers found</div>
      )}

      {/* Table */}
      {latestCustomer.length > 0 && (
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Phone</th>
            </tr>
          </thead>
          <tbody>
            {latestCustomer.map((elem) => (
              <tr
                key={elem.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3 text-white">{elem.name}</td>
                <td className="p-3">{elem.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Action */}
      <div className="flex justify-end mt-5">
        <Link
          to="/Customer"
          className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default CustomerList;
