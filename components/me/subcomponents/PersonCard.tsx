import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import { type AdultPerson, Gender, type Person } from "@/utils/types/person";
import { differenceInYears } from "date-fns";
import { useTranslations } from "next-intl";
import { pick } from "radash";
import type { FC } from "react";

type PersonCardProps = { person: Person; count?: number };

/**
 * A card that shows details of a person.
 * @param person The person to show.
 * @param count Number to show at the begining of the card. (optional)
 */

const PersonCard: FC<PersonCardProps> = ({ person, count }) => {
  const t = useTranslations("person");

  const isChild = typeof person.child !== "undefined";
  const countIsSet = typeof count !== "undefined";

  return (
    <div
      className="border-primary-border text-primary flex items-center gap-2
        border-t p-2 first:border-t-0"
    >
      {count && (
        <Text type="body" className="w-4 text-right opacity-100!">
          {`${count}. `}
        </Text>
      )}
      <MaterialIcon
        icon={
          isChild
            ? "face_5"
            : person.gender === Gender.Female
              ? "face_4"
              : "face"
        }
      />
      <div
        className={cn(
          "flex grow",
          countIsSet ? "items-center justify-between" : "flex-col",
        )}
      >
        <Text type="title">
          {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
        </Text>

        <Text type="body">
          {(isChild
            ? t("isChild")
            : t(
                "relationshipToChild." +
                  (person as AdultPerson).relationship_to_child,
              )) +
            (countIsSet
              ? ""
              : " • " +
                differenceInYears(new Date(), person.birthdate) +
                " " +
                t("year"))}
        </Text>
      </div>
    </div>
  );
};

export default PersonCard;
