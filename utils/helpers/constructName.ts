// Imports
import { person } from "@/utils/types/person";

/**
 * A function that connects the prefix, firstname and lastname of a person into
 * a single string.
 * @param personName An object containing the person prefix, firstname and
 * last name.
 */
export default function constructName(
  personName: Pick<person, "prefix" | "firstname" | "lastname">,
) {
  const PREFIX = {
    master: "ด.ช.",
    mr: "นาย",
    miss: "ด.ญ.",
    ms: "นางสาว",
    mrs: "นาง",
  };
  return (
    PREFIX[personName.prefix] +
    " " +
    personName.firstname +
    " " +
    personName.lastname
  );
}
