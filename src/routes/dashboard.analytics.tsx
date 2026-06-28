import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-300">Analytics</h1>
    </div>
  );
}
