import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getFieldById from "@/utils/helpers/getFieldById";
import { Passport } from "@/utils/types/passport";
import { Activity } from "@/utils/types/staff";
import { FC } from "react";

const StaffRedemptionSection: FC<{
  passport: Passport | undefined;
  activities: Activity[];
  setOpenPassportScanDialog: () => void;
}> = ({ passport, activities, setOpenPassportScanDialog }) => {
  console.log(passport);

  const isRedeemed = passport && typeof passport.redeemed_tier == "undefined";

  // Get uncompleted activities by filtering out completed ones
  const completedActivities =
    passport && passport.completed_activities
      ? passport.completed_activities.map((item: any) => item)
      : [];
  const uncompletedActivities = activities
    .filter((activity) => !completedActivities.includes(activity.id))
    .slice(0, -1); // Remove the last item

  async function handleRedeemItem(size: "small" | "medium" | "large") {
    const res = await fetchAPI(
      `/v1/passport/${passport?.id ?? "missing_id"}/redeem`,
      {
        method: "PUT",
        body: JSON.stringify({ prize_tier: size }),
      },
    );

    if (res.success) {
      return window.location.reload();
    }
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
                completedActivities.length >= 4 ? (
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
                )
              ) : (
                <Text type="body">ไมมีสิทธิ์</Text>
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
                completedActivities.length >= 8 ? (
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
                )
              ) : (
                <Text type="body">ไมมีสิทธิ์</Text>
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
                completedActivities.length >= 10 ? (
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
                )
              ) : (
                <Text type="body">ไมมีสิทธิ์</Text>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffRedemptionSection;
