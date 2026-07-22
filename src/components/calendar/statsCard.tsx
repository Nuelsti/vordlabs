import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  percentage: number;
  color: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  percentage,
  color,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>

          <p className="mt-1 font-medium text-gray-700">{title}</p>

          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>

        <div
          className="rounded-xl p-3"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}
