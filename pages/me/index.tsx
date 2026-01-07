import FamilyContainer from "@/components/me/FamilyContainer";
import PassportsContainer from "@/components/me/PassportsContainer";
import { useUser } from "@/contexts/UserContext";
import { fetchAPI } from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import type {
  AdultPerson,
  ChildPerson,
  Family,
  FetchedFamily,
} from "@/utils/types/person";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { type FC, useEffect } from "react";

const MyRegistrationPage: FC<{ family: Family }> = ({ family }) => {
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
    <div className="flex flex-col gap-6 p-3 pt-0">
      <FamilyContainer user={user} family={family} />
      <PassportsContainer family={family} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const messages = await getStaticTranslations(
    "common",
    "me",
    "person",
    "register",
    "passport",
  );
  const body = await fetchAPI<FetchedFamily>(
    "/v1/user/family",
    {},
    req.cookies,
  );
  // If the API returns an error, we can probably assume that most of the time,
  // it's because the client is unauthenticated or unauthorized. We're going to
  // act on that assumption rather than throw an error.
  if (!body.success) {
    res.setHeader("Set-Cookie", "auth_token=");
    return { redirect: { destination: "/", permanent: false } };
  }
  const family = {
    registrant: body.data.registrant as AdultPerson,
    adults: body.data.family_members.filter(
      (person) =>
        "relationship_to_child" in person &&
        typeof person.relationship_to_child !== "undefined",
    ) as AdultPerson[],
    children: body.data.family_members.filter(
      (person) => "child" in person && typeof person.child !== "undefined",
    ) as ChildPerson[],
  } satisfies Family;

  return {
    props: { messages, family },
  };
};

export default MyRegistrationPage;
