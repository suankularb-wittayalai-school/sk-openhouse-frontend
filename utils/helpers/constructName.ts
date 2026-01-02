// Imports
import { person } from "@/utils/types/person";
import { useTranslations } from "next-intl";

/**
 * A function that connects the prefix, firstname and lastname of a person into
 * a single string.
 * @param personName An object containing the person prefix, firstname and
 * last name.
 */
export default function constructName(
  personName: Pick<person, "prefix" | "firstname" | "lastname">,
) {
  const t = useTranslations("person.prefix");
  return (
    t(personName.prefix) + personName.firstname + " " + personName.lastname
  );
}
