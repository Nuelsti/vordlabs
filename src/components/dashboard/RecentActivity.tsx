import {
  Sparkles,
  Palette,
  CalendarDays,
  Send,
  Pencil,
  Instagram,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    icon: Sparkles,
    color: "bg-violet-100 text-violet-600",
    title: "AI generated this week's content",
    time: "10 mins ago",
  },
  {
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    title: "Summer Sale flyer created",
    time: "45 mins ago",
  },
  {
    icon: Pencil,
    color: "bg-yellow-100 text-yellow-600",
    title: "Edited 'Monday Motivation' caption",
    time: "1 hour ago",
  },
  {
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
    title: "7 posts scheduled",
    time: "Yesterday",
  },
  {
    icon: Send,
    color: "bg-green-100 text-green-600",
    title: "Published Weekend Promo",
    time: "Yesterday",
  },
  {
    icon: Instagram,
    color: "bg-orange-100 text-orange-600",
    title: "Instagram account connected",
    time: "2 days ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest actions inside VORDLABS.
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

      {/* Activity List */}

      <div className="space-y-5">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${activity.color}`}
            >
              <activity.icon className="h-5 w-5" />
            </div>

            <div className="flex-1">

              <p className="font-medium text-gray-900">
                {activity.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {activity.time}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}