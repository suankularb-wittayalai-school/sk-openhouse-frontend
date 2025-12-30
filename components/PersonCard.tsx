// Imports
import { StylableFC } from "@/utils/types/common";
import { gender, person } from "@/utils/types/person";
import {
  FaceOutlined,
  Face4Outlined,
  Face5Outlined,
} from "@mui/icons-material";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import { useTranslations } from "next-intl";
import { differenceInYears } from "date-fns";
import constructName from "@/utils/helpers/constructName";
import { pick } from "radash";

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
      {person.is_child ? (
        <Face5Outlined className="text-primary" />
      ) : person.gender == gender.female ? (
        <Face4Outlined className="text-primary" />
      ) : (
        <FaceOutlined className="text-primary" />
      )}
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
