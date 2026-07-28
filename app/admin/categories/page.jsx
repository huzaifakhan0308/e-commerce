"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/Table";
import Link from "next/link";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/category/${id}`, {
      method: "DELETE",
    });
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.image ? (
          <img
            src={`data:${row.imageType};base64,${row.image}`}
            className="w-12 h-12 object-cover rounded-[4px]"
            alt=""
          />
        ) : (
          "—"
        ),
    },
    {
      key: "expiresAt",
      label: "Expires At",
      render: (row) => new Date(row.expiresAt).toLocaleString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-[#db4444] cursor-pointer hover:underline"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categories ({categories.length})</h1>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-[#db4444] text-white rounded-[4px]"
        >
          Add Categories
        </Link>
      </div>
      <DataTable columns={columns} rows={categories} loading={loading} />
    </div>
  );
}
