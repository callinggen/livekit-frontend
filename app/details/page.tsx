"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column } from "@/components/shared/DataTable";
import DetailsDrawer from "@/components/shared/DetailsDrawer";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import { Phone } from "lucide-react";
import { dummyCallLogs } from "@/components/call-details/dummyData";
import { CallLog } from "@/components/call-details/types";

export default function DetailsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const getStatusBadge = (status: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      completed: "success",
      calling: "info",
      queued: "warning",
      failed: "error",
    };
    return <Badge variant={variantMap[status] || "neutral"}>{status}</Badge>;
  };

  const getResponseBadge = (response: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      interested: "success",
      callback: "warning",
      no_answer: "neutral",
      not_interested: "neutral",
      busy: "error",
    };
    return <Badge variant={variantMap[response] || "neutral"}>{response.replace("_", " ")}</Badge>;
  };

  const columns: Column<CallLog>[] = [
    { key: "name", label: "Customer", sortable: true },
    { key: "phone", label: "Phone", sortable: true, render: (c) => <span className="font-mono text-xs">{c.phone}</span> },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
    { key: "response", label: "Response", sortable: true, render: (c) => getResponseBadge(c.response) },
    { key: "agent", label: "AI Agent", sortable: true },
    { key: "date", label: "Date & Time", sortable: true, render: (c) => (
      <div className="flex flex-col">
        <span>{new Date(c.date).toLocaleDateString()}</span>
        <span className="text-[11px] text-zinc-400">{new Date(c.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    )}
  ];

  const uniqueStatuses = Array.from(new Set(dummyCallLogs.map(d => d.status)));
  const uniqueResponses = Array.from(new Set(dummyCallLogs.map(d => d.response)));
  const uniqueAgents = Array.from(new Set(dummyCallLogs.map(d => d.agent)));

  return (
    <DashboardShell title="Call Details">
      <div className="flex flex-col h-[calc(100vh-80px)] p-1 sm:p-4">
        {/* Call Logs Table */}
        <section className="flex flex-col flex-1 gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Call Logs</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Detailed records of all agent calls. Click on any row to view full details, transcripts, and AI summaries.
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <DataTable 
              data={dummyCallLogs}
              columns={columns}
              searchableKeys={["name", "phone", "agent"]}
              filters={[
                { key: "status", label: "Status", options: uniqueStatuses.map(s => ({ label: s.replace("_", " "), value: s })) },
                { key: "response", label: "Response", options: uniqueResponses.map(r => ({ label: r.replace("_", " "), value: r })) },
                { key: "agent", label: "Agent", options: uniqueAgents.map(a => ({ label: a, value: a })) },
              ]}
              exportFileName="call_logs.xlsx"
              onRowClick={setSelectedCall}
            />
          </div>
        </section>
      </div>

      <DetailsDrawer
        isOpen={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        title="Call Details"
      >
        {selectedCall && (
          <div className="flex flex-col gap-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-500">Status</span>
                <p className="mt-1">{getStatusBadge(selectedCall.status)}</p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-500">Response</span>
                <p className="mt-1">{getResponseBadge(selectedCall.response)}</p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-500">Duration</span>
                <p className="mt-1 text-sm font-bold dark:text-white">
                  {Math.floor(selectedCall.duration / 60)}m {selectedCall.duration % 60}s
                </p>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <span className="text-xs font-semibold text-zinc-500">Language</span>
                <p className="mt-1 text-sm font-bold dark:text-white">{selectedCall.language}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-[#121622]">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Profile</h3>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div><span className="text-zinc-500 block mb-0.5">Name</span><p className="font-semibold dark:text-white">{selectedCall.name}</p></div>
                <div><span className="text-zinc-500 block mb-0.5">Phone</span><p className="font-semibold font-mono dark:text-white">{selectedCall.phone}</p></div>
                <div><span className="text-zinc-500 block mb-0.5">Campaign</span><p className="font-semibold dark:text-white">{selectedCall.campaign}</p></div>
                <div><span className="text-zinc-500 block mb-0.5">Agent Assigned</span><p className="font-semibold dark:text-white">{selectedCall.agent}</p></div>
              </div>
            </div>

            {/* AI Summary & Notes */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-[#121622]">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">AI Call Summary</h3>
              <p className="mb-4 text-sm font-medium leading-relaxed dark:text-zinc-300">
                {selectedCall.summary}
              </p>
              <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
                <span className="text-xs font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider">Agent Notes</span>
                <p className="mt-1 text-sm font-medium text-yellow-900 dark:text-yellow-300">{selectedCall.notes}</p>
              </div>
            </div>

            {/* Recording Audio Player */}
            {selectedCall.duration > 0 && (
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-[#121622]">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recording</h3>
                <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-[#0B0F19]">
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50">
                    <Phone className="h-4 w-4" />
                  </button>
                  <div className="flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-1/3 rounded-full bg-violet-500"></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-500 shrink-0">00:12 / {Math.floor(selectedCall.duration / 60)}:{String(selectedCall.duration % 60).padStart(2, '0')}</span>
                </div>
              </div>
            )}

            {/* Transcript */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-[#121622]">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Transcript</h3>
              <div className="flex flex-col gap-3">
                {selectedCall.transcript.length > 0 ? selectedCall.transcript.map((msg, i) => (
                  <div key={i} className={`flex ${msg.speaker === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      msg.speaker === "agent" 
                        ? "bg-violet-600 text-white rounded-br-sm" 
                        : "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm border border-zinc-100 dark:border-zinc-700"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                )) : (
                  <div className="py-6 text-center text-sm text-zinc-500">No transcript available for this call.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </DashboardShell>
  );
}
