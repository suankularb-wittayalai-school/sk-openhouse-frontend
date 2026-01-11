import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
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
  const [
    openPassportAlreadyScannedDialog,
    setOpenPassportAlreadyScannedDialog,
  ] = useState<boolean>(false);

  // To-do: Remove this dependency
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const storedSelectedActivity = localStorage.getItem(
      "skopen26-staffSelectedActivity",
    );
    if (storedSelectedActivity !== null) {
      setSelectedActivity(Number(storedSelectedActivity));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "skopen26-staffSelectedActivity",
      String(selectedActivity),
    );
    setIsRedeeming(selectedActivity == activities.length - 1);
  }, [selectedActivity]);

  useEffect(() => {
    const fetchPassport = async () => {
      const passportId = passportUrl?.split("/").at(-1);
      const body = await fetchAPI<Passport>(
        `/v1/passport/${passportId}?detailed=true`,
      );
      if (body.success) {
        setPassport(body.data);
        !isRedeeming && setOpenPassportConfirmDialog(true);
      }
    };
    if (passportUrl !== undefined) fetchPassport();
  }, [scanCount]);

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

        {!isRedeeming ? (
          <StaffActivitySection
            user={user}
            activities={activities}
            selectedActivity={selectedActivity}
            setOpenPassportScanDialog={() => setOpenPassportScanDialog(true)}
          />
        ) : (
          <StaffRedemptionSection
            passport={passport}
            activities={activities}
            setOpenPassportScanDialog={() => setOpenPassportScanDialog(true)}
          />
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
              isRedeeming ? t("action.scanPassport") : t("action.addPoint")
            }
            setUrl={(url: string) => {
              setPassportUrl(url);
              setScanCount((c) => c + 1);
            }}
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
                const res = await fetchAPI(`/v1/passport/${passport.id}/play`, {
                  method: "PUT",
                  body: JSON.stringify({
                    activity_id: activities[selectedActivity].id,
                  }),
                });

                if (res.success) {
                  setPassport(undefined);
                  setPassportUrl(undefined);
                  setOpenPassportConfirmDialog(false);
                  window.location.reload();
                } else {
                  setOpenPassportAlreadyScannedDialog(true);
                  setOpenPassportConfirmDialog(false);
                }
              }
            }}
            from={
              isRedeeming
                ? {
                    icon: "qr_code_scanner",
                    content: passport.child
                      ? passport.child.firstname + " " + passport.child.lastname
                      : "พาสปอร์ตกระดาษ (ยังไม่ได้เชื่อม)",
                  }
                : { icon: "flag", content: activities[selectedActivity].name }
            }
            to={
              isRedeeming
                ? { icon: "package_2", content: "" }
                : {
                    icon: "qr_code_scanner",
                    content: passport.child
                      ? passport.child.firstname + " " + passport.child.lastname
                      : "พาสปอร์ตกระดาษ (ยังไม่ได้เชื่อม)",
                  }
            }
          />
        )}
        {openPassportAlreadyScannedDialog && (
          <Dialog
            onClickOutside={() => setOpenPassportAlreadyScannedDialog(false)}
          >
            <div className="flex flex-col gap-2">
              <Text type="headline">ไม่สามารถให้คะแนนพาสปอร์ตนี้ได้</Text>
              <Text type="title" className="text-tertiary">
                พาสปอร์ตนี้อาจถูกแสกนไปแล้ว หากไม่ใช่ โปรดลองใหม่อีกครั้ง
              </Text>
            </div>
            <Button
              variant="primary"
              onClick={() => setOpenPassportAlreadyScannedDialog(false)}
            >
              ปิด
            </Button>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const messages = await getStaticTranslations("common", "person", "staff");

  let activities;
  const body = await fetchAPI<Activity[]>("/v1/activities", {}, req.cookies);
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
