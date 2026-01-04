import SegmentedButton from "@/components/common/SegmentedButton";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { StylableFC } from "@/utils/types/common";
import { user } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import Text from "@/components/common/Text";
import Chip from "@/components/common/Chip";
import fetchAPI from "@/utils/helpers/fetchAPI";
import {
  person,
  gender,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { useRouter } from "next/router";

const ActivitiesSection: StylableFC<{
  user: user;
  person: person;
  onUserChange: (user: user) => void;
}> = ({ user, person, onUserChange }) => {
  const t = useTranslations("register.activity");
  const router = useRouter();
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
      <Button
        variant="primary"
        onClick={() => {
          const { child, ...formattedPerson } = person;
          const registeredEvent = user.is_attending_seminar
            ? ["6bd53ff6-019e-44f4-9e78-e0153b8eed7a"]
            : [];

          fetchAPI("/v1/user/onboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formattedPerson,
              event_expectations: user.event_expectations,
              registered_events: registeredEvent,
            }),
          }).then((res) => {
            if (res.ok) router.push("/me");
          });
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ActivitiesSection;
