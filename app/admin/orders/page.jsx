"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/Table";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/orders/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
    );
    fetchOrders();
  };

  const columns = [
    { key: "_id", label: "Order ID", render: (row) => row._id.slice(-8) },
    { key: "userEmail", label: "Customer" },
    {
      key: "items",
      label: "Items",
      render: (row) => `${row.items.length} item(s)`,
    },
    {
      key: "total",
      label: "Total",
      render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className={`px-2 py-1 rounded-[4px] text-xs cursor-pointer border-0 ${statusColors[row.status]}`}
        >
          {Object.keys(statusColors).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Orders ({orders.length})</h1>
      <DataTable
        columns={columns}
        rows={orders}
        loading={loading}
        emptyText="No orders yet"
      />
    </div>
  );
}
