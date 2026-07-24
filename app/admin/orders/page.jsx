"use client";
import DataTable from "../../../components/admin/Table";

// Placeholder data — replace with a real fetch once you build the orders API.
// Suggested shape per order: { _id, userEmail, items: [...], total, status, createdAt }
const mockOrders = [];

export default function AdminOrders() {
  const columns = [
    { key: "_id", label: "Order ID" },
    { key: "userEmail", label: "Customer" },
    { key: "total", label: "Total", render: (row) => `$${row.total}` },
    { key: "status", label: "Status" },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Orders ({mockOrders.length})</h1>
      <p className="text-gray-500 mb-4 text-sm">
        Orders backend isn't built yet — this table is wired up and ready, just
        swap <code className="bg-gray-100 px-1 rounded">mockOrders</code> for a
        real fetch once the API exists.
      </p>
      <DataTable
        columns={columns}
        rows={mockOrders}
        loading={false}
        emptyText="No orders yet"
      />
    </div>
  );
}
