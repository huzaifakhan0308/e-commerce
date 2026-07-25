"use client";
import ReactECharts from "echarts-for-react";

const colorMap = {
  pending: "#facc15",
  processing: "#3b82f6",
  shipped: "#a855f7",
  delivered: "#22c55e",
  cancelled: "#db4444",
};

export default function OrdersStatusChart({ byStatus }) {
  const statuses = Object.keys(byStatus || {});
  const counts = statuses.map((s) => byStatus[s]);

  const option = {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    xAxis: {
      type: "category",
      data: statuses,
      axisLabel: { capitalize: true },
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: counts.map((count, i) => ({
          value: count,
          itemStyle: { color: colorMap[statuses[i]] || "#db4444" },
        })),
        barWidth: "50%",
        borderRadius: [4, 4, 0, 0],
      },
    ],
  };

  return (
    <div className="bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <h2 className="font-medium mb-3">Orders by Status</h2>
      {statuses.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet</p>
      ) : (
        <ReactECharts option={option} style={{ height: 280 }} />
      )}
    </div>
  );
}
