export type User = {
  id: string;
  created_at: string;
  email: string;
  last_login_at: string | null;
  profile_url: string | null;
  onboarded_at: string | null;
  event_expectations?: string;
  registered_events?: string[];
};

export type OnboardResponse = {
  auth_token?: string;
  user_id: string;
  person_id: string;
};
