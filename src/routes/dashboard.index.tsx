import { createFileRoute } from "@tanstack/react-router";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import StatsCard from "@/components/dashboard/StatsCard";
import StatGrid from "@/components/dashboard/StatsGrid";
import PerformanceChart from "@/components/dashboard/PerformanceCharts";
import UpcomingReminder from "@/components/dashboard/UpComingReminder";
import ConnectedAccounts from "@/components/dashboard/ConnectedAccount";
// import PerformanceChart from "@/components/dashboard/PerformanceChart";
import CalendarProgress from "@/components/dashboard/CalendarProgress";
import TodaysContent from "@/components/dashboard/TodaysContent";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useUserActivity } from "@/hooks/use-user-activity";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { hasLiveActivity } = useUserActivity();
  const activityLevel = hasLiveActivity ? 4 : 0;

  return (
    <div className="space-y-6">
      <DashboardHeader />

      {hasLiveActivity ? (
        <>
          <StatGrid />

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <PerformanceChart activityLevel={activityLevel} />
            </div>

            <CalendarProgress activityLevel={activityLevel} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <TodaysContent />
            <RecentActivity />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <UpcomingReminder />
            <ConnectedAccounts activityLevel={activityLevel} />
          </div>
        </>
      ) : null}
    </div>
  );
}