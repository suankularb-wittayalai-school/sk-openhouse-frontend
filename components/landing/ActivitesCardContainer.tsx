import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import ActivityCard from "@/components/landing/ActivityCard";

const ActivitesCardContainer: StylableFC<{
  activities: { name: string; location: string }[];
}> = ({ activities }) => {
  return (
    <>
      <Text type="body">กิจกรรม</Text>
      <div className="flex flex-col gap-1">
        {activities.map((activity) => (
          <ActivityCard activity={activity.name} location={activity.location} />
        ))}
      </div>
    </>
  );
};

export default ActivitesCardContainer;
