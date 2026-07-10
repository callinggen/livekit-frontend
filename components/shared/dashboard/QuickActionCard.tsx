import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  hoverClassName: string;
  iconWrapperClassName: string;
  iconColorClassName: string;
  arrowHoverClassName: string;
};

export function QuickActionCard({
  href,
  icon: Icon,
  title,
  hoverClassName,
  iconWrapperClassName,
  iconColorClassName,
  arrowHoverClassName,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-xl border border-zinc-200 p-5 transition ${hoverClassName}`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconWrapperClassName} ${iconColorClassName}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-bold text-zinc-900 dark:text-white">{title}</p>
        <ArrowRight className={`h-4 w-4 text-zinc-400 transition group-hover:translate-x-1 ${arrowHoverClassName}`} />
      </div>
    </Link>
  );
}
