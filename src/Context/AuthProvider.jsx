import React, { createContext, useEffect, useState } from "react";
import { GetLocalStorage, setLocalStorage } from "../Utils/LocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const data = GetLocalStorage();
    setAdmin(data.admin || []);
    setCustomers(data.customers || []);
    setProducts(data.products || []);
    setOrders(data.orders || []);
    setIsAuth(data.isAuth || false);
  }, []);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage({
      admin,
      customers,
      products,
      orders,
      isAuth,
    });
  }, [admin, customers, products, orders, isAuth]);

  // login/logout helpers
  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  return (
    <AuthContext.Provider
      value={{
        admin,
        customers,
        setCustomers,
        products,
        setProducts,
        orders,
        setOrders,
        isAuth,
        setIsAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
