import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/designs")({
  component: Designs,
});

function Designs() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-300">Designs</h1>
    </div>
  );
}
