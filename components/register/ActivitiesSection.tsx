import SegmentedButton from "@/components/common/SegmentedButton";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { StylableFC } from "@/utils/types/common";
import { user } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import Text from "@/components/common/Text";
import Chip from "@/components/common/Chip";

const ActivitiesSection: StylableFC<{
  user: user;
  onUserChange: (user: user) => void;
}> = ({ user, onUserChange }) => {
  const t = useTranslations("register.activity");
  return (
    <div className="flex flex-col gap-6">
      <Text type="headline">{t("title")}</Text>
      <div className="flex flex-col gap-1">
        <Card className="flex flex-col">
          <div className="flex items-center gap-2">
            <Chip apperance="rounded" variant="surface">
              {t("chip")}
            </Chip>
            <Text type="title">{t("activityName")}</Text>
          </div>
          <SegmentedButton className="self-strech">
            <Button
              icon={user.is_attending_seminar ? "check_small" : undefined}
              variant={user.is_attending_seminar ? "primary" : "primarySurface"}
              className="grow"
              onClick={() =>
                onUserChange({ ...user, is_attending_seminar: true })
              }
            >
              เข้าร่วม
            </Button>
            <Button
              icon={!user.is_attending_seminar ? "check_small" : undefined}
              variant={
                !user.is_attending_seminar ? "primary" : "primarySurface"
              }
              className="grow"
              onClick={() =>
                onUserChange({ ...user, is_attending_seminar: false })
              }
            >
              ไม่เข้าร่วม
            </Button>
          </SegmentedButton>
        </Card>
      </div>
    </div>
  );
};

export default ActivitiesSection;
