import React from "react";
import { X } from "lucide-react";

interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function DetailsDrawer({ isOpen, onClose, title, children }: DetailsDrawerProps) {
  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-zinc-900/20 backdrop-blur-sm transition-opacity duration-300 dark:bg-black/40 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`relative z-10 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-l dark:border-zinc-800 dark:bg-[#0B0F19] sm:max-w-lg md:max-w-xl lg:max-w-2xl h-full flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {children}
        </div>
      </div>
    </div>
  );
}
