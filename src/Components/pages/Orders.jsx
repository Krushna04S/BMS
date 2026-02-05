import { useContext, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";
import { AuthContext } from "../../Context/AuthProvider";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const { orders, setOrders } = useContext(AuthContext);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");

  const getOrderId = () =>
    orders.length === 0 ? 1 : orders[orders.length - 1].id + 1;

  const submitHanler = () => {
    const newOrder = {
      id: getOrderId(),
      customer,
      product,
      date,
      status,
    };
    setOrders((prev) => [...prev, newOrder]);

    setCustomer("");
    setProduct("");
    setDate("");
    setStatus("pending");
    setShowModal(false);
  };

  const updateStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: order.status === "pending" ? "completed" : "pending",
            }
          : order,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <i className="ri-edit-box-fill text-blue-500"></i>
          Orders
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Add Order
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#020617] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-800 text-gray-400">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-900/40 transition"
              >
                <td className="p-4 font-medium">{order.customer}</td>
                <td className="p-4 text-gray-400">{order.product}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-gray-400">{order.date}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => updateStatus(order.id)}
                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#020617] border border-slate-800 rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <h3 className="text-xl font-semibold mb-6">Add Order</h3>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-400">Customer Name</label>
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Product Name</label>
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Status
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={status === "completed"}
                      onChange={() => setStatus("completed")}
                    />
                    Completed
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={status === "pending"}
                      onChange={() => setStatus("pending")}
                    />
                    Pending
                  </label>
                </div>
              </div>

              <button
                onClick={submitHanler}
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium"
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
