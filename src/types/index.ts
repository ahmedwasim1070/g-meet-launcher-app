// Types
export type ScheduleMeeting = {
  serial: number;
  name: string;
  date: number;
  type: "new" | "existing";
  url: string;
};
