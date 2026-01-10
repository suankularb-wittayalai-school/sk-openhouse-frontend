import type { Person } from "@/utils/types/person";
import { useTranslations } from "next-intl";

/**
 * A function that connects the prefix, firstname and lastname of a person into
 * a single string.
 * @param personName An object containing the person prefix, firstname and
 * last name.
 */

const constructName = (
  personName: Pick<Person, "prefix" | "firstname" | "lastname">,
) => {
  // FIXME: We can fix this later
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("person.prefix");

  return (
    t(personName.prefix) +
    " " +
    personName.firstname +
    " " +
    personName.lastname
  );
};

export default constructName;
