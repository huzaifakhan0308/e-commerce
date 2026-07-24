"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/Table";
import Link from "next/link";

export default function AdminVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/vouchers`)
      .then((res) => res.json())
      .then((data) => setVouchers(data))
      .catch(() => setVouchers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this voucher?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/vouchers/${id}`, {
      method: "DELETE",
    });
    setVouchers((prev) => prev.filter((v) => v._id !== id));
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.imageUrl ? (
          <img
            src={row.imageUrl}
            className="w-12 h-12 object-cover rounded-[4px]"
            alt=""
          />
        ) : (
          "—"
        ),
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
        <h1 className="text-2xl font-bold">Vouchers ({vouchers.length})</h1>
        <Link
          href="/admin/vouchers/new"
          className="px-4 py-2 bg-[#db4444] text-white rounded-[4px]"
        >
          Add Vouchers
        </Link>
      </div>
      <DataTable columns={columns} rows={vouchers} loading={loading} />
    </div>
  );
}
