import { PassportType } from "@/utils/types/passport";

export type User = {
  id: string;
  created_at: string;
  email: string;
  firstname?: string;
  lastname?: string;
  last_login_at: string | null;
  profile_url: string | null;
  onboarded_at: string | null;
  event_expectations?: string;
  registered_events?: string[];
  is_admin?: boolean;
  activity_logs?: StaffActivityLog[];
};

// export type User = Guest | Staff;

// export type Guest = {
//   id: string;
//   created_at: string;
//   email: string;
//   last_login_at: string | null;
//   profile_url: string | null;
//   onboarded_at: string | null;
//   event_expectations?: string;
//   registered_events?: string[];
// };

// export type Staff = {
//   id: string;
//   created_at: string;
//   email: string;
//   firstname: string;
//   lastname: string;
//   last_login_at: string | null;
//   profile_url: string | null;
//   is_admin: boolean;
//   activity_logs: StaffActivityLog[];
// };

export type StaffActivityLog = {
  created_at: string;
  activity_id: string;
  prefix: string;
  firstname: string;
  lastname: string;
  passport_format: PassportType;
};

export type OnboardResponse = {
  auth_token?: string;
  user_id: string;
  person_id: string;
};
