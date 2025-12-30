// Imports
import { StylableFC } from "@/utils/types/common";
import { scheduleItem } from "@/utils/types/schedule";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";

/**
 * A card that shows information of a schedule item.
 * @param scheduleItem The schedule item to show.
 */
const ScheduleCard: StylableFC<{ scheduleItem: scheduleItem }> = ({
  scheduleItem,
}) => {
  return (
    <Card>
      <div className="flex flex-col">
        <Text type="title">{scheduleItem.name}</Text>
        <Text type="body">
          {scheduleItem.start_time +
            " - " +
            scheduleItem.end_time +
            " น." +
            " • " +
            scheduleItem.description}
        </Text>
      </div>
    </Card>
  );
};

export default ScheduleCard;
