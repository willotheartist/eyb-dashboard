// components/RightSidebar.tsx

import { TrendingUp, Calendar, MessageSquare } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "lead",
    title: "New inquiry received",
    desc: "James Mitchell requested info",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    id: 2,
    type: "milestone",
    title: "Listing milestone",
    desc: "Princess Y85 reached 500+ views",
    time: "5 hours ago",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "scheduled",
    title: "Viewing scheduled",
    desc: "Ferretti 670 showing Feb 3rd",
    time: "Yesterday",
    icon: Calendar,
  },
];

const topCategories = [
  { name: "Motor Yachts", percent: 79 },
  { name: "Sailing Yachts", percent: 59 },
  { name: "Catamarans", percent: 89 },
  { name: "Superyachts", percent: 29 },
];

export function RightSidebar() {
  return (
    <aside className="space-y-6">
      {/* Commission summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Commission Summary</h3>
          <span className="text-xs text-muted-foreground">This month</span>
        </div>

        <div className="bg-primary text-white rounded-xl p-4">
          <div className="text-sm opacity-70 mb-1">Next Payout</div>
          <div className="text-2xl font-semibold mb-3">$18,200</div>

          <div className="flex justify-between text-sm">
            <div>
              <div className="opacity-60 text-xs">Total YTD</div>
              <div className="font-medium">$142,500</div>
            </div>
            <div>
              <div className="opacity-60 text-xs">Pending</div>
              <div className="font-medium">$24,300</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Top Categories</h3>
          <button className="text-xs text-muted-foreground" type="button">
            ⓘ
          </button>
        </div>

        <div className="space-y-4">
          {topCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span>{cat.name}</span>
                <span className="text-muted-foreground">{cat.percent}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <button className="text-xs text-accent font-medium" type="button">
            View all
          </button>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-3 p-3 bg-muted/50 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                <activity.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium">{activity.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {activity.desc}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
