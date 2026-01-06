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

export type Person = {
  id?: string;
  created_at?: string;
  prefix: Prefix;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: Gender;
  tel?: string;
  is_child?: boolean;
  relationship_to_child?: RelationshipToChild;
  child: {
    nickname: string | undefined;
    school: string | undefined;
    expected_graduation_year: number | undefined;
    next_grade: SchoolGrade | undefined;
    passport_id: string | undefined;
  };
};

export type Family = {
  registrant: { user: User; person: Person };
  adult: Person[];
  child: Person[];
};
