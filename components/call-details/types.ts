export type CallStatus = "completed" | "failed" | "queued" | "calling";

export type CallResponse = "interested" | "callback" | "not_interested" | "no_answer" | "busy";

export interface CallLog {
  id: string;
  name: string;
  phone: string;
  status: CallStatus;
  response: CallResponse;
  date: string;
  agent: string;
  campaign: string;
  duration: number; // in seconds
  language: string;
  transcript: Array<{ speaker: "agent" | "customer"; text: string }>;
  summary: string;
  notes: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig {
  key: keyof CallLog | null;
  direction: SortDirection;
}
