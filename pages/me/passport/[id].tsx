import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import PassportQRCard from "@/components/passport/PassportQRCard";
import { useUser } from "@/contexts/UserContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import getTimeString from "@/utils/helpers/getTimeString";
import type {
  Activity,
  Passport,
  RedeemedPassport,
  UnredeemedLinkedPassport,
} from "@/utils/types/passport";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useEffect, type FC } from "react";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PassportPage: FC<{
  passport: UnredeemedLinkedPassport | RedeemedPassport;
  activities: Activity[];
}> = ({ passport, activities }) => {
  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

  const isRedeemed = passport && typeof passport.redeemed_tier == "undefined";

  useEffect(
    () => {
      if (userIsLoading) return;

      if (user === null) {
        router.push("/");
        return;
      } else if (typeof user.onboarded_at !== "string") {
        router.push("/register");
        return;
      }
    },
    [userIsLoading], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (userIsLoading || user === null) return <></>;

  return (
    <div className="flex flex-col gap-3 p-3 pt-0">
      <div
        className="justity-center flex print:fixed print:top-0 print:left-0
          print:z-100 print:h-dvh print:w-dvw print:bg-white"
      >
        <PassportQRCard
          passportId={passport.id}
          owner={
            `${passport.child.firstname} ${passport.child.lastname}` +
            (typeof passport.child.nickname !== "undefined"
              ? ` (${passport.child.nickname})`
              : "")
          }
          className="m-auto"
        />
      </div>
      <Button variant="primary" icon="print" onClick={() => window.print()}>
        พิมพ์พาสปอร์ต
      </Button>

      <div>
        <div
          className="border-primary-border rounded-lg border bg-white
            [&>div]:not-first:border-t"
        >
          {activities.map((activity) => (
            <div
              className="border-primary-border flex items-center gap-2 p-2"
              key={activity.id}
            >
              <Text type="title" className="w-6 text-center">
                {activity.number}
              </Text>
              <div className="flex grow flex-col">
                <Text type="title" element="p">
                  {activity.name}
                </Text>
                <Text type="body" element="p">
                  {activity.location}
                </Text>
              </div>
              {passport.completed_activities.includes(activity.id) ? (
                <MaterialIcon icon={"check"} className={"text-primary"} />
              ) : (
                <MaterialIcon icon={"close"} className={"text-secondary"} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Text type="body" element="p">
          การแลกของรางวัล
        </Text>
        <div
          className="border-primary-border rounded-lg border bg-white
            [&>div]:not-first:border-t"
        >
          <div className="border-primary-border flex items-center gap-2 p-2">
            {isRedeemed ? (
              <div className="flex w-full items-center gap-2">
                <MaterialIcon icon="package_2" className="text-primary" />
                <div className="flex grow flex-col">
                  <Text type="title">
                    ของรางวัลระดับ{" "}
                    {passport.redeemed_tier == "small"
                      ? "Starter"
                      : passport.redeemed_tier == "medium"
                        ? "Power-Up"
                        : "Ultimate"}
                  </Text>
                  <Text type="body">
                    เข้าร่วม{" "}
                    {passport.redeemed_tier == "small"
                      ? "4-7"
                      : passport.redeemed_tier == "medium"
                        ? "8-9"
                        : "10"}{" "}
                    ฐาน • ได้รับแล้ว
                  </Text>
                </div>
                <Text type="body">
                  เมื่อ:{" "}
                  {getTimeString(new Date(passport.redeemed_at), "minutes")} น.
                </Text>
              </div>
            ) : (
              <div className="flex grow flex-col">
                <Text type="body" element="p">
                  คุณยังไม่ได้แลกของรางวัล
                </Text>
              </div>
            )}
          </div>
        </div>
        <Text type="body" element="p" className="text-right">
          คุณสามารถแลกของรางวัลได้ 1 ครั้งเท่านั้น
        </Text>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const messages = await getStaticTranslations("common");

  const passportId = query.id;
  if (typeof passportId !== "string" || !UUID_REGEX.test(passportId))
    return { notFound: true };

  const passport = await fetchAPI<Passport>(
    `/v1/passport/${passportId}?detailed=true`,
    {},
    req.cookies,
  );
  if (!passport.success || passport.data.child === null) {
    res.setHeader(
      "Set-Cookie",
      `auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );
    return { redirect: { destination: "/", permanent: false } };
  }

  // FIXME: Move activities into a client-side context, for better performance
  // FIXME: (long term) and less server load.
  const activities = await fetchAPI<Activity[]>(
    "/v1/activities",
    {},
    req.cookies,
  );
  if (!activities.success) {
    res.setHeader(
      "Set-Cookie",
      `auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      messages,
      passport: passport.data,
      activities: activities.data,
    },
  };
};

export default PassportPage;
