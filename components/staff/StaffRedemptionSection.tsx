import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import StaffConfirmDialog from "@/components/staff/subcomponents/StaffConfirmDialog";
import cn from "@/utils/helpers/cn";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getFieldById from "@/utils/helpers/getFieldById";
import { Passport } from "@/utils/types/passport";
import { Activity } from "@/utils/types/staff";
import { AnimatePresence } from "motion/react";
import { FC, useState } from "react";

type PrizeLevels = "small" | "medium" | "large";

const StaffRedemptionSection: FC<{
  passport: Passport | undefined;
  activities: Activity[];
  setOpenPassportScanDialog: () => void;
}> = ({ passport, activities, setOpenPassportScanDialog }) => {
  const isRedeemed = passport && typeof passport.redeemed_tier !== "undefined";

  const [openRedemptionConfirmDialog, setOpenRedemptionConfirmDialog] =
    useState<boolean>(false);
  const [redeemLevel, setRedeemLevel] = useState<PrizeLevels>("small");

  // Get uncompleted activities by filtering out completed ones
  const completedActivities =
    passport && passport.completed_activities
      ? passport.completed_activities.map((item: any) => item)
      : [];
  const uncompletedActivities = activities
    .filter((activity) => !completedActivities.includes(activity.id))
    .slice(0, -1); // Remove the last item

  async function handleRedeemItem(size: PrizeLevels) {
    setRedeemLevel(size);
    setOpenRedemptionConfirmDialog(true);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text type="body">พาสปอร์ตปัจจุบัน</Text>
        <div
          className="border-primary-border flex flex-col rounded-lg border
            bg-white"
        >
          {passport ? (
            <>
              <div className="flex items-center gap-2 p-2">
                <MaterialIcon icon="face_5" className="text-primary" />
                <Text type="title">
                  {passport.child?.firstname} {passport.child?.lastname}
                </Text>
              </div>
              <div
                className="border-primary-border flex flex-col gap-3 border-t
                  p-3"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <Text type="body">ประเภทพาสปอร์ต</Text>
                    <Text type="title">
                      {passport.format == "digital"
                        ? "พาสปอร์ตดิจิทัล"
                        : "พาสปอร์ตกระดาษ"}
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <Text type="body">ผู้ปกครอง</Text>
                    <Text type="title">
                      {passport.registrant?.firstname}{" "}
                      {passport.registrant?.lastname}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Text type="body">การเข้าร่วมกิจกรรม</Text>
                  <div
                    className="border-primary-border flex flex-col rounded-lg
                      border"
                  >
                    <div className="flex items-center gap-2 p-2">
                      <MaterialIcon icon="check" className="text-primary" />
                      <div className="flex grow flex-wrap gap-1">
                        {completedActivities.map((item: any) => {
                          return (
                            <div
                              className="border-primary-border rounded-full
                                border px-2 py-1"
                            >
                              <Text type="title" className="text-tertiary">
                                ฐานที่{" "}
                                {getFieldById(item, "number", activities)}
                              </Text>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="border-primary-border flex items-center gap-2
                        border-t p-2"
                    >
                      <MaterialIcon icon="close" className="text-primary" />
                      <div className="flex grow flex-wrap gap-1">
                        {uncompletedActivities.map((item: any) => {
                          return (
                            <div
                              className="border-primary-border rounded-full
                                border px-2 py-1"
                            >
                              <Text type="title" className="text-tertiary">
                                ฐานที่{" "}
                                {getFieldById(item.id, "number", activities)}
                              </Text>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid min-h-32 place-items-center p-2">
              <Text type="body">ยังไม่มีพาสปอร์ต</Text>
            </div>
          )}
        </div>
        <Button variant="primary" onClick={() => setOpenPassportScanDialog()}>
          แสกนพาสปอร์ต
        </Button>
      </div>
      {/* TODO: REWRITE THIS PART */}
      {passport && (
        <div className="flex flex-col gap-2">
          <Text type="body">แลกของรางวัล</Text>
          <div
            className="border-primary-border flex flex-col rounded-lg border
              bg-white"
          >
            <div className="flex items-center gap-2 p-2">
              <MaterialIcon icon="package_2" className="text-primary" />
              <div className="flex grow flex-col">
                <Text type="title">ระดับ Starter</Text>
                <Text type="body">4-7 ฐาน</Text>
              </div>
              {isRedeemed ? (
                <Text type="body">ไม่มีสิทธิ์</Text>
              ) : completedActivities.length >= 4 ? (
                <Button
                  variant="primary"
                  className={cn(
                    `border-primary-border! ml-auto h-8! rounded-lg! border
                      [&>div]:px-2`,
                  )}
                  onClick={() => handleRedeemItem("small")}
                >
                  แลก
                </Button>
              ) : (
                <Text type="body">แต้มไม่พอ</Text>
              )}
            </div>
            <div
              className="border-primary-border flex items-center gap-2 border-t
                p-2"
            >
              <MaterialIcon icon="package_2" className="text-primary" />
              <div className="flex grow flex-col">
                <Text type="title">ระดับ Power-up</Text>
                <Text type="body">8-9 ฐาน</Text>
              </div>
              {isRedeemed ? (
                <Text type="body">ไม่มีสิทธิ์</Text>
              ) : completedActivities.length >= 8 ? (
                <Button
                  variant="primary"
                  className={cn(
                    `border-primary-border! ml-auto h-8! rounded-lg! border
                      [&>div]:px-2`,
                  )}
                  onClick={() => handleRedeemItem("medium")}
                >
                  แลก
                </Button>
              ) : (
                <Text type="body">แต้มไม่พอ</Text>
              )}
            </div>
            <div
              className="border-primary-border flex items-center gap-2 border-t
                p-2"
            >
              <MaterialIcon icon="package_2" className="text-primary" />
              <div className="flex grow flex-col">
                <Text type="title">ระดับ Ultimate</Text>
                <Text type="body">10 ฐาน</Text>
              </div>
              {isRedeemed ? (
                <Text type="body">ไม่มีสิทธิ์</Text>
              ) : completedActivities.length >= 10 ? (
                <Button
                  variant="primary"
                  className={cn(
                    `border-primary-border! ml-auto h-8! rounded-lg! border
                      [&>div]:px-2`,
                  )}
                  onClick={() => handleRedeemItem("large")}
                >
                  แลก
                </Button>
              ) : (
                <Text type="body">แต้มไม่พอ</Text>
              )}
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {passport && openRedemptionConfirmDialog && (
          <StaffConfirmDialog
            title={"ยืนยันการแลกของรางวัล"}
            onClose={() => setOpenRedemptionConfirmDialog(false)}
            onCancel={() => setOpenRedemptionConfirmDialog(false)}
            onConfirm={async () => {
              const res = await fetchAPI(
                `/v1/passport/${passport?.id ?? "missing_id"}/redeem`,
                {
                  method: "PUT",
                  body: JSON.stringify({ prize_tier: redeemLevel }),
                },
              );
              if (res.success) {
                return window.location.reload();
              } else {
                window.alert(
                  "เกิดข้อผิดพลาดขึ้น\nพาสปอร์ตนี้อาจแลกของรางวัลไปแล้ว\nหรือโปรดลองใหม่อีกครั้ง",
                );
                return window.location.reload();
              }
            }}
            from={{
              icon: "qr_code_scanner",
              content: passport.child
                ? passport.child.firstname + " " + passport.child.lastname
                : "พาสปอร์ตกระดาษ (ยังไม่ได้เชื่อม)",
            }}
            to={{
              icon: "package_2",
              // TODO: Translation
              content: `ของรางวัลระดับ
                    ${
                      redeemLevel == "small"
                        ? "Starter"
                        : redeemLevel == "medium"
                          ? "Power-Up"
                          : "Ultimate"
                    }`,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StaffRedemptionSection;
