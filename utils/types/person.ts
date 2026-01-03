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
 * The relationship of a person to his / her child(ren).
 */
export enum relationshipToChild {
  father = "father",
  mother = "mother",
  legal_guardian = "legal_guardian",
  other = "other",
}

export type person = {
  id?: string;
  prefix: prefix;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: gender;
  tel: string;
  is_child: boolean;
  relationship_to_child: relationshipToChild | undefined;
  child: {
    nickname: string | undefined;
    school: string | undefined;
    expected_graduation_year: number | undefined;
    passport_id: string | null | undefined;
  };
};
