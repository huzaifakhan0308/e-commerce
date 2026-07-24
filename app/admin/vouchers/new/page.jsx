"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewVoucher() {
  const router = useRouter();
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
      formData.append("image", image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/vouchers`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create voucher");
      }

      router.push("/admin/vouchers");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-5">Add Voucher</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {submitting ? "Saving..." : "Create Voucher"}
        </button>
      </form>
    </div>
  );
}
