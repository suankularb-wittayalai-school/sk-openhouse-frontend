import type { User } from "@/utils/types/user";

/**
 * The prefix of a person.
 */
export enum Prefix {
  Master = "master",
  Mr = "mr",
  Miss = "miss",
  Ms = "ms",
  Mrs = "mrs",
}

/**
 * The gender of a person.
 */
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

/**
 * The school grade options.
 */
export enum SchoolGrade {
  M1 = "m1",
  M4 = "m4",
}

/**
 * The relationship of a person to his / her child(ren).
 */
export enum RelationshipToChild {
  Father = "father",
  Mother = "mother",
  LegalGuardian = "legal_guardian",
  Other = "other",
}

export type Person = AdultPerson | ChildPerson;

type BasePerson = {
  id: string;
  created_at: string;
  prefix: Prefix;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: Gender;
  tel?: string;
};

export type AdultPerson = {
  relationship_to_child: RelationshipToChild;
} & BasePerson;

export type ChildPerson = { child: Child } & BasePerson;

export type Child = {
  nickname?: string;
  school: string;
  expected_graduation_year: number;
  next_grade: SchoolGrade;
  linked_passport_id?: string;
};

export type DeprecatedFamily = {
  registrant: { user: User; person: Person };
  adult: Person[];
  child: Person[];
};

export type FetchedFamily = {
  registrant: Person;
  family_members: Person[];
};

export type Family = {
  registrant: AdultPerson;
  adults: AdultPerson[];
  children: ChildPerson[];
};

export type FamilyCreate = {
  registrant: Partial<Omit<AdultPerson, "id" | "created_at">> & {
    event_expectations?: string;
    registered_events: string[];
  };
  adults: Partial<Omit<AdultPerson, "id" | "created_at">>[];
  children: Partial<Omit<ChildPerson, "id" | "created_at">>[];
};

export type FamilyUpdate = {
  registrant: Partial<Omit<AdultPerson, "created_at">> & {
    id: string;
    event_expectations?: string;
  };
  adults: Partial<Omit<AdultPerson, "created_at">>[];
  children: Partial<Omit<ChildPerson, "created_at">>[];
};
