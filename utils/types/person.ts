import { User } from "./user";

/**
 * The prefix of a person.
 */
export enum prefix {
  master = "master",
  mr = "mr",
  miss = "miss",
  ms = "ms",
  mrs = "mrs",
}

/**
 * The gender of a person.
 */
export enum gender {
  male = "male",
  female = "female",
  other = "other",
}

/**
 * The K12 grade options. To be used alongside expected_graduation_year
 */
export enum next_grade {
  m1 = "m1",
  m4 = "m4",
}

export enum track_interest {
  "ห้องเรียนพิเศษ GATE Program ม.1",
  "ห้องเรียนพิเศษ EPLUS+ ม.1",
  "ห้องเรียนวิทยาศาสตร์หุ่นยนต์ (โครงการปกติ) ม.1",
  "ห้องเรียนปกติ ม.1",
  "ห้องเรียนพิเศษ GATE Program ม.4",
  "ห้องเรียนพิเศษ Gifted Science ม.4",
  "ห้องเรียนพิเศษ EPLUS+ ม.4",
  "ห้องเรียนปกติ ม.4",
}

/**
 * The relationship of a person to his / her child(ren).
 */
export enum relationshipToChild {
  father = "father",
  mother = "mother",
  legal_guardian = "legal_guardian",
  other = "other",
}

export type Person = {
  id?: string;
  created_at?: string;
  prefix: prefix;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: gender;
  tel?: string;
  is_child?: boolean;
  relationship_to_child?: relationshipToChild;
  child: {
    nickname: string | undefined;
    school: string | undefined;
    expected_graduation_year: number | undefined;
    next_grade: string | undefined;
    passport_id?: string | undefined;
  };
};

export type Family = {
  registrant: { user: User; person: Person };
  adult: Person[];
  child: Person[];
};
