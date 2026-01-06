import PassportLinkContainer from "@/components/me/PassportLinkContainer";
import PersonCardContainer from "@/components/me/PersonCardContainer";
import { useUser } from "@/contexts/UserContext";
import fetchAPI, { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import type { Family, Person } from "@/utils/types/person";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { type FC, useEffect, useState } from "react";

const MyRegistrationPage: FC = () => {
  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

  const [familyForm, setFamilyForm] = useState<Family>();

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

      const getFamilyData = async () => {
        // FIXME: Type!! Type!!! Type!!! It's in the language's NAME!!!!
        const { data: rawFamily } = await fetchAPI2<any>("/v1/user/family");
        const family: Family = {
          registrant: {
            user: user,
            person: { ...rawFamily.registrant, isChild: false },
          },
          adult:
            rawFamily.family_members.filter(
              (person: Person) => person.child == undefined,
            ) || [],
          child:
            rawFamily.family_members.filter(
              (person: Person) => person.child !== undefined,
            ) || [],
        };

        setFamilyForm(family);
      };

      getFamilyData();
    },
    [userIsLoading], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (userIsLoading || typeof familyForm === "undefined")
    return <span>Loading...</span>;

  return (
    <div className="flex flex-col gap-6 p-3 pt-0">
      <PersonCardContainer family={familyForm} onFamilyChange={setFamilyForm} />
      <PassportLinkContainer family={familyForm} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations(
    "common",
    "me",
    "person",
    "register",
    "passport",
  );

  return {
    props: { messages },
  };
};

export default MyRegistrationPage;
