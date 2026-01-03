// Imports
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import { StylableFC } from "@/utils/types/common";
import { gender, person } from "@/utils/types/person";
import { differenceInYears } from "date-fns";
import { useTranslations } from "next-intl";
import { pick } from "radash";
import MaterialIcon from "@/components/common/MaterialIcon";

/**
 * A card that shows details of a person.
 * @param person The person to show.
 * @param count Number to show at the begining of the card. (optional)
 */
const PersonCard: StylableFC<{ person: person; count?: number }> = ({
  person,
  count,
  style,
  className,
}) => {
  const t = useTranslations("person");

  return (
    <div
      style={style}
      className={cn(
        `border-primary-border text-primary flex gap-2 items-center border-t p-2
        first:border-t-0`,
        className,
      )}
    >
      {count && (
        <Text type="body" className="opacity-100! text-right w-4">
          {count + ". "}
        </Text>
      )}
      <MaterialIcon
        icon={
          person.is_child
            ? "face_5"
            : person.gender == gender.female
              ? "face_4"
              : "face"
        }
      />
      <div className={cn("flex grow", !count ? "flex-col" : "items-center justify-between")}>
        <Text type="title">
          {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
        </Text>

        <Text type="body">
          {(person.is_child
            ? t("isChild")
            : t(`relationshipToChild.${person.relationship_to_child}`)) +
            (!count
              ? " • " +
                differenceInYears(new Date(), person.birthdate) +
                " " +
                t("year")
              : "")}
        </Text>
      </div>
    </div>
  );
};

export default PersonCard;
