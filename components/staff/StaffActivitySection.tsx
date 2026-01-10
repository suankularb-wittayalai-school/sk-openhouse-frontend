import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import getTimeString from "@/utils/helpers/getTimeString";
import { Activity } from "@/utils/types/staff";
import { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import { FC } from "react";

const StaffActivitySection: FC<{
  user: User;
  activities: Activity[];
  selectedActivity: number;
  setOpenPassportScanDialog: () => void;
}> = ({ user, activities, setOpenPassportScanDialog }) => {
  const t = useTranslations("staff");
  const tx = useTranslations("person");

  function getActivityNumberFromID(id: string) {
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].id == id) {
        return activities[i].number;
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text type="body">การให้แต้มล่าสุดของคุณ</Text>
        {user && (
          <div className="border-primary-border rounded-lg border bg-white">
            {user.activity_logs && user.activity_logs.length != 0 ? (
              user.activity_logs.map((activity, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-primary-border flex items-center gap-2 p-2
                      not-first:border-t"
                  >
                    <MaterialIcon icon="face_5" className="text-primary" />
                    <div className="flex grow flex-col">
                      <Text type="title">
                        {activity.prefix &&
                        activity.firstname &&
                        activity.lastname
                          ? `${tx(`prefix.${activity.prefix}`)} ${
                              activity.firstname
                            } ${activity.lastname}`
                          : "พาสปอร์ตกระดาษ (ยังไม่ได้เชื่อม)"}
                      </Text>
                      <Text type="body">
                        ฐานที่ {getActivityNumberFromID(activity.activity_id)} •{" "}
                        {getTimeString(
                          new Date(activity.created_at),
                          "minutes",
                        ) + " น. "}
                        •{" "}
                        {activity.passport_format === "digital"
                          ? "ดิจิทัล"
                          : "กระดาษ"}
                      </Text>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-2">
                <Text type="body">ยังไม่มีประวัติการให้แต้ม</Text>
              </div>
            )}
          </div>
        )}
        <Button variant="primary" onClick={() => setOpenPassportScanDialog()}>
          {t("action.addPoint")}
        </Button>
      </div>
    </>
  );
};

export default StaffActivitySection;
