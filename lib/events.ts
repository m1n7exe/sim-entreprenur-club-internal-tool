export type YenEventType =
  | "Networking"
  | "Workshop"
  | "Speaker"
  | "Competition"
  | "Social"
  | "Internal";

export type YenEvent = {
  id: number;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  type: YenEventType;
  description?: string;
  registrationUrl?: string;
};

export const events: YenEvent[] = [
  {
    id: 1,
    title: "Founder Networking Night",
    date: "2026-10-17",
    startTime: "18:30",
    endTime: "21:00",
    location: "SIM Management House",
    type: "Networking",
    description:
      "An evening of networking with startup founders and entrepreneurs.",
    registrationUrl: "https://example.com/register-founder-networking",
  },
  {
    id: 2,
    title: "Entrepreneurship Workshop",
    date: "2026-10-24",
    startTime: "14:00",
    endTime: "17:00",
    location: "SIM Block A",
    type: "Workshop",
    description:
      "A practical entrepreneurship workshop for SIM YEN members.",
  },
  {
    id: 3,
    title: "Committee Meeting",
    date: "2026-10-29",
    startTime: "19:00",
    endTime: "20:30",
    location: "SIM",
    type: "Internal",
    description: "Monthly SIM YEN committee meeting.",
  },
];