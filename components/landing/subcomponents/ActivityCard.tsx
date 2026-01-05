import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";

const ActivityCard: StylableFC<{ activity: string; location: string }> = ({
  activity,
  location,
}) => {
  return (
    <Card className="flex flex-col gap-0!">
      <Text type="title">{activity}</Text>
      <Text type="body">{location}</Text>
    </Card>
  );
};

export default ActivityCard;
