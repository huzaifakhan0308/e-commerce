"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategory() {
  const router = useRouter();
  const [durationHours, setDurationHours] = useState("24");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select an image");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("durationHours", durationHours);
      formData.append("image", image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/category`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create category");
      }

      router.push("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-5">Add Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Expires in (hours)
          </label>
          <input
            type="number"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full border border-gray-300 rounded-[4px] p-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-start px-[40px] py-[12px] bg-[#db4444] mt-4 cursor-pointer text-white rounded-[4px] disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
