import { StylableFC } from "@/utils/types/common";
import Dialog from "@/components/common/Dialog";
import { Activity } from "@/utils/types/staff";
import Text from "@/components/common/Text";
import Card from "@/components/common/Card";
import CardContainer from "@/components/common/CardContainer";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const StaffSwitchActivityDialog: StylableFC<{
  activities: Activity[];
  onChangeSelectedActivity: (activity: Activity) => void;
  onClose: () => void;
}> = ({ activities, onChangeSelectedActivity, onClose }) => {
  const t = useTranslations("staff");
  return (
    <Dialog className="bg-background gap-4" onClickOutside={() => onClose()}>
      <Text type="headline">{t("title.changeActivity")}</Text>
      <CardContainer>
        {activities.map((activity, idx) => (
          <Card
            className="hover:bg-primary/10 cursor-pointer flex-col p-2!
              transition-colors"
          >
            <div
              className="flex flex-col"
              onClick={() => {
                onChangeSelectedActivity(activity);
                onClose();
              }}
            >
              <Text type="title">{activity.name}</Text>
              <Text type="body">{activity.location}</Text>
            </div>
          </Card>
        ))}
      </CardContainer>
      <Button variant="primary" onClick={() => onClose()}>
        {t("action.close")}
      </Button>
    </Dialog>
  );
};

export default StaffSwitchActivityDialog;
