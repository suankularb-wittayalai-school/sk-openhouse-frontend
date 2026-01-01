import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import ActivityCard from "@/components/landing/subcomponents/ActivityCard";
import { useTranslations } from "next-intl";

const ActivitesCardContainer: StylableFC<{
  activities: { name: string; location: string }[];
}> = ({ activities }) => {
  const t = useTranslations("landing")
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.activity")}</Text>
      <div className="flex flex-col gap-1">
        {activities.map((activity, i) => (
          <ActivityCard activity={activity.name} location={activity.location} key={i}/>
        ))}
      </div>
    </div>
  );
};

export default ActivitesCardContainer;
