import { person } from "@/utils/types/person";
import { user } from "@/utils/types/user";

export default function isMissingRequiredTextField(
  type: "registrant" | "adult" | "child",
  person: person,
  user?: user,
): boolean {
  // Required for everyone
  const REQUIRED_PERSON_FIELDS: (keyof person)[] = [
    "firstname",
    "lastname",
    "birthdate",
  ];
  const REQUIRED_CHILD_FIELDS: (keyof person["child"])[] = [
    "nickname",
    "school",
  ];
  // Only registrants have users
  const REQUIRED_USER_FIELDS: (keyof user)[] = ["event_expectations"];
  for (let field of REQUIRED_PERSON_FIELDS) {
    if (!person[field]) return true;
  }
  if (type == "child") {
    for (let field of REQUIRED_CHILD_FIELDS) {
      if (!person.child[field]) return true;
    }
  }
  if (type == "registrant" && user) {
    for (let field of REQUIRED_USER_FIELDS) {
      if (!user[field]) return true;
    }
  }
  return false;
}
