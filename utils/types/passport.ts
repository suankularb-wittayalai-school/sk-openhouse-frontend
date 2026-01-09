export type Activity = {
  id: string;
  created_at: string;
  number: number;
  name: string;
  location: string;
};

export enum PassportType {
  Digital = "digital",
  Physical = "physical",
}

export enum PrizeTier {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type Passport = UnredeemedPassport | RedeemedPassport;

export type BasePassport = {
  id: string;
  created_at: string;
  format: PassportType;
  completed_activities: string[];
};

export type UnredeemedPassport = {
  child_id: string | null; // `null` means unlinked, which also means the format *should* be `physical`
  redeemed_at: undefined;
  redeemed_points: undefined;
  redeemed_tier: undefined;
} & BasePassport;

export type RedeemedPassport = {
  child_id: string;
  redeemed_at: string;
  redeemed_points: number;
  redeemed_tier: PrizeTier;
} & BasePassport;
