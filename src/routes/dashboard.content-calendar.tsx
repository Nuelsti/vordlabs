import { createFileRoute } from "@tanstack/react-router";
import Calendar from "@/components/calendar/calendar";

export const Route = createFileRoute("/dashboard/content-calendar")({
  component: ContentCalendar,
});

function ContentCalendar() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Content Calendar
          </h1>

          <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Plan, organize and manage your AI-generated content calendar.
            Generate weeks of content, review scheduled posts, and stay
            consistent across all your connected social media platforms.
          </p>
        </div>

        {/* Generate Button */}
        <button
          className="
            w-full
            md:w-auto
            rounded-xl
            bg-brand
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-brand/90
            hover:shadow-md
            active:scale-95
          "
        >
          Generate Week
        </button>

      </div>

      {/* Calendar Container */}
      <div
        className="
          rounded-2xl
          border
          bg-card
          p-2
          sm:p-4
          lg:p-6
          shadow-sm
          overflow-hidden
        "
      >
        <div
          className="
            h-[550px]
            sm:h-[650px]
            lg:h-[760px]
            xl:h-[820px]
          "
        >
          <Calendar />
        </div>
      </div>

    </div>
  );
}