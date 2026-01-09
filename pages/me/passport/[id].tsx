import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import PassportQRCard from "@/components/passport/PassportQRCard";
import { useUser } from "@/contexts/UserContext";
import fetchAPI from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import type { Activity, Passport } from "@/utils/types/passport";
import { ChildPerson, FetchedFamily } from "@/utils/types/person";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useEffect, type FC } from "react";

const PassportPage: FC<{
  child: ChildPerson;
  passport: Passport;
  activities: Activity[];
}> = ({ child, passport, activities }) => {
  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

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
          passport={passport.id}
          owner={
            `${child.prefix} ${child.firstname} ${child.lastname}` +
            (typeof child.child.nickname !== "undefined"
              ? ` ${child.child.nickname}`
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
              <MaterialIcon icon={"close"} className={"text-secondary"} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Text type="body" element="p">
          แลกของรางวัล
        </Text>
        <div
          className="border-primary-border rounded-lg border bg-white
            [&>div]:not-first:border-t"
        >
          <div className="border-primary-border flex items-center gap-2 p-2">
            <div className="flex grow flex-col">
              <Text type="body" element="p">
                คุณยังไม่ได้แลกของรางวัล
              </Text>
            </div>
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

  // TODO: Fix all below
  const passportId = query.id;
  if (typeof passportId !== "string") return { notFound: true };
  const family = await fetchAPI<FetchedFamily>(
    "/v1/user/family",
    {},
    req.cookies,
  );
  if (!family.success) {
    res.setHeader("Set-Cookie", "auth_token=");
    return { redirect: { destination: "/", permanent: false } };
  }

  const passport = await fetchAPI<Passport>(
    `/v1/passport/${passportId}?detailed=true`,
    {},
    req.cookies,
  );
  if (!passport.success) {
    res.setHeader("Set-Cookie", "auth_token=");
    return { redirect: { destination: "/", permanent: false } };
  }

  const activities = await fetchAPI<Activity[]>(
    "/v1/activities",
    {},
    req.cookies,
  );
  if (!activities.success) {
    res.setHeader("Set-Cookie", "auth_token=");
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      messages,
      child: family.data.family_members.filter(
        (person) =>
          person.id === passport.data.child_id &&
          (person as ChildPerson).child.linked_passport_id === passportId,
      )[0],
      passport: passport.data,
      activities: activities.data,
    },
  };
};

export default PassportPage;
