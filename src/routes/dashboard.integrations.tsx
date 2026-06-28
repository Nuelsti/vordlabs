import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/integrations")({
  component: Integrations,
});

function Integrations() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-300">Integrations</h1>
    </div>
  );
}
