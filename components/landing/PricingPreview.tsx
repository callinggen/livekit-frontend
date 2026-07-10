"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function PricingPreview() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-12 text-center md:p-16">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Pricing
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent Pricing
          </h2>

          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Start with our Starter plan and scale your AI calling as your
            business grows.
          </p>

          <div className="mt-10">
            <span className="text-sm font-medium text-muted-foreground">
              Starting at
            </span>
            <div className="mt-2 text-6xl font-bold tracking-tight gradient-text md:text-7xl">
              ₹999
            </div>
            <span className="mt-2 inline-block text-sm text-muted-foreground">
              per month
            </span>
          </div>

          {/* Key features */}
          <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3">
            {[
              "1,000 AI calls per month",
              "Real-time analytics dashboard",
              "CRM integration included",
              "Multi-language support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/pricing"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all glow-primary hover:opacity-90 hover:shadow-xl active:scale-[0.97]"
          >
            View All Plans
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}