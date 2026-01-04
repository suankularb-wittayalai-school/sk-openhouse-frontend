import PassportLinkContainer from "@/components/me/PassportLinkContainer";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import { Family, person } from "@/utils/types/person";
import { GetStaticProps } from "next";
import { FC, useEffect, useState } from "react";
import PersonCardContainer from "@/components/me/PersonCardContainer";
import SchoolMap from "@/components/me/SchoolMap";
import fetchAPI from "@/utils/helpers/fetchAPI";

const MyRegistrationPage: FC<{}> = ({}) => {
  const [familyForm, setFamilyForm] = useState<Family>();

  useEffect(() => {
    const getFamilyData = async () => {
      const { data: rawFamily } = await fetchAPI("/v1/user/family", {
        method: "GET",
      }).then((res) => res.json());
      const { data: user } = await fetchAPI("/v1/user", {
        method: "GET",
      }).then((res) => res.json());
      const family: Family = {
        registrant: {
          user: {
            ...user,
          },
          person: rawFamily.registrant,
        },
        adult:
          rawFamily.family_members.filter(
            (person: person) => person.child == undefined,
          ) || [],
        child:
          rawFamily.family_members.filter(
            (person: person) => person.child !== undefined,
          ) || [],
      };

      setFamilyForm(family);
      console.log(family);
    };

    getFamilyData();
  }, []);

  if (!familyForm) return;

  return (
    <div className="flex flex-col gap-6 p-3 pt-0">
      <SchoolMap />
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
