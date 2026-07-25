"use client";
import ReactECharts from "echarts-for-react";

export default function RevenueChart({ dailyRevenue }) {
  const days = (dailyRevenue || []).map((d) => d.day.slice(5)); // "MM-DD"
  const revenue = (dailyRevenue || []).map((d) => d.revenue);

  const option = {
    tooltip: { trigger: "axis" },
    grid: { left: 50, right: 20, top: 30, bottom: 30 },
    xAxis: { type: "category", data: days },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (val) => `$${val}` },
    },
    series: [
      {
        type: "line",
        data: revenue,
        smooth: true,
        areaStyle: { color: "rgba(219, 68, 68, 0.15)" },
        lineStyle: { color: "#db4444", width: 3 },
        itemStyle: { color: "#db4444" },
      },
    ],
  };

  return (
    <div className="bg-white rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <h2 className="font-medium mb-3">Revenue (Last 7 Days)</h2>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
}
