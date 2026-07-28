"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded; // { sub, email, iat, exp }
  } catch {
    return null;
  }
}

export default function BillingDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const quantity = Number(searchParams.get("quantity")) || 1;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [codChecked, setCodChecked] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const unitPrice =
    product?.discountPrice != null && product.discountPrice < product.price
      ? product.discountPrice
      : (product?.price ?? 0);

  const total = unitPrice * quantity;

  const productImage = product?.images?.[0]
    ? `data:${product.images[0].imageType};base64,${product.images[0].image}`
    : "/images/mainimage1.jpg";

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.firstName ||
      !form.streetAddress ||
      !form.city ||
      !form.phone ||
      !form.email
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const token = localStorage.getItem("access_token");
    const decoded = token ? decodeJwt(token) : null;

    if (!decoded) {
      setError("Please log in to place an order");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: decoded.sub,
            userEmail: decoded.email,
            items: [
              {
                productId: product._id,
                name: product.name,
                price: unitPrice,
                quantity,
                color: color || undefined,
                size: size || undefined,
              },
            ],
            total,
            shipping: {
              firstName: form.firstName,
              companyName: form.companyName,
              streetAddress: form.streetAddress,
              apartment: form.apartment,
              city: form.city,
              phone: form.phone,
              email: form.email,
            },
            paymentMethod: codChecked ? "cash_on_delivery" : "unspecified",
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to place order");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="mt-10 text-center text-gray-400">Loading...</p>;
  }

  if (!product) {
    return <p className="mt-10 text-center text-gray-400">Product not found</p>;
  }

  return (
    <div className="flex w-[1000px] justify-between gap-25 mt-10">
      <div className=" flex flex-col w-full h-[100vh] gap-10">
        <h3 className="font-bold text-3xl mb-2">Billing Details</h3>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={form.streetAddress}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="apartment"
            placeholder="Apartment, floor, e.t.c. (optional)"
            value={form.apartment}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="city"
            placeholder="Town/City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-blue-600"
            />
            <span>Save this information for faster check-out next time</span>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-full gap-5">
        <div className="py-3">
          <div className="flex items-center">
            <div className="flex items-center min-w-[150px] gap-3">
              <img className="h-[30px]" src={productImage} alt="" />
              <div>
                <h3>{product.name}</h3>
                {(color || size) && (
                  <p className="text-xs text-gray-500">
                    {color && `Color: ${color}`} {size && `Size: ${size}`} ×{" "}
                    {quantity}
                  </p>
                )}
              </div>
            </div>
            <span className="ml-auto">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between border-b  py-3">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-3 border-b ">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="gap-3 py-3 flex items-center">
          <input
            type="checkbox"
            checked={codChecked}
            onChange={(e) => setCodChecked(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-600"
          />
          <span>Cash on delivery</span>
        </div>
        <Button
          title={submitting ? "Placing Order..." : "Place Order"}
          onClick={handlePlaceOrder}
        />
      </div>
    </div>
  );
}
