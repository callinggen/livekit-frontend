import { type LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  accentClassName: string;
  iconBackgroundClassName: string;
  iconColorClassName: string;
};

export function StatCard({
  icon: Icon,
  value,
  label,
  accentClassName,
  iconBackgroundClassName,
  iconColorClassName,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-[#0B0F19]">
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${accentClassName} transition-transform group-hover:scale-150`} />
      <div className="relative z-10 flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBackgroundClassName} ${iconColorClassName}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="relative z-10 mt-4">
        <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white">{value}</h3>
        <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  );
}
