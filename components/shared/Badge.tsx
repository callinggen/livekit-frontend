import React from "react";

export type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral" | "primary";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  let badgeClass = "";

  switch (variant) {
    case "success": // Hot, Completed, Interested
      badgeClass = "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400";
      break;
    case "warning": // Warm, Callback, Queued, Scheduled, Paused
      badgeClass = "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400";
      break;
    case "error": // Failed, Busy, Hot? (user said Hot is Red)
      badgeClass = "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400";
      break;
    case "info": // Calling, Running, Cold (user said Cold is Blue)
      badgeClass = "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400";
      break;
    case "neutral": // No Answer, Not Interested, Draft
      badgeClass = "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-400";
      break;
    case "primary":
      badgeClass = "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400";
      break;
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass} ${className}`}>
      {children}
    </span>
  );
}
