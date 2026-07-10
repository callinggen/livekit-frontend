"use client";

import { Check, ArrowRight, Zap, Star, Building } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small businesses getting started with AI calls.",
    price: "₹999",
    period: "/month",
    icon: Zap,
    features: [
      "1,000 AI calls / month",
      "Basic analytics",
      "1 voice agent",
      "Email support",
      "Hindi & English",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "For growing teams that need more power and flexibility.",
    price: "₹4,999",
    period: "/month",
    icon: Star,
    features: [
      "10,000 AI calls / month",
      "Advanced analytics",
      "5 voice agents",
      "Priority support",
      "10+ languages",
      "CRM integrations",
      "Custom scripts",
    ],
    cta: "Start Growing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "Custom solutions for large-scale operations.",
    price: "Custom",
    period: "",
    icon: Building,
    features: [
      "Unlimited calls",
      "Real-time dashboards",
      "Unlimited agents",
      "Dedicated support",
      "All languages",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden py-24">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Pricing
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Plans that scale with{" "}
              <span className="gradient-text">your business</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              No hidden fees. No contracts. Cancel anytime.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`animate-fade-up relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-xl ${
                    plan.highlighted
                      ? "border-primary/40 bg-gradient-to-b from-primary/5 to-card shadow-xl scale-[1.03]"
                      : "border-border bg-card hover:-translate-y-1"
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        plan.highlighted
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{plan.name}</h2>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.desc}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/login"
                    className={`group mt-8 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.97] ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground shadow-lg glow-primary hover:opacity-90 hover:shadow-xl"
                        : "border border-border bg-secondary hover:bg-accent hover:border-primary/30 hover:shadow-md"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}