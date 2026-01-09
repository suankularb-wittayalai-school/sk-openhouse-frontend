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

export type CompactPassport = {
  firstname: string;
  lastname: string;
  nickname?: string;
};

export type Passport =
  | UnredeemedUnlinkedPassport
  | UnredeemedLinkedPassport
  | RedeemedPassport;

type BasePassport = {
  id: string;
  created_at: string;
  format: PassportType;
  completed_activities: string[];
};

type UnredeemedPassport = {
  redeemed_at: undefined;
  redeemed_points: undefined;
  redeemed_tier: undefined;
} & BasePassport;

export type UnredeemedUnlinkedPassport = {
  registrant: null;
  child: null;
} & UnredeemedPassport;

export type UnredeemedLinkedPassport = {
  registrant: CompactPassport;
  child: CompactPassport;
} & UnredeemedPassport;

export type RedeemedPassport = {
  registrant: CompactPassport;
  child: CompactPassport;
  redeemed_at: string;
  redeemed_points: number;
  redeemed_tier: PrizeTier;
} & BasePassport;
