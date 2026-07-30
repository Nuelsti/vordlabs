import { createFileRoute } from "@tanstack/react-router";
import Calendar from "@/components/calendar/calendar";
import { useUserActivity } from "@/hooks/use-user-activity";

export const Route = createFileRoute("/dashboard/content-calendar")({
  component: ContentCalendar,
});

function ContentCalendar() {
  const { hasLiveActivity } = useUserActivity();

  return (
    <div className="min-h-screen bg-gray-50">
      {hasLiveActivity ? (
        <div className="mx-auto max-w-[1800px] space-y-8 p-4 md:p-6 xl:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold lg:text-4xl">Content Calendar</h1>

              <p className="mt-2 text-gray-500">
                Plan, review and manage all your content in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl border bg-white px-5 py-3 font-medium shadow-sm hover:bg-gray-50">
                Generate Week
              </button>

              <button className="rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand/90">
                Generate Month
              </button>

              <button className="rounded-xl border bg-white px-5 py-3 font-medium shadow-sm hover:bg-gray-50">
                More
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <Calendar />
          </div>
        </div>
      ) : null}
    </div>
  );
}
