"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { ActivityTimeline } from "@/components/shared/dashboard/ActivityTimeline";
import { QuickActionCard } from "@/components/shared/dashboard/QuickActionCard";
import { StatCard } from "@/components/shared/dashboard/StatCard";
import {
  Plus,
  FileText,
  PhoneCall,
  CheckCircle2,
  Target,
  PhoneForwarded,
  Coins,
  Bot,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats = [
    {
      icon: FileText,
      value: "12",
      label: "Total Campaigns",
      accentClassName: "bg-violet-100/50 dark:bg-violet-900/10",
      iconBackgroundClassName: "bg-violet-100",
      iconColorClassName: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: PhoneCall,
      value: "5.2k",
      label: "Total Calls",
      accentClassName: "bg-blue-100/50 dark:bg-blue-900/10",
      iconBackgroundClassName: "bg-blue-100",
      iconColorClassName: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: CheckCircle2,
      value: "4.8k",
      label: "Completed Calls",
      accentClassName: "bg-emerald-100/50 dark:bg-emerald-900/10",
      iconBackgroundClassName: "bg-emerald-100",
      iconColorClassName: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Target,
      value: "342",
      label: "Interested Leads",
      accentClassName: "bg-rose-100/50 dark:bg-rose-900/10",
      iconBackgroundClassName: "bg-rose-100",
      iconColorClassName: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: PhoneForwarded,
      value: "156",
      label: "Callbacks",
      accentClassName: "bg-amber-100/50 dark:bg-amber-900/10",
      iconBackgroundClassName: "bg-amber-100",
      iconColorClassName: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Coins,
      value: "$1,240",
      label: "Credits Remaining",
      accentClassName: "bg-cyan-100/50 dark:bg-cyan-900/10",
      iconBackgroundClassName: "bg-cyan-100",
      iconColorClassName: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Bot,
      value: "4",
      label: "Active Agents",
      accentClassName: "bg-fuchsia-100/50 dark:bg-fuchsia-900/10",
      iconBackgroundClassName: "bg-fuchsia-100",
      iconColorClassName: "text-fuchsia-600 dark:text-fuchsia-400",
    },
    {
      icon: TrendingUp,
      value: "92.4%",
      label: "Success Rate",
      accentClassName: "bg-emerald-100/50 dark:bg-emerald-900/10",
      iconBackgroundClassName: "bg-emerald-100",
      iconColorClassName: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const activityItems = [
    {
      title: "Campaign Scheduled",
      description: '"Holiday Special" was scheduled for Nov 20.',
      time: "10 mins ago",
      outerDotClassName: "bg-emerald-100 dark:bg-emerald-500/20",
      innerDotClassName: "bg-emerald-500",
    },
    {
      title: "Lead Generated",
      description: "Diana Evans expressed high interest.",
      time: "2 hours ago",
      outerDotClassName: "bg-rose-100 dark:bg-rose-500/20",
      innerDotClassName: "bg-rose-500",
    },
    {
      title: "Calls Completed",
      description: '"Q4 Outreach" completed 450/1200 calls.',
      time: "Yesterday",
      outerDotClassName: "bg-blue-100 dark:bg-blue-500/20",
      innerDotClassName: "bg-blue-500",
    },
    {
      title: "Campaign Created",
      description: '"New Feature Announcement" drafted by Admin.',
      time: "Oct 12",
      outerDotClassName: "bg-violet-100 dark:bg-violet-500/20",
      innerDotClassName: "bg-violet-500",
    },
  ];

  const quickActions = [
    {
      href: "/call-manager",
      icon: Plus,
      title: "Create Campaign",
      hoverClassName: "hover:border-violet-400 hover:bg-violet-50 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/10",
      iconWrapperClassName: "bg-violet-100 dark:bg-violet-900/30",
      iconColorClassName: "text-violet-600 dark:text-violet-400",
      arrowHoverClassName: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
    {
      href: "/responses",
      icon: PhoneCall,
      title: "View Responses",
      hoverClassName: "hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10",
      iconWrapperClassName: "bg-blue-100 dark:bg-blue-900/30",
      iconColorClassName: "text-blue-600 dark:text-blue-400",
      arrowHoverClassName: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
    {
      href: "/leads",
      icon: Target,
      title: "Manage Leads",
      hoverClassName: "hover:border-rose-400 hover:bg-rose-50 dark:hover:border-rose-500/50 dark:hover:bg-rose-500/10",
      iconWrapperClassName: "bg-rose-100 dark:bg-rose-900/30",
      iconColorClassName: "text-rose-600 dark:text-rose-400",
      arrowHoverClassName: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
    {
      href: "/campaign",
      icon: FileText,
      title: "All Campaigns",
      hoverClassName: "hover:border-amber-400 hover:bg-amber-50 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10",
      iconWrapperClassName: "bg-amber-100 dark:bg-amber-900/30",
      iconColorClassName: "text-amber-600 dark:text-amber-400",
      arrowHoverClassName: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    },
  ];

  return (
    <DashboardShell title="Dashboard">
      <div className="flex flex-col gap-8 p-1 sm:p-4">
        
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Welcome back, Admin 👋</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Here is what's happening with your campaigns today.
            </p>
            <p className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">{currentDate}</p>
          </div>
          <button 
            onClick={() => router.push("/dashboard/call-manager")}
            className="flex w-max items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-indigo-500 hover:shadow-lg dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Bottom Section: Activity & Quick Links */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Recent Activity */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0B0F19]">
            <div className="flex items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Activity</h2>
              <Activity className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="p-6">
              <div className="relative border-l-2 border-zinc-100 pl-6 dark:border-zinc-800 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-white dark:bg-emerald-500/20 dark:ring-[#0B0F19]">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Campaign Scheduled</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">"Holiday Special" was scheduled for Nov 20.</p>
                  <span className="mt-1 block text-xs text-zinc-400">10 mins ago</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-rose-100 ring-4 ring-white dark:bg-rose-500/20 dark:ring-[#0B0F19]">
                    <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Lead Generated</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Diana Evans expressed high interest.</p>
                  <span className="mt-1 block text-xs text-zinc-400">2 hours ago</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white dark:bg-blue-500/20 dark:ring-[#0B0F19]">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Calls Completed</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">"Q4 Outreach" completed 450/1200 calls.</p>
                  <span className="mt-1 block text-xs text-zinc-400">Yesterday</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-violet-100 ring-4 ring-white dark:bg-violet-500/20 dark:ring-[#0B0F19]">
                    <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">Campaign Created</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">"New Feature Announcement" drafted by Admin.</p>
                  <span className="mt-1 block text-xs text-zinc-400">Oct 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0B0F19]">
            <div className="flex items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              {quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </DashboardShell>
  );
}
