import React from "react";
import { Phone, CheckCircle2, XCircle, Clock, HeartHandshake, PhoneCall, Timer, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: React.ElementType;
  gradient: string;
}

const AnalyticsCard = ({ label, value, trend, trendDirection, icon: Icon, gradient }: AnalyticsCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Background Gradient Hover Effect */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-br ${gradient}`} />
      
      <div className="relative flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} p-[1px]`}>
          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-zinc-900">
            <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs font-semibold">
          {trendDirection === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500" />}
          {trendDirection === "down" && <ArrowDownRight className="h-3 w-3 text-red-500" />}
          <span className={
            trendDirection === "up" ? "text-emerald-600 dark:text-emerald-400" :
            trendDirection === "down" ? "text-red-600 dark:text-red-400" :
            "text-zinc-500"
          }>
            {trend}
          </span>
        </div>
      </div>

      <div className="relative mt-4">
        <h3 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">{value}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  );
};

export default function AnalyticsCards() {
  const cards: AnalyticsCardProps[] = [
    { label: "Total Calls", value: "2,543", trend: "+12.5%", trendDirection: "up", icon: Phone, gradient: "from-blue-500 to-indigo-500" },
    { label: "Completed Calls", value: "1,892", trend: "+8.2%", trendDirection: "up", icon: CheckCircle2, gradient: "from-emerald-400 to-emerald-600" },
    { label: "Failed Calls", value: "420", trend: "-2.4%", trendDirection: "down", icon: XCircle, gradient: "from-red-400 to-rose-600" },
    { label: "Queued Calls", value: "231", trend: "Steady", trendDirection: "neutral", icon: Clock, gradient: "from-amber-400 to-orange-500" },
    { label: "Interested Leads", value: "485", trend: "+15.3%", trendDirection: "up", icon: HeartHandshake, gradient: "from-purple-500 to-pink-500" },
    { label: "Callback Requested", value: "112", trend: "+4.1%", trendDirection: "up", icon: PhoneCall, gradient: "from-cyan-400 to-blue-500" },
    { label: "Avg Call Duration", value: "2m 14s", trend: "+0.3s", trendDirection: "up", icon: Timer, gradient: "from-teal-400 to-emerald-500" },
    { label: "Success Rate", value: "74.4%", trend: "+2.1%", trendDirection: "up", icon: TrendingUp, gradient: "from-fuchsia-500 to-purple-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <AnalyticsCard key={i} {...card} />
      ))}
    </div>
  );
}
