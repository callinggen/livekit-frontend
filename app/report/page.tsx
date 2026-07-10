"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { downloadFile } from "@/lib/utils";
import { FileText, Calendar, Download, Sparkles, Loader2, CheckCircle2, Clock } from "lucide-react";

export default function ReportPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const handleGenerate = () => {
    if (!startDate || !endDate) return;
    setIsGenerating(true);
    setReportGenerated(false);
    setDownloadMessage("");

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 3000);
  };

  const handleDownload = () => {
    if (!reportGenerated) return;

    const reportText = `CallingGen AI Report\nPeriod: ${startDate} to ${endDate}\n\nGenerated sections:\n${reportSections
      .map((section, index) => `${index + 1}. ${section}`)
      .join("\n")}`;

    downloadFile(reportText, `callinggen-report-${startDate}-to-${endDate}.txt`, "text/plain;charset=utf-8");
    setDownloadMessage("Report download started. Check your browser downloads.");
  };

  const reportSections = [
    "Executive Summary",
    "Call Volume Analysis",
    "Agent Performance Metrics",
    "Lead Classification Breakdown",
    "Conversion Funnel Analysis",
    "Campaign ROI Overview",
    "Customer Sentiment Analysis",
    "Response Time Distribution",
    "Peak Hours & Patterns",
    "Recommendations & Action Items",
  ];

  return (
    <DashboardShell title="Report">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* ── Hero Section (matching second image) ── */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
          {/* Title */}
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">AI Report Generator</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
            Generates a 10-section structured PDF report — no time data, facts only.
          </p>

          {/* Controls Bar */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 sm:flex-row">
            {/* Start Date */}
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-800">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none"
                id="report-start-date"
              />
            </div>

            <span className="text-xs font-medium text-zinc-400">to</span>

            {/* End Date */}
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-800">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none"
                id="report-end-date"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!startDate || !endDate || isGenerating}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              id="generate-report-btn"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate AI Report"}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!reportGenerated}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              id="download-report-btn"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>

          {downloadMessage ? (
            <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
              {downloadMessage}
            </p>
          ) : null}

          {/* Status / Placeholder */}
          <div className="mt-12 flex flex-col items-center">
            {isGenerating ? (
              <>
                <div className="relative mb-4">
                  <Sparkles className="h-12 w-12 text-violet-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-violet-400/20 animate-ping" />
                </div>
                <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                  Generating your AI report...
                </p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  Analyzing call data and preparing insights
                </p>
                {/* Progress Bar */}
                <div className="mt-4 h-1.5 w-64 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 animate-progress" />
                </div>
              </>
            ) : reportGenerated ? (
              <>
                <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500" />
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Report Generated Successfully!
                </p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  Your 10-section PDF report is ready for download
                </p>
              </>
            ) : (
              <>
                <Sparkles className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  Select a date and click generate
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── Report Preview (shown after generation) ── */}
        {reportGenerated && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Report Preview</h3>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Complete
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              {/* Report Meta */}
              <div className="border-b border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold">CallingGen AI Performance Report</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Period: {startDate} to {endDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" />
                    Generated just now
                  </div>
                </div>
              </div>

              {/* Sections List */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {reportSections.map((section, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 text-xs font-bold text-violet-700 dark:from-violet-900/40 dark:to-indigo-900/40 dark:text-violet-400">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{section}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        AI-generated analysis with data-driven insights
                      </p>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
