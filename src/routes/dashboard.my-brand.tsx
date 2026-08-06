import { createFileRoute } from "@tanstack/react-router";
import BrandForm from "@/components/brand/BrandForm";

export const Route = createFileRoute("/dashboard/my-brand")({
  component: MyBrand,
});

function MyBrand() {
  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <BrandForm />
      </div>
    </div>
  );
}
