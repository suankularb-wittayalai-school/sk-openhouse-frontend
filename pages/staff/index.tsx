import StaffActivitySection from "@/components/staff/StaffActivitySection";
import StaffRedemptionSection from "@/components/staff/StaffRedemptionSection";
import StaffConfirmDialog from "@/components/staff/subcomponents/StaffConfirmDialog";
import StaffCurrentActivityRibbon from "@/components/staff/subcomponents/StaffCurrentActivityRibbon";
import StaffPassportScanDialog from "@/components/staff/subcomponents/StaffPassportScanDialog";
import StaffSwitchActivityDialog from "@/components/staff/subcomponents/StaffSwitchActivityDialog";
import { useUser } from "@/contexts/UserContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import { Passport } from "@/utils/types/passport";
import { Activity } from "@/utils/types/staff";
import { AnimatePresence } from "motion/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";

const StaffPage: FC<{ activities: Activity[] }> = ({ activities }) => {
  const t = useTranslations("staff");

  const { user } = useUser();

  const [selectedActivity, setSelectedActivity] = useState<number>(0);
  const [passportUrl, setPassportUrl] = useState<string | undefined>();
  const [passport, setPassport] = useState<Passport | undefined>();
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

  const [openSwitchDialog, setOpenSwitchDialog] = useState<boolean>(false);
  const [openPassportScanDialog, setOpenPassportScanDialog] =
    useState<boolean>(false);
  const [openPassportConfirmDialog, setOpenPassportConfirmDialog] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchPassport = async () => {
      const passportId = passportUrl?.split("/").at(-1);
      const body = await fetchAPI<Passport>(
        `/v1/passport/${passportId}?detailed=true`,
      );
      if (body.success) {
        setPassport(body.data);
        setOpenPassportConfirmDialog(true);
      }
    };
    if (passportUrl !== undefined) fetchPassport();
  }, [passportUrl]);

  useEffect(() => {
    if (selectedActivity == null) {
      setIsRedeeming(true);
    } else setIsRedeeming(false);
  }, [selectedActivity]);

  useEffect(() => {
    console.log(user);
    console.log(activities);
  }, [user, activities]);

  if (!user) return;

  return (
    <div data-theme="orange" className="p-3 pt-0">
      <div className="flex flex-col gap-6">
        <StaffCurrentActivityRibbon
          selectedActivity={activities[selectedActivity]}
          onOpenSwitchDialog={() => setOpenSwitchDialog(true)}
        />

        {selectedActivity != activities.length - 1 ? (
          <StaffActivitySection
            user={user}
            activities={activities}
            selectedActivity={selectedActivity}
            setOpenPassportScanDialog={() => setOpenPassportScanDialog(true)}
          />
        ) : (
          <StaffRedemptionSection />
        )}
      </div>
      <AnimatePresence>
        {openSwitchDialog && (
          <StaffSwitchActivityDialog
            activities={activities}
            onChangeSelectedActivity={(activity: number) =>
              setSelectedActivity(activity)
            }
            onClose={() => setOpenSwitchDialog(false)}
          />
        )}
        {openPassportScanDialog && (
          <StaffPassportScanDialog
            title={activities[selectedActivity].name}
            subTitle={
              isRedeeming ? t("passport.scanPassport") : t("action.addPoint")
            }
            setUrl={(url: string) => setPassportUrl(url)}
            onClose={() => setOpenPassportScanDialog(false)}
          />
        )}
        {passport && openPassportConfirmDialog && (
          <StaffConfirmDialog
            title={t("title.confirmAddPoint")}
            onClose={() => setOpenPassportConfirmDialog(false)}
            onCancel={() => setOpenPassportConfirmDialog(false)}
            onConfirm={async () => {
              if (isRedeeming) {
              } else {
                await fetchAPI(`/v1/passport/${passport.id}/play`, {
                  method: "PUT",
                  body: JSON.stringify({
                    activity_id: activities[selectedActivity].id,
                  }),
                });
                setPassport(undefined);
                setPassportUrl(undefined);
                setOpenPassportConfirmDialog(false);

                // window.location.reload();
              }
            }}
            from={
              isRedeeming
                ? { icon: "", content: "" }
                : { icon: "flag", content: activities[selectedActivity].name }
            }
            to={
              isRedeeming
                ? { icon: "", content: "" }
                : {
                    icon: "qr_code_scanner",
                    content: passport.child
                      ? passport.child.firstname + " " + passport.child.lastname
                      : "พาสปอร์ตกระดาษ (ยังไม่ได้เชื่อม)",
                  }
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const messages = await getStaticTranslations("common", "person", "staff");

  const body = await fetchAPI<Activity[]>("/v1/activities", {}, req.cookies);
  let activities;
  if (body.success) {
    activities = body.data;
    activities.push({
      number: 11,
      name: "แลกของรางวัล",
      location: "ใต้อาคาร 123 ปีฯ",
    });
  }
  return { props: { messages, activities } };
};

export default StaffPage;
