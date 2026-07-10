import { CallLog } from "./types";

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const generateRandomPhone = () => {
  const area = Math.floor(Math.random() * 800) + 200;
  const prefix = Math.floor(Math.random() * 800) + 200;
  const line = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${prefix}-${line}`;
};

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const agents = ["Voice-A (Sales)", "Voice-B (Support)", "Voice-C (Followup)", "Voice-D (Survey)"];
const campaigns = ["Q3 Marketing Outreach", "Summer Promo", "Customer Retention", "Post-Sale Survey", "Lead Gen Alpha"];
const languages = ["English", "Spanish", "French"];

export const dummyCallLogs: CallLog[] = Array.from({ length: 30 }).map((_, i) => {
  const isCompleted = Math.random() > 0.3;
  const isFailed = !isCompleted && Math.random() > 0.5;
  
  let status: CallLog["status"] = "queued";
  if (isCompleted) status = "completed";
  else if (isFailed) status = "failed";
  else status = Math.random() > 0.5 ? "calling" : "queued";

  let response: CallLog["response"] = "no_answer";
  if (status === "completed") {
    response = getRandomItem(["interested", "callback", "not_interested"]);
  } else if (status === "failed") {
    response = getRandomItem(["busy", "no_answer"]);
  } else {
    response = "no_answer"; // For queued/calling
  }

  const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));

  return {
    id: `CLL-${1000 + i}`,
    name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
    phone: generateRandomPhone(),
    status,
    response,
    date: date.toISOString(),
    agent: getRandomItem(agents),
    campaign: getRandomItem(campaigns),
    duration: status === "completed" ? Math.floor(Math.random() * 300) + 30 : 0,
    language: getRandomItem(languages),
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with the business owner?" },
      { speaker: "customer", text: "Yes, this is them. Who is calling?" },
      { speaker: "agent", text: "Hi, I'm calling from CallingGen AI. We help automate customer outreach..." }
    ],
    summary: status === "completed" ? "The customer was engaged and asked a few questions about pricing. Good potential lead." : "Call did not connect successfully or was too short.",
    notes: "Follow up in two days if interested.",
  };
});
