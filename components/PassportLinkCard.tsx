// Imports
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { pick } from "radash";
import MaterialIcon from "./common/MaterialIcon";

/**
 * A card that shows if a child is linked to a passport or not and allows the
 * user to link his / her child to a passport.
 * @param person The person (child) to show.
 */
const PassportLinkCard: StylableFC<{ person: person }> = ({ person }) => {
  const isLinked = !!person.child.passport_id;
  return (
    <Card className="items-center">
      {/* 
        Generally, I don't think this method is *that* good since you wouldn't
        be able to know if this is an icon component if you don't know the name.

        Take a look at this approach, it might be better?

        - pixelpxed
      */}
      {/* <Face5Outlined className="text-primary" /> */}
      <MaterialIcon icon="face_5" />
      <Text type="title">
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
    </Card>
  );
};

export default PassportLinkCard;
