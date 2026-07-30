import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ArrowRight,
} from "lucide-react";

type CalendarProgressProps = {
  activityLevel?: number;
};

export default function CalendarProgress({ activityLevel = 0 }: CalendarProgressProps) {
  const progress = Math.min(100, Math.max(0, 20 + activityLevel * 15));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Calendar Progress
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track how complete your monthly content plan is.
          </p>
        </div>

        <div className="rounded-xl bg-brand/10 p-3">
          <CalendarDays className="h-5 w-5 text-brand" />
        </div>

      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center">

        <div className="relative flex h-40 w-40 items-center justify-center">

          <svg className="absolute h-40 w-40 -rotate-90">

            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#3A943F"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={408}
              strokeDashoffset={408 - (408 * progress) / 100}
            />

          </svg>

          <div className="text-center">

            <h2 className="text-4xl font-bold text-brand">
              {progress}%
            </h2>

            <p className="text-sm text-gray-500">
              Complete
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <span className="text-gray-700">
              Content Ready
            </span>

          </div>

          <span className="font-semibold">
            24 / 30 Days
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <CircleAlert className="h-5 w-5 text-orange-500" />

            <span className="text-gray-700">
              Missing Days
            </span>

          </div>

          <span className="font-semibold">
            6
          </span>

        </div>

      </div>

      {/* Missing Days */}
      <div className="mt-6">

        <p className="mb-3 text-sm font-medium text-gray-700">
          Days Needing Content
        </p>

        <div className="flex flex-wrap gap-2">

          {[5, 8, 12, 17, 23, 29].map((day) => (
            <button
              key={day}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              {day}
            </button>
          ))}

        </div>

      </div>

      {/* CTA */}
      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-medium text-white transition hover:bg-brand/90">

        Open Content Calendar

        <ArrowRight className="h-4 w-4" />

      </button>

    </div>
  );
}