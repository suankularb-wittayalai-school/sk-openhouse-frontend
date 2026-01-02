// Imports
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { pick } from "radash";
import MaterialIcon from "@/components/common/MaterialIcon";

/**
 * A card that shows if a child is linked to a passport or not and allows the
 * user to link his / her child to a passport.
 * @param person The person (child) to show.
 */
const PassportLinkCard: StylableFC<{ person: person; }> = ({ person }) => {
  const isLinked = !!person.child.passport_id;
  return (
    <div className={cn("border-primary-border text-primary flex items-center border-t p-2 first:border-t-0")}>
      <MaterialIcon icon="face_5" />
      <Text type="title" className="ml-2">
        {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
      </Text>
      <Button
        className={cn(
          "ml-auto h-8! rounded-lg!",
          isLinked ? "border-primary-border border" : null,
        )}
        variant={isLinked ? "transparent" : "primary"}
        onClick={() => {}}
        disabled={isLinked}
      >
        {isLinked ? "เชื่อมแล้ว" : "เชื่อม"}
      </Button>
    </div>
  );
};

export default PassportLinkCard;
