import React from "react";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

export type SortDirection = "asc" | "desc" | null;

interface SortArrowProps {
  direction: SortDirection;
}

export default function SortArrow({ direction }: SortArrowProps) {
  if (direction === "asc") {
    return <ArrowUp className="ml-1 h-4 w-4 text-zinc-900 dark:text-white" />;
  }
  if (direction === "desc") {
    return <ArrowDown className="ml-1 h-4 w-4 text-zinc-900 dark:text-white" />;
  }
  return <ArrowUpDown className="ml-1 h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
}
