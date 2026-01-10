import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import { Activity } from "@/utils/types/staff";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const StaffSwitchActivityCard: StylableFC<{
  selectedActivity: Activity;
  onOpenSwitchDialog: () => void;
}> = ({ selectedActivity, onOpenSwitchDialog }) => {
  const t = useTranslations("staff");
  return (
    <Card
      className="theme-orange bg-primary-surface items-center
        !rounded-[62.4375rem] py-2 pr-2"
    >
      <Text type="headline">{selectedActivity.number}</Text>
      <Text type="title" className="flex-1">
        {selectedActivity.name}
      </Text>
      <Button variant="primary" onClick={() => onOpenSwitchDialog()}>
        {t("action.switch")}
      </Button>
    </Card>
  );
};

export default StaffSwitchActivityCard;
