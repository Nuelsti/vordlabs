import {
  Instagram,
  Facebook,
  MessageCircle,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

type ConnectedAccountsProps = {
  activityLevel?: number;
};

export default function ConnectedAccounts({ activityLevel = 0 }: ConnectedAccountsProps) {
    const accounts = [
      {
        name: "Instagram",
        icon: Instagram,
        connected: activityLevel > 0,
        username: activityLevel > 0 ? "@vordlabs" : "Not Connected",
        color: "bg-pink-100 text-pink-600",
      },
      {
        name: "Facebook",
        icon: Facebook,
        connected: activityLevel > 1,
        username: activityLevel > 1 ? "VORDLABS" : "Not Connected",
        color: "bg-blue-100 text-blue-600",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        connected: activityLevel > 2,
        username: activityLevel > 2 ? "@vordlabs" : "Not Connected",
        color: "bg-sky-100 text-sky-600",
      },
      {
        name: "WhatsApp Business",
        icon: MessageCircle,
        connected: activityLevel > 3,
        username: activityLevel > 3 ? "VORDLABS" : "Not Connected",
        color: "bg-green-100 text-green-600",
      },
    ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Connected Accounts
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage the social platforms linked to VORDLABS.
          </p>
        </div>

      </div>

      {/* Accounts */}
      <div className="space-y-4">

        {accounts.map((account) => (
          <div
            key={account.name}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${account.color}`}
              >
                <account.icon className="h-6 w-6" />
              </div>

              <div>

                <h3 className="font-medium text-gray-900">
                  {account.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {account.username}
                </p>

              </div>

            </div>

            {account.connected ? (
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Connected
              </div>
            ) : (
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
                <Plus className="h-4 w-4" />
                Connect
              </button>
            )}

          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="mt-6 rounded-xl border border-dashed border-brand/30 bg-brand/5 p-4">

        <div className="flex items-start gap-3">

          <AlertCircle className="mt-0.5 h-5 w-5 text-brand" />

          <div>

            <p className="font-medium text-gray-900">
              Publish Everywhere
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Connect all your business accounts to publish content directly
              from your VORDLABS calendar.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}