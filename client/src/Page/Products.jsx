import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$120",
    stock: 8,
    status: "Low Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$220",
    stock: 45,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$45",
    stock: 0,
    status: "Out of Stock",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "$80",
    stock: 18,
    status: "In Stock",
    image: "https://via.placeholder.com/40",
  },
];

const Products = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <div className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Products
        </h1>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded object-cover"
                />
                <span className="font-medium text-gray-800">
                  {product.name}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                {product.price}
              </td>

              <td className="px-6 py-4 text-center">
                {product.stock}
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.status}
                </span>
              </td>

              <td className="px-6 py-4 text-right space-x-3">
                <button className="text-indigo-600 hover:underline">
                  View
                </button>
                <button className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Products;
