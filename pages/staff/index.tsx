import Button from "@/components/common/Button";
import StaffConfirmDialog from "@/components/staff/StaffConfirmDialog";
import StaffPassportScanDialog from "@/components/staff/StaffPassportScanDialog";
import StaffSwitchActivityCard from "@/components/staff/StaffSwitchActivityCard";
import StaffSwitchActivityDialog from "@/components/staff/StaffSwitchActivityDialog";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import { Passport } from "@/utils/types/passport";
import { Activity } from "@/utils/types/staff";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";

const StaffPage: FC<{ activities: Activity[] }> = ({ activities }) => {
  const t = useTranslations("staff");
  const [selectedActivity, setSelectedActivity] = useState<Activity>(
    activities[0],
  );
  const [openSwitchDialog, setOpenSwitchDialog] = useState<boolean>(false);
  const [openPassportScanDialog, setOpenPassportScanDialog] =
    useState<boolean>(false);
  const [openPassportConfirmDialog, setOpenPassportConfirmDialog] =
    useState<boolean>(false);
  const [passportUrl, setPassportUrl] = useState<string | undefined>();
  const [passport, setPassport] = useState<Passport | undefined>();
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

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
    if (selectedActivity.number == null) {
      setIsRedeeming(true);
    } else setIsRedeeming(false);
  }, [selectedActivity]);
  return (
    <div className="theme-orange flex flex-col gap-3">
      <StaffSwitchActivityCard
        selectedActivity={selectedActivity}
        onOpenSwitchDialog={() => setOpenSwitchDialog(true)}
      />
      {openSwitchDialog && (
        <StaffSwitchActivityDialog
          activities={activities}
          onChangeSelectedActivity={(activity: Activity) =>
            setSelectedActivity(activity)
          }
          onClose={() => setOpenSwitchDialog(false)}
        />
      )}
      <Button variant="primary" onClick={() => setOpenPassportScanDialog(true)}>
        {t("action.addPoint")}
      </Button>
      {openPassportScanDialog && (
        <StaffPassportScanDialog
          title={selectedActivity.name}
          subTitle={
            isRedeeming ? t("passport.scanPassport") : t("action.addPoint")
          }
          setUrl={(url: string) => setPassportUrl(url)}
          onClose={() => setOpenPassportScanDialog(false)}
        />
      )}
      {passport &&
        typeof passport.child !== "string" &&
        openPassportConfirmDialog && (
          <StaffConfirmDialog
            title={t("title.confirmAddPoint")}
            onClose={() => setOpenPassportConfirmDialog(false)}
            onCancel={() => setOpenPassportConfirmDialog(false)}
            onConfirm={async () => {
              if (isRedeeming) {
              } else {
                await fetchAPI(`/v1/passport/${passport.id}/play`, {
                  method: "PUT",
                  body: JSON.stringify({ activity_id: selectedActivity.id }),
                });
                setPassport(undefined);
                setPassportUrl(undefined);
                setOpenPassportConfirmDialog(false);
              }
            }}
            from={
              isRedeeming
                ? { icon: "", content: "" }
                : { icon: "flag", content: selectedActivity.name }
            }
            to={
              isRedeeming
                ? { icon: "", content: "" }
                : {
                    icon: "qr_code_scanner",
                    content:
                      passport.child.firstname + " " + passport.child.lastname,
                  }
            }
          />
        )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const messages = await getStaticTranslations("common", "staff");
  const body = await fetchAPI<Activity[]>("/v1/activities", {}, req.cookies);
  let activities;
  if (body.success) {
    activities = body.data;
    activities.push({ name: "แลกของรางวัล", location: "ใต้อาคาร 123 ปีฯ" });
  }
  return { props: { messages, activities } };
};

export default StaffPage;
