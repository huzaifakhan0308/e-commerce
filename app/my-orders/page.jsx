"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload)); // { sub, email, iat, exp }
  } catch {
    return null;
  }
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded = token ? decodeJwt(token) : null;

    if (!decoded) {
      router.push("/log-in");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/orders`)
      .then((res) => res.json())
      .then((data) => {
        const myOrders = data
          .filter((o) => o.userId === decoded.sub)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(myOrders);
      })
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <p className="mt-10 text-center text-gray-400">Loading your orders...</p>
    );
  }

  if (error) {
    return <p className="mt-10 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-[4px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-[4px] text-xs capitalize self-center ${
                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.name}
                      {item.color && ` — ${item.color}`}
                      {item.size && ` — ${item.size}`} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
