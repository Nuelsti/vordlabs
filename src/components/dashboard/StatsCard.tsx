import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
  progress: number;
  color: string;
  bgColor: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  change,
  progress,
  color,
  bgColor,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

          <div className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            {change}
          </div>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bgColor}`}
        >
          <Icon
            className={`h-7 w-7 ${color}`}
          />
        </div>

      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">

        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: "currentColor",
            color:
              color === "text-violet-600"
                ? "#7C3AED"
                : color === "text-blue-600"
                ? "#2563EB"
                : color === "text-green-600"
                ? "#16A34A"
                : "#EA580C",
          }}
        />

      </div>
    </div>
  );
}