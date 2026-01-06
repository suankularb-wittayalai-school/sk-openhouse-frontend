export type User = {
  id?: string;
  email: string;
  onboarded_at: string | null;
  profile_url?: string;
  event_expectations: string;
  registered_events: string[];
};
