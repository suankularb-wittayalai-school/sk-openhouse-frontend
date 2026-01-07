import SegmentedButton from "@/components/common/SegmentedButton";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTranslations } from "next-intl";
import Text from "@/components/common/Text";
import Chip from "@/components/common/Chip";
import { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import { useRouter } from "next/router";
import { parallel } from "radash";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FamilyCreate } from "@/utils/types/person";
import { OnboardResponse } from "@/utils/types/user";
import { useUser } from "@/contexts/UserContext";

type EventsSectionProps = {
  formData: FamilyCreate;
  setFormData: Dispatch<SetStateAction<FamilyCreate>>;
  setRegisterationStep: Dispatch<SetStateAction<number>>;
};

const EventsSection: FC<EventsSectionProps> = ({
  formData,
  setFormData,
  setRegisterationStep,
}) => {
  const t = useTranslations("register.activity");
  const router = useRouter();
  const { setUser } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setRegisteredEvents = (events: string[]) =>
    setFormData((formData) => ({
      ...formData,
      registrant: {
        ...formData.registrant,
        registered_events: events,
      },
    }));

  const submitForm = async () => {
    const onboardUser = async () => {
      const body = await fetchAPI2<OnboardResponse>("/v1/user/onboard", {
        method: "POST",
        body: JSON.stringify(formData.registrant),
      });
      if (!body.success) throw new Error("Failed to onboard user");

      // If development, reset the auth token returned from the API
      if (
        process.env.NODE_ENV === "development" &&
        typeof body.data.auth_token !== "undefined"
      ) {
        localStorage.setItem("skopen26-sessionToken", body.data.auth_token);
        document.cookie = `auth_token=${body.data.auth_token}`;
        console.log("[dev] Saved `auth_token` to localStorage");
      }

      setUser((user) => ({
        ...user!,
        // It's not the accurate timestamp of the onboarding time present in the
        // auth token, but it's fine since we're only using it like its a boolean.
        onboarded_at: body.timestamp,
        event_expectations: formData.registrant.event_expectations,
        registered_events: formData.registrant.registered_events,
      }));

      console.log("Onboarded user: ", body.data.user_id);
    };

    const createFamilyMembers = async () => {
      const people = [...formData.adults, ...formData.children];
      if (people.length === 0) return;

      const personIds = await Promise.all(
        people.map(async (person) => {
          const body = await fetchAPI2<string>("/v1/user/family", {
            method: "POST",
            body: JSON.stringify(person),
          });
          if (!body.success) throw new Error("Failed to create person");

          return body.data;
        }),
      );

      console.log("Created person(s): ", personIds);
    };

    setIsSubmitting(true);
    await onboardUser();
    await createFamilyMembers();
    await router.push("/me");
  };

  return (
    <div className="flex flex-col gap-6">
      <Text type="headline">{t("title")}</Text>

      {/* Events to register */}
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
                formData.registrant.registered_events.length === 1
                  ? "check_small"
                  : undefined
              }
              variant={
                formData.registrant.registered_events.length === 1
                  ? "primary"
                  : "primarySurface"
              }
              className="grow"
              onClick={() =>
                setRegisteredEvents(["6bd53ff6-019e-44f4-9e78-e0153b8eed7a"])
              }
            >
              เข้าร่วม
            </Button>
            <Button
              icon={
                formData.registrant.registered_events.length !== 1
                  ? "check_small"
                  : undefined
              }
              variant={
                formData.registrant.registered_events.length !== 1
                  ? "primary"
                  : "primarySurface"
              }
              className="grow"
              onClick={() => setRegisteredEvents([])}
            >
              ไม่เข้าร่วม
            </Button>
          </SegmentedButton>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {/* Back button */}
        <Button
          icon="chevron_left"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => setRegisterationStep(2)}
          className="w-10 shrink-0 *:p-0"
        />

        {/* Confirm button */}
        <Button
          variant="primary"
          className="w-full"
          busy={isSubmitting}
          disabled={isSubmitting}
          onClick={submitForm}
        >
          ยืนยัน
        </Button>
      </div>
    </div>
  );
};

export default EventsSection;
