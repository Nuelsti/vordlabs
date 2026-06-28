import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/my-brand")({
  component: MyBrand,
});

function MyBrand() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-300">My Brand</h1>
    </div>
  );
}
