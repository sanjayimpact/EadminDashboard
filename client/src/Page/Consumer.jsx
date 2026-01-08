import React, { useState } from "react";

const Consumers = () => {
  const [search, setSearch] = useState("");

  const consumers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      status: "Active",
      joined: "2024-12-01",
    },
    {
      id: 2,
      name: "Anjali Verma",
      email: "anjali@gmail.com",
      phone: "9123456789",
      status: "Inactive",
      joined: "2024-11-15",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@gmail.com",
      phone: "9988776655",
      status: "Active",
      joined: "2024-10-20",
    },
  ];

  const filteredConsumers = consumers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* <h1 className="text-xl font-semibold text-gray-800">
          Consumers List
        </h1> */}

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredConsumers.length > 0 ? (
              filteredConsumers.map((consumer) => (
                <tr key={consumer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {consumer.name}
                  </td>
                  <td className="px-4 py-3">{consumer.email}</td>
                  <td className="px-4 py-3">{consumer.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          consumer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {consumer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{consumer.joined}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-indigo-600 hover:underline">
                      View
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No consumers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Consumers;
