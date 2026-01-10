export enum PassportType {
  Didital = "ditigal",
  Paper = "paper",
}

export enum PrizeTier {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type Passport = {
  id: string;
  created_at: string;
  child: string | { firstname: string; lastname: string; nickname: string };
  format: PassportType;
  redeemed_at: string | undefined;
  redeemed_points: number | undefined;
  redeemed_tier: PrizeTier | undefined;
  completed_activites: string[];
};
