import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/content-calendar")({
  component: ContentCalendar,
});

function ContentCalendar() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-300">Content Calendar</h1>
    </div>
  );
}
