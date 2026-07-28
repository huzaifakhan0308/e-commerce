"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    colors: "",
    sizes: "",
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    console.log(images);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      if (form.discountPrice)
        formData.append("discountPrice", form.discountPrice);

      // split comma-separated text into individual repeated keys, matching
      // how your backend expects array fields from multipart form-data
      form.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .forEach((c) => formData.append("colors", c));

      form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => formData.append("sizes", s));

      images.forEach((file) => formData.append("images", file));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`,
        {
          method: "POST",
          body: formData, // do NOT set Content-Type manually — the browser sets the multipart boundary
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create product");
      }

      router.push("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-5">Add Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-[4px] p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Discount Price
            </label>
            <input
              name="discountPrice"
              type="number"
              value={form.discountPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-[4px] p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Colors (comma separated)
          </label>
          <input
            name="colors"
            value={form.colors}
            onChange={handleChange}
            placeholder="red, green, blue"
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Sizes (comma separated)
          </label>
          <input
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="S, M, L, XL"
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Images (up to 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files).slice(0, 5))}
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-start px-[40px] py-[12px] bg-[#db4444] mt-4 cursor-pointer text-white rounded-[4px] disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
