"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/Table";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
    console.log("products", products);
  }, []);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products/${id}`, {
      method: "DELETE",
    });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.images?.[0] ? (
          <img
            src={`data:${row.images[0].imageType};base64,${row.images[0].image}`}
            className="w-12 h-12 object-cover rounded-[4px]"
            alt=""
          />
        ) : (
          "—"
        ),
    },
    { key: "name", label: "Name" },
    { key: "price", label: "Price", render: (row) => `$${row.price}` },
    {
      key: "discountPrice",
      label: "Discount",
      render: (row) => (row.discountPrice ? `$${row.discountPrice}` : "—"),
    },
    {
      key: "colors",
      label: "Colors",
      render: (row) => row.colors?.join(", ") || "—",
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
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-[#db4444] text-white rounded-[4px]"
        >
          Add Product
        </Link>
      </div>
      <DataTable columns={columns} rows={products} loading={loading} />
    </div>
  );
}
