"use client";

import {
  Bot,
  PhoneOutgoing,
  BarChart3,
  Languages,
  Plug,
  Clock,
} from "lucide-react";

const features = [
  {
    title: "AI Voice Agents",
    desc: "Natural, human-sounding conversations powered by cutting-edge AI language models.",
    icon: Bot,
  },
  {
    title: "Bulk Calling",
    desc: "Reach thousands of customers automatically with intelligent scheduling and retry logic.",
    icon: PhoneOutgoing,
  },
  {
    title: "Call Analytics",
    desc: "Track every call outcome, conversion rate, and sentiment with real-time dashboards.",
    icon: BarChart3,
  },
  {
    title: "Multi-Language",
    desc: "Talk to customers in their preferred language with support for 20+ languages.",
    icon: Languages,
  },
  {
    title: "CRM Integrations",
    desc: "Seamlessly connect with Salesforce, HubSpot, Zoho, and your existing workflow tools.",
    icon: Plug,
  },
  {
    title: "24/7 Availability",
    desc: "AI agents never sleep, never miss a call, and maintain consistent quality around the clock.",
    icon: Clock,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose <span className="gradient-text">CallingGen</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to automate your calling operations with
            AI-powered voice agents.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="animate-fade-up group rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}