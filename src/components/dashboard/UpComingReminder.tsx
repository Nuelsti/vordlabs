import {
  BellRing,
  Clock3,
  CalendarDays,
  ArrowRight,
  Send,
} from "lucide-react";

export default function UpcomingReminder() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Reminder
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Never miss your next scheduled post.
          </p>
        </div>

        <div className="rounded-xl bg-brand/10 p-3">
          <BellRing className="h-5 w-5 text-brand" />
        </div>

      </div>

      {/* Reminder Card */}
      <div className="rounded-xl border border-brand/20 bg-brand/5 p-5">

        <div className="mb-4 flex items-center gap-2">

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Scheduled
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Instagram
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Facebook
          </span>

        </div>

        <h3 className="text-lg font-bold text-gray-900">
          Weekend Promo Campaign
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Your next content is scheduled for publishing today.
          We'll remind you 10 minutes before it's time to post.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-3 rounded-lg bg-white p-3">

            <CalendarDays className="h-5 w-5 text-brand" />

            <div>
              <p className="text-xs text-gray-500">
                Date
              </p>

              <p className="font-medium">
                Monday, July 28
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3 rounded-lg bg-white p-3">

            <Clock3 className="h-5 w-5 text-brand" />

            <div>
              <p className="text-xs text-gray-500">
                Time
              </p>

              <p className="font-medium">
                4:00 PM
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Countdown */}
      <div className="mt-6 rounded-xl bg-gray-50 p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Reminder in
            </p>

            <h3 className="mt-1 text-3xl font-bold text-brand">
              1h 12m
            </h3>

          </div>

          <div className="rounded-full bg-brand/10 p-4">
            <BellRing className="h-7 w-7 text-brand" />
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">

        <button className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-medium text-white transition hover:bg-brand/90">

          <Send className="h-4 w-4" />

          Publish Now

        </button>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50">

          View Calendar

          <ArrowRight className="h-4 w-4" />

        </button>

      </div>

    </div>
  );
}