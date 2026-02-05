import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";
import "remixicon/fonts/remixicon.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const Customers = () => {
  const { customers, setCustomers } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const submitHanler = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newId = getCustomerId();

    const isExist = customers.some(
      (elem) =>
        elem.id !== editId &&
        (elem.name.toLowerCase() === customerName.toLowerCase() ||
          elem.phone === customerPhone),
    );

    if (isExist) {
      alert("Customer already exists!");
      cancelClick();
      return;
    }

    if (isEdit) {
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === editId
            ? { ...cust, name: customerName, phone: customerPhone }
            : cust,
        ),
      );
    } else {
      setCustomers((prev) => [
        ...prev,
        { id: newId, name: customerName, phone: customerPhone },
      ]);
    }

    cancelClick();
  };

  const handleEdit = (elem) => {
    setIsEdit(true);
    setEditId(elem.id);
    setCustomerName(elem.name);
    setCustomerPhone(elem.phone);
    setShowModal(true);
  };

  const getCustomerId = () =>
    customers.length === 0 ? 1 : customers[customers.length - 1].id + 1;

  const deleteCustomer = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    setCustomers((prev) => prev.filter((cust) => cust.id !== id));
  };

  const cancelClick = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setCustomerName("");
    setCustomerPhone("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <i className="ri-user-3-fill text-blue-500"></i>
          Customers
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Add Customer
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#020617] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#020617] text-gray-400 border-b border-slate-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}

            {customers.map((elem) => (
              <tr
                key={elem.id}
                className="border-b border-slate-800 hover:bg-slate-900/40 transition"
              >
                <td className="p-4 font-medium">{elem.name}</td>
                <td className="p-4 text-gray-400">{elem.phone}</td>
                <td className="p-4 text-center space-x-4">
                  <button
                    onClick={() => handleEdit(elem)}
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(elem.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Delete
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
              onClick={cancelClick}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <h3 className="text-xl font-semibold mb-6">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h3>

            <form onSubmit={submitHanler} className="space-y-5">
              <div>
                <label className="text-sm text-gray-400">Customer Name</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Phone Number</label>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none  "
                  placeholder="Enter phone number"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium">
                {isEdit ? "Update Customer" : "Add Customer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
