import type { ChildPerson, Person } from "@/utils/types/person";

const REQUIRED_PERSON_FIELDS: (keyof Person)[] = [
  "firstname",
  "lastname",
  "birthdate",
] as const;

const REQUIRED_CHILD_FIELDS: (keyof ChildPerson["child"])[] = [
  "school",
  "expected_graduation_year",
  "next_grade",
] as const;

const isMissingRequiredTextField = (person: Partial<Person>): boolean => {
  for (const field of REQUIRED_PERSON_FIELDS) {
    if (typeof person[field] === "undefined") return true;
  }

  if (typeof person.child !== "undefined") {
    for (const field of REQUIRED_CHILD_FIELDS) {
      if (typeof person.child[field] === "undefined") return true;
    }
  }

  return false;
};

export default isMissingRequiredTextField;
