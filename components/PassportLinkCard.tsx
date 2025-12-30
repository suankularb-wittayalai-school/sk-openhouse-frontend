// Imports
import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import { person } from "@/utils/types/person";
import { Face5Outlined } from "@mui/icons-material";
import Text from "@/components/common/Text";
import constructName from "@/utils/helpers/constructName";
import { pick } from "radash";
import Button from "@/components/common/Button";
import cn from "@/utils/helpers/cn";

/**
 * A card that shows if a child is linked to a passport or not and allows the
 * user to link his / her child to a passport.
 * @param person The person (child) to show.
 */
const PassportLinkCard: StylableFC<{ person: person }> = ({ person }) => {
  const isLinked = !!person.child.passport_id;
  return (
    <Card className="items-center">
      <Face5Outlined className="text-primary" />
      <Text type="title">
        {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
      </Text>
      <Button
        className={cn(
          "ml-auto !h-8 !rounded-lg",
          isLinked ? "border-primary-border border" : null,
        )}
        varient={isLinked ? "transparent" : "primary"}
        onClick={() => {}}
        disabled={isLinked}
      >
        {isLinked ? "เชื่อมแล้ว" : "เชื่อม"}
      </Button>
    </Card>
  );
};

export default PassportLinkCard;
