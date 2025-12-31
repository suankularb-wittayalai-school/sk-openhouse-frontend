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
import MaterialIcon from "./common/MaterialIcon";

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
  const t = useTranslations();
  const PREFIX = {
    master: "ด.ช.",
    mr: "นาย",
    miss: "ด.ญ.",
    ms: "นางสาว",
    mrs: "นาง",
  };
  return (
    <Card style={style} className={cn("items-center self-center", className)}>
      {count && (
        <Text type="body" className="opacity-100!">
          {count + ". "}
        </Text>
      )}

      {/* 
        Generally, I don't think this method is *that* good since you wouldn't
        be able to know if this is an icon component if you don't know the name.

        Take a look at this approach, it might be better?

        - pixelpxed
      */}
      {/* {person.is_child ? (
        <Face5Outlined className="text-primary" />
      ) : person.gender == gender.female ? (
        <Face4Outlined className="text-primary" />
      ) : (
        <FaceOutlined className="text-primary" />
      )} */}
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
