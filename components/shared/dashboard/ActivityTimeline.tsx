type ActivityItem = {
  title: string;
  description: string;
  time: string;
  outerDotClassName: string;
  innerDotClassName: string;
};

type ActivityTimelineProps = {
  items: ActivityItem[];
};

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <div className="relative border-l-2 border-zinc-100 pl-6 dark:border-zinc-800 space-y-8">
      {items.map((item) => (
        <div key={item.title} className="relative">
          <div className={`absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full ${item.outerDotClassName} ring-4 ring-white dark:ring-[#0B0F19]`}>
            <div className={`h-2 w-2 rounded-full ${item.innerDotClassName}`} />
          </div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{item.title}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
          <span className="mt-1 block text-xs text-zinc-400">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
