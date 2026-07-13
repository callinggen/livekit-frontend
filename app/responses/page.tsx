"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import DetailsDrawer from "@/components/shared/DetailsDrawer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Clock } from "lucide-react";
import { api, ResponseLog } from "@/lib/api";


const getStatusBadge = (status: string) => {
  const variantMap: Record<string, BadgeVariant> = {
    Completed: "success",
    Failed: "error",
  };
  return <Badge variant={variantMap[status] || "neutral"}>{status}</Badge>;
};

const getResponseBadge = (response: string) => {
  const variantMap: Record<string, BadgeVariant> = {
    Interested: "success",
    Callback: "warning",
    "Not Interested": "neutral",
    "No Answer": "neutral",
  };
  return <Badge variant={variantMap[response] || "neutral"}>{response}</Badge>;
};

export default function ResponsesPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [responses, setResponses] = useState<ResponseLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<ResponseLog | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callingSelection, setCallingSelection] = useState<ResponseLog[]>([]);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;
    api.getCalls()
      .then(data => setResponses(data))
      .catch(err => console.error("Failed to load calls:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const columns: Column<ResponseLog>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "phone", label: "Phone Number", sortable: true, render: (r) => <span className="font-mono text-xs">{r.phone}</span> },
    { key: "status", label: "Status", sortable: true, render: (r) => getStatusBadge(r.status) },
    { key: "response", label: "Response", sortable: true, render: (r) => getResponseBadge(r.response) },
    { key: "datetime", label: "Date & Time", sortable: true, render: (r) => <span className="text-xs">{r.datetime}</span> },
  ];

  const handleCallAgain = (selectedItems: ResponseLog[], clearSelection: () => void) => {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => clearSelection()}
          className="rounded-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
        >
          Clear Selection
        </Button>
        <Button
          onClick={() => {
            setCallingSelection(selectedItems);
            setShowCallModal(true);
          }}
          className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Call Again
        </Button>
      </>
    );
  };

  const confirmCall = () => {
    // Simulate call
    alert(`Calling ${callingSelection.length} contacts!`);
    setShowCallModal(false);
  };

  return (
    <DashboardShell title="Responses">
      <div className="flex flex-col h-[calc(100vh-80px)] p-1 sm:p-4">
        <section className="flex flex-col flex-1 gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Responses</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Review customer responses and quickly re-initiate follow-up calls.
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64 text-zinc-500">Loading responses...</div>
          ) : (
          <div className="flex-1 min-h-0">
            <DataTable 
              data={responses}
              columns={columns}
              searchableKeys={["name", "phone", "response", "status"]}
              filters={[
                { key: "status", label: "Status", options: [{label: "Completed", value: "Completed"}, {label: "Failed", value: "Failed"}] },
                { key: "response", label: "Response", options: [{label: "Interested", value: "Interested"}, {label: "Callback", value: "Callback"}, {label: "No Answer", value: "No Answer"}, {label: "Not Interested", value: "Not Interested"}] }
              ]}
              exportFileName="responses_export.xlsx"
              enableMultiSelect
              multiSelectActions={handleCallAgain}
              onRowClick={setSelectedResponse}
            />
          </div>
          )}
        </section>
      </div>

      <DetailsDrawer
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
        title="Customer Details"
      >
        {selectedResponse && (
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-zinc-500">Name</span><p className="font-semibold dark:text-white">{selectedResponse.name}</p></div>
                <div><span className="text-zinc-500">Phone</span><p className="font-semibold dark:text-white">{selectedResponse.phone}</p></div>
                <div><span className="text-zinc-500">Campaign</span><p className="font-semibold dark:text-white">{selectedResponse.campaign}</p></div>
                <div><span className="text-zinc-500">Status</span><p className="mt-1">{getStatusBadge(selectedResponse.status)}</p></div>
                <div><span className="text-zinc-500">Response</span><p className="mt-1">{getResponseBadge(selectedResponse.response)}</p></div>
                <div><span className="text-zinc-500">Duration</span><p className="font-semibold dark:text-white">{selectedResponse.duration}</p></div>
                {/* BUG-004: Display appointment date and time */}
                <div><span className="text-zinc-500">Appt. Date</span><p className="font-semibold dark:text-white">{selectedResponse.appointment_date || "—"}</p></div>
                <div><span className="text-zinc-500">Appt. Time</span><p className="font-semibold dark:text-white">{selectedResponse.appointment_time || "—"}</p></div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Call Details</h3>
              <div className="mb-4">
                <span className="text-zinc-500 text-sm">AI Summary</span>
                <p className="font-medium dark:text-zinc-300 mt-1">{selectedResponse.summary}</p>
              </div>
              <div className="mb-4">
                <span className="text-zinc-500 text-sm">Notes</span>
                <p className="font-medium dark:text-zinc-300 mt-1">{selectedResponse.notes}</p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recording</h3>
              {/* BUG-002: No recording infrastructure — show clear unavailable state */}
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-700">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Recording unavailable</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Call duration: {selectedResponse.duration || "—"}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Transcript</h3>
              <div className="flex flex-col gap-3">
                {selectedResponse.transcript.length > 0 ? selectedResponse.transcript.map((msg, i) => (
                  <div key={i} className={`flex ${msg.speaker === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.speaker === "agent" ? "bg-violet-600 text-white" : "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"}`}>
                      {msg.text}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-zinc-500">No transcript available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Call Again Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm dark:bg-black/60" onClick={() => setShowCallModal(false)} />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:border dark:border-zinc-800 dark:bg-[#121622]">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Call Selected Contacts?</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              You are about to start calls for {callingSelection.length} selected contacts.
            </p>
            <div className="mt-4 max-h-48 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
              {callingSelection.map(c => (
                <div key={c.id} className="flex items-center justify-between border-b border-zinc-100 p-3 last:border-0 dark:border-zinc-800">
                  <div>
                    <p className="text-sm font-semibold dark:text-white">{c.name}</p>
                    <p className="font-mono text-xs text-zinc-500">{c.phone}</p>
                  </div>
                  {getStatusBadge(c.status)}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCallModal(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmCall}
                className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Start Calling
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
