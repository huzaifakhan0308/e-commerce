"use client";
import { useEffect, useState } from "react";
import OrdersStatusChart from "../../components/admin/OrdersStatusChart.jsx";
import RevenueChart from "../../components/admin/RevenueChart.jsx";

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function computeStats(orders) {
  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  // Build the last 7 calendar days, pre-seeded at 0
  const dailyRevenueMap = {};
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10); // "YYYY-MM-DD"
    days.push(key);
    dailyRevenueMap[key] = 0;
  }

  orders
    .filter((o) => o.status !== "cancelled")
    .forEach((o) => {
      const key = new Date(o.createdAt).toISOString().slice(0, 10);
      if (dailyRevenueMap[key] !== undefined) {
        dailyRevenueMap[key] += o.total;
      }
    });

  const dailyRevenue = days.map((day) => ({
    day,
    revenue: dailyRevenueMap[day],
  }));

  return { totalOrders, totalRevenue, byStatus, dailyRevenue };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const base = process.env.NEXT_PUBLIC_ECOMMERCE_BE_API;

  useEffect(() => {
    fetch(`${base}/orders`)
      .then((res) => res.json())
      .then((orders) => setStats(computeStats(orders)))
      .catch(() =>
        setStats({
          totalOrders: 0,
          totalRevenue: 0,
          byStatus: {},
          dailyRevenue: [],
        }),
      );

    fetch(`${base}/products`)
      .then((res) => res.json())
      .then((data) => setProductCount(data.length))
      .catch(() => setProductCount(0));

    fetch(`${base}/users`)
      .then((res) => res.json())
      .then((data) => setUserCount(data.length))
      .catch(() => setUserCount(0));
  }, [base]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      <div className="grid grid-cols-4 gap-5">
        <StatCard label="Total Orders" value={stats?.totalOrders ?? "—"} />
        <StatCard
          label="Total Revenue"
          value={stats ? `$${stats.totalRevenue.toFixed(2)}` : "—"}
        />
        <StatCard label="Products" value={productCount} />
        <StatCard label="Users" value={userCount} />
      </div>

      {stats?.byStatus && Object.keys(stats.byStatus).length > 0 && (
        <div className="mt-8 bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
          <h2 className="font-medium mb-3">Orders by Status</h2>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="px-4 py-2 bg-gray-100 rounded-[4px]">
                <span className="capitalize">{status}</span>:{" "}
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5 mt-8">
        <OrdersStatusChart byStatus={stats?.byStatus} />
        <RevenueChart dailyRevenue={stats?.dailyRevenue} />
      </div>
    </div>
  );
}
