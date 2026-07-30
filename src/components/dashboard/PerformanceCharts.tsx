"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PerformanceChartProps = {
  activityLevel?: number;
};

export default function PerformanceChart({ activityLevel = 0 }: PerformanceChartProps) {
  const data = [
    { week: "Week 1", engagement: Math.max(0, 20 + activityLevel * 2), reach: Math.max(0, 120 + activityLevel * 18) },
    { week: "Week 2", engagement: Math.max(0, 32 + activityLevel * 3), reach: Math.max(0, 180 + activityLevel * 22) },
    { week: "Week 3", engagement: Math.max(0, 40 + activityLevel * 4), reach: Math.max(0, 240 + activityLevel * 24) },
    { week: "Week 4", engagement: Math.max(0, 45 + activityLevel * 5), reach: Math.max(0, 280 + activityLevel * 26) },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Content Performance
          </h2>

          <p className="text-sm text-gray-500">
            Engagement and reach over the last four weeks.
          </p>

        </div>

        <select className="rounded-xl border px-4 py-2 text-sm outline-none">

          <option>This Month</option>

          <option>Last Month</option>

          <option>Last 3 Months</option>

        </select>

      </div>

      <div className="h-[340px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="week" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#3A943F"
              strokeWidth={4}
              dot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="reach"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}