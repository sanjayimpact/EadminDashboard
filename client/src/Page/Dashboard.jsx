import React from "react";
import { useGetMyInfoQuery } from "../store/slice/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setlocalstorage } from "../utils/HelperFunctions/localstorage";
import { admindata } from "../store/slice/authslice";
const stats = [
  { label: "Total Revenue", value: "$124,430", color: "bg-green-100 text-green-700" },
  { label: "Orders Today", value: "128", color: "bg-blue-100 text-blue-700" },
  { label: "Total Customers", value: "3,245", color: "bg-purple-100 text-purple-700" },
  { label: "Pending Orders", value: "18", color: "bg-yellow-100 text-yellow-700" },
];

const orders = [
  { id: "#ORD1023", customer: "Rahul Sharma", amount: "$120", status: "Pending" },
  { id: "#ORD1024", customer: "Anjali Verma", amount: "$340", status: "Shipped" },
  { id: "#ORD1025", customer: "Amit Singh", amount: "$89", status: "Delivered" },
];

const products = [
  { name: "Wireless Headphones", sold: 124, stock: 8 },
  { name: "Smart Watch", sold: 98, stock: 42 },
  { name: "Gaming Mouse", sold: 75, stock: 5 },
];

const Dashboard = () => {
 setlocalstorage('currentpath', 'dashboard');
     setlocalstorage('active', 'dashboard');
  return (
    <div className="space-y-8  ">

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className={`mt-2 text-2xl font-bold ${item.color.split(" ")[1]}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ORDERS & PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4 font-semibold">
            Recent Orders
          </div>
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex justify-between">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4 font-semibold">
            Top Selling Products
          </div>
          <div className="divide-y">
            {products.map((product) => (
              <div key={product.name} className="px-6 py-4 flex justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Sold: {product.sold}
                  </p>
                </div>
                <div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.stock < 10
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
