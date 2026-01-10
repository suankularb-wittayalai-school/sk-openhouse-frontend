import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import { Activity } from "@/utils/types/staff";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const StaffCurrentActivityRibbon: StylableFC<{
  selectedActivity: Activity;
  onOpenSwitchDialog: () => void;
}> = ({ selectedActivity, onOpenSwitchDialog }) => {
  const t = useTranslations("staff");
  return (
    <Card
      className="bg-primary-surface items-center rounded-full! py-2
        pr-2"
    >
      <Text type="headline" element="h1" className="w-6 text-center">
        {selectedActivity?.number ? selectedActivity.number : "-"}
      </Text>
      <Text type="title" element="p" className="flex-1">
        {selectedActivity?.name ? selectedActivity.name : "-"}
      </Text>
      <Button variant="primary" onClick={() => onOpenSwitchDialog()}>
        {t("action.switch")}
      </Button>
    </Card>
  );
};

export default StaffCurrentActivityRibbon;
