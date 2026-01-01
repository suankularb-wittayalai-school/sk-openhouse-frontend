import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";

const ActivityCard: StylableFC<{ activity: string; location: string }> = ({
  activity,
  location,
}) => {
  return (
    <Card>
      <Text type="title">
        <span>{activity}</span>
        <br />
        <span className="text-on-surface-variant text-[12px]">{location}</span>
      </Text>
    </Card>
  );
};

export default ActivityCard;
