"use client";

import {
  Building2,
  GraduationCap,
  HeartPulse,
  Users,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const industries = [
  {
    name: "Real Estate",
    desc: "Automate property inquiries and schedule viewings effortlessly.",
    icon: Building2,
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Education",
    desc: "Student outreach, admissions follow-ups, and enrollment calls.",
    icon: GraduationCap,
    gradient: "from-violet-500/10 to-purple-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    name: "Healthcare",
    desc: "Appointment reminders and patient follow-ups at scale.",
    icon: HeartPulse,
    gradient: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    name: "Recruitment",
    desc: "Screen candidates and schedule interviews automatically.",
    icon: Users,
    gradient: "from-amber-500/10 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    name: "Insurance",
    desc: "Policy renewals, claims follow-ups, and lead qualification.",
    icon: ShieldCheck,
    gradient: "from-emerald-500/10 to-green-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Customer Support",
    desc: "24/7 automated support that resolves issues instantly.",
    icon: Headphones,
    gradient: "from-indigo-500/10 to-blue-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Industries
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Built for Every Industry
        </h2>
        <p className="mt-4 text-muted-foreground">
          Our AI voice agents adapt to your industry&apos;s unique needs and
          workflows.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, i) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.name}
              className="animate-fade-up group relative cursor-default overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Gradient bg on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${industry.iconColor} transition-all group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{industry.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {industry.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}