"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/Table";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "firstName", label: "First Name" },
    {
      key: "lastName",
      label: "Last Name",
      render: (row) => row.lastName || "—",
    },
    { key: "email", label: "Email" },
    { key: "address", label: "Address", render: (row) => row.address || "—" },
    {
      key: "createdAt",
      label: "Joined",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Users ({users.length})</h1>
      <DataTable columns={columns} rows={users} loading={loading} />
    </div>
  );
}
