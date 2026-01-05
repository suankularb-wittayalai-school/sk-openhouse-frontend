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
        <Text type="title" className="font-bold!">
          {scheduleItem.name}
        </Text>
        <div className="mt-1 flex flex-col gap-1">
          <Text type="title" className="text-tertiary!">
            {scheduleItem.description.split(" ณ ").length == 1
                  ? ""
                  : scheduleItem.description.split(" ณ ")[0]}
          </Text>
          <div className="flex gap-1">
            <div
              className="border-primary-border w-full max-w-max rounded-full
                border px-2 py-0.5"
            >
              <Text type="title" className="text-tertiary!">
                {scheduleItem.start_time.slice(0, 5) +
                  " - " +
                  scheduleItem.end_time.slice(0, 5) +
                  " น."}
              </Text>
            </div>
            <div
              className="border-primary-border w-full max-w-max rounded-full
                border px-2 py-0.5"
            >
              <Text type="title" className="text-tertiary!">
                {scheduleItem.description.split(" ณ ").length == 1
                  ? scheduleItem.description.split(" ณ ")[0]
                  : scheduleItem.description.split(" ณ ")[1]}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleCard;
