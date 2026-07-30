import {
  CalendarDays,
  Clock3,
  Edit3,
  Eye,
  Send,
  Sparkles,
} from "lucide-react";

export default function TodaysContent() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Today's Content
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review and publish today's scheduled content.
          </p>
        </div>

        <div className="rounded-full bg-brand/10 p-3">
          <CalendarDays className="h-5 w-5 text-brand" />
        </div>

      </div>

      {/* Content Card */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

        <div className="mb-4 flex items-center gap-2">

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Ready to Publish
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Instagram
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Facebook
          </span>

        </div>

        <h3 className="text-xl font-bold text-gray-900">
          Summer Collection Launch
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Showcase your latest fashion arrivals with an engaging caption and
          promotional flyer to attract new customers.
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            4:00 PM
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Generated
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">

          <Eye className="h-4 w-4" />

          Preview

        </button>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">

          <Edit3 className="h-4 w-4" />

          Edit

        </button>

        <button className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90">

          <Send className="h-4 w-4" />

          Publish Now

        </button>

      </div>

    </div>
  );
}