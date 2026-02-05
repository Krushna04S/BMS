const customers = [
  { id: 1, name: "Priya Verma", phone: "9876543210" },
  { id: 2, name: "Amit Khanna", phone: "9988776655" },
  { id: 3, name: "Neha Singh", phone: "9123456789" },
  { id: 4, name: "Rohit Sharma", phone: "9012345678" },
  { id: 5, name: "Anita Desai", phone: "9090909090" },
  { id: 6, name: "Virat Kohli", phone: "9012325676" },
];

const products = [
  { id: 1, name: "Sunglasses", price: 1500 },
  { id: 2, name: "Spectacle Frames", price: 1200 },
  { id: 3, name: "Eye Drops", price: 200 },
  { id: 4, name: "Contact Lenses", price: 1800 },
  { id: 5, name: "Frame Repair", price: 500 },
];

const orders = [
  {
    id: 1,
    customer: "Priya Verma",
    product: "Sunglasses",
    status: "Completed",
    date: "12-Apr-2024",
  },
  {
    id: 2,
    customer: "Amit Khanna",
    product: "Eye Drops",
    status: "Pending",
    date: "13-Apr-2024",
  },
  {
    id: 3,
    customer: "Neha Singh",
    product: "Spectacle Frames",
    status: "Completed",
    date: "14-Apr-2024",
  },
  {
    id: 4,
    customer: "Rohit Sharma",
    product: "Contact Lenses",
    status: "Pending",
    date: "15-Apr-2024",
  },
  {
    id: 5,
    customer: "Anita Desai",
    product: "Frame Repair",
    status: "Completed",
    date: "16-Apr-2024",
  },
];

const admin = [
  {
    id: 1,
    email: "admin@me.com",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("admin", JSON.stringify(admin));
  localStorage.setItem("isAuth", JSON.stringify(false));
};

export const GetLocalStorage = () => {
  const customers = JSON.parse(localStorage.getItem("customers"));
  const products = JSON.parse(localStorage.getItem("products"));
  const orders = JSON.parse(localStorage.getItem("orders"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  return { admin, customers, products, orders, isAuth };
};
