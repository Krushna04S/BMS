import React, { useContext, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { AuthContext } from "../../Context/AuthProvider";

const Products = () => {
  const { products, setProducts } = useContext(AuthContext);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const getProductId = () =>
    products.length === 0 ? 1 : products[products.length - 1].id + 1;

  const submitHanler = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) return;

    const isExist = products.some(
      (elem) =>
        elem.id !== editId &&
        (elem.name.toLowerCase() === productName.toLowerCase() ||
          elem.price === productPrice),
    );

    if (isExist) {
      alert("Product already exists!");
      cancelClick();
      return;
    }

    if (isEdit) {
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === editId
            ? { ...prod, name: productName, price: productPrice }
            : prod,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { id: getProductId(), name: productName, price: productPrice },
      ]);
    }

    cancelClick();
  };

  const handleEdit = (elem) => {
    setIsEdit(true);
    setEditId(elem.id);
    setProductName(elem.name);
    setProductPrice(elem.price);
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const cancelClick = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);
    setProductName("");
    setProductPrice("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <i className="ri-layout-4-fill text-blue-500"></i>
          Products
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#020617] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-800 text-gray-400">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {products.map((elem) => (
              <tr
                key={elem.id}
                className="border-b border-slate-800 hover:bg-slate-900/40 transition"
              >
                <td className="p-4 font-medium">{elem.name}</td>
                <td className="p-4 text-gray-400">₹ {elem.price}</td>
                <td className="p-4 text-center space-x-4">
                  <button
                    onClick={() => handleEdit(elem)}
                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(elem.id)}
                    className="text-red-400 hover:text-red-300 transition text-sm"
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
              {isEdit ? "Edit Product" : "Add Product"}
            </h3>

            <form onSubmit={submitHanler} className="space-y-5">
              <div>
                <label className="text-sm text-gray-400">Product Name</label>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Price</label>
                <input
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border-none border-slate-700 rounded-lg px-3 py-2 focus:outline-none "
                  placeholder="Enter price"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium"
              >
                {isEdit ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
