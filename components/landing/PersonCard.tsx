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
import MaterialIcon from "../common/MaterialIcon";

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
    <Card style={style} className={cn("items-center self-center", className)}>
      {count && (
        <Text type="body" className="opacity-100!">
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
      <div className="flex flex-col">
        <Text type="title">
          {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
        </Text>
        <Text type="body">
          {t(`relationshipToChild.${person.relationship_to_child}`) +
            " • " +
            differenceInYears(new Date(), person.birthdate) +
            " " +
            t("year")}
        </Text>
      </div>
    </Card>
  );
};

export default PersonCard;
