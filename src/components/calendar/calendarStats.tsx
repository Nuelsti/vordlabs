import StatsCard from "./statsCard";

import { CalendarDays, FileEdit, Send, BarChart3 } from "lucide-react";

export default function CalendarStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Posts Scheduled"
        value={24}
        subtitle="80% of this month"
        percentage={80}
        color="#16a34a"
        icon={<CalendarDays size={26} />}
      />

      <StatsCard
        title="Drafts"
        value={4}
        subtitle="13% of this month"
        percentage={13}
        color="#f59e0b"
        icon={<FileEdit size={26} />}
      />

      <StatsCard
        title="Ready to Publish"
        value={2}
        subtitle="7% of this month"
        percentage={7}
        color="#3b82f6"
        icon={<Send size={26} />}
      />

      <StatsCard
        title="Posts Published"
        value={18}
        subtitle="This month"
        percentage={70}
        color="#8b5cf6"
        icon={<BarChart3 size={26} />}
      />
    </div>
  );
}
