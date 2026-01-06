import type { Person } from "@/utils/types/person";

const isMissingRequiredTextField = (
  type: "registrant" | "adult" | "child",
  person: Person,
): boolean => {
  // Required for everyone
  const REQUIRED_PERSON_FIELDS: (keyof Person)[] = [
    "firstname",
    "lastname",
    "birthdate",
  ];
  const REQUIRED_CHILD_FIELDS: (keyof Person["child"])[] = [
    "nickname",
    "school",
  ];

  for (const field of REQUIRED_PERSON_FIELDS) {
    if (!person[field]) return true;
  }
  if (type == "child") {
    for (const field of REQUIRED_CHILD_FIELDS) {
      if (!person.child[field]) return true;
    }
  }

  return false;
};

export default isMissingRequiredTextField;
