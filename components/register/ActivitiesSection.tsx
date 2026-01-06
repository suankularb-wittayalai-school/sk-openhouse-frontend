import SegmentedButton from "@/components/common/SegmentedButton";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { StylableFC } from "@/utils/types/common";
import { user } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import Text from "@/components/common/Text";
import Chip from "@/components/common/Chip";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { person } from "@/utils/types/person";
import { useRouter } from "next/router";
import { parallel } from "radash";

const ActivitiesSection: StylableFC<{
  family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  };
  onFamilyChange: (family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  }) => void;
  onBack: () => void;
}> = ({ family, onFamilyChange, onBack }) => {
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
              icon={
                family.registrant.user.registered_events.length == 1
                  ? "check_small"
                  : undefined
              }
              variant={
                family.registrant.user.registered_events.length == 1
                  ? "primary"
                  : "primarySurface"
              }
              className="grow"
              onClick={() =>
                onFamilyChange({
                  ...family,
                  registrant: {
                    person: family.registrant.person,
                    user: {
                      ...family.registrant.user,
                      registered_events: [
                        "6bd53ff6-019e-44f4-9e78-e0153b8eed7a",
                      ],
                    },
                  },
                })
              }
            >
              เข้าร่วม
            </Button>
            <Button
              icon={
                family.registrant.user.registered_events.length !== 1
                  ? "check_small"
                  : undefined
              }
              variant={
                family.registrant.user.registered_events.length !== 1
                  ? "primary"
                  : "primarySurface"
              }
              className="grow"
              onClick={() =>
                onFamilyChange({
                  ...family,
                  registrant: {
                    person: family.registrant.person,
                    user: { ...family.registrant.user, registered_events: [] },
                  },
                })
              }
            >
              ไม่เข้าร่วม
            </Button>
          </SegmentedButton>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button
          icon="chevron_left"
          variant="outline"
          onClick={() => onBack()}
          className="w-10 shrink-0 *:p-0"
        />
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            const { child, ...formattedPerson } = family.registrant.person;
            const adults = [...family.adult];
            const formattedAdults = [];
            const children = [...family.child];
            for (const child of children) {
              child.child.expected_graduation_year = Number(
                child.child.expected_graduation_year,
              );
            }
            for (const adult of adults) {
              const { child, ...formattedAdult } = adult;
              if (formattedAdult.tel?.length == 0) {
                formattedAdult.tel = "";
              }
              formattedAdults.push(formattedAdult);
            }
            parallel(formattedAdults.length, formattedAdults, (adult) => {
              return fetchAPI("/v1/user/family", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adult),
              });
            });
            parallel(children.length, children, (child) => {
              return fetchAPI("/v1/user/family", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(child),
              });
            });
            fetchAPI("/v1/user/onboard", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formattedPerson,
                event_expectations: family.registrant.user.event_expectations
                  ? family.registrant.user.event_expectations.length == 0
                    ? undefined
                    : family.registrant.user.event_expectations
                  : undefined,
                registered_events: family.registrant.user.registered_events,
              }),
            }).then((res) => {
              if (res.ok) router.push("/me");
            });
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ActivitiesSection;
