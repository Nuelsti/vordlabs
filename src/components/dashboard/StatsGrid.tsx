import {
  CalendarDays,
  Send,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import StatCard from "./StatsCard";

type ActivityItem = {
  type: "scheduled" | "published" | "design" | "ai";
};

type StatCardConfig = {
  title: string;
  value: number;
  change: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

type StatGridProps = {
  activities?: ActivityItem[];
};

const defaultActivities: ActivityItem[] = [];

export default function StatGrid({ activities = defaultActivities }: StatGridProps) {
  const counts = activities.reduce(
    (acc, activity) => {
      if (activity.type === "scheduled") acc.scheduled += 1;
      if (activity.type === "published") acc.published += 1;
      if (activity.type === "design") acc.designs += 1;
      if (activity.type === "ai") acc.ai += 1;
      return acc;
    },
    { scheduled: 0, published: 0, designs: 0, ai: 0 },
  );

  const stats: StatCardConfig[] = [
    {
      title: "Posts Scheduled",
      value: counts.scheduled,
      change: `${counts.scheduled > 0 ? "+" : ""}${Math.max(1, Math.round(counts.scheduled * 0.5))} this month`,
      progress: Math.min(100, counts.scheduled * 10),
      icon: CalendarDays,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Posts Published",
      value: counts.published,
      change: `${counts.published > 0 ? "+" : ""}${Math.max(1, Math.round(counts.published * 0.4))} this month`,
      progress: Math.min(100, counts.published * 12),
      icon: Send,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Designs Created",
      value: counts.designs,
      change: `${counts.designs > 0 ? "+" : ""}${Math.max(1, Math.round(counts.designs * 0.3))} this month`,
      progress: Math.min(100, counts.designs * 8),
      icon: Palette,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "AI Content Generated",
      value: counts.ai,
      change: `${counts.ai > 0 ? "+" : ""}${Math.max(1, Math.round(counts.ai * 0.2))} this month`,
      progress: Math.min(100, counts.ai * 15),
      icon: Sparkles,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          progress={stat.progress}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
}