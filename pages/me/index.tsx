import PassportLinkContainer from "@/components/me/PassportLinkContainer";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import {
  gender,
  person,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { GetStaticProps } from "next";
import { FC, useState } from "react";
import PersonCardContainer from "@/components/me/PersonCardContainer";
import SchoolMap from "@/components/me/SchoolMap";
import { user } from "@/utils/types/user";

const MyRegistrationPage: FC<{
  family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  };
}> = ({ family }) => {
  const [familyForm, setFamilyForm] = useState(family);
  return (
    <div className="flex flex-col gap-6 p-3 pt-0">
      <SchoolMap />
      <PersonCardContainer family={familyForm} onFamilyChange={setFamilyForm} />
      <PassportLinkContainer
        people={[
          ...[family.registrant.person],
          ...family.adult,
          ...family.child,
        ]}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations(
    "common",
    "me",
    "person",
    "register",
  );

  const family = {
    registrant: {
      user: {
        email: "atipol.suk@sk.ac.th",
        is_onboarded: false,
        event_expectations: "",
        is_attending_seminar: true,
      },
      person: {
        id: "a",
        prefix: prefix.mr,
        firstname: "อติพล",
        lastname: "สุกฤษฎานนท์",
        birthdate: "11-12-1900",
        gender: gender.male,
        tel: "098-942-8556",
        is_child: false,
        relationship_to_child: relationshipToChild.father,
        child: {
          nickname: "",
          school: "",
          expected_graduation_year: 2569,
          passport_id: "",
        },
      },
    },
    adult: [
      {
        id: "b",
        prefix: prefix.miss,
        firstname: "สุพรรณี",
        lastname: "สุภีรัตน์",
        birthdate: "11-12-2000",
        gender: gender.female,
        tel: "098-942-8556",
        is_child: false,
        relationship_to_child: relationshipToChild.mother,
        child: {
          nickname: "null",
          school: "null",
          expected_graduation_year: 2569,
          passport_id: "null",
        },
      },
    ],
    child: [
      {
        id: "c",
        prefix: prefix.master,
        firstname: "ธีรญาณ",
        lastname: "สุกฤษฎานนท์",
        birthdate: "11-12-2020",
        gender: gender.male,
        tel: "098-942-8556",
        is_child: true,
        relationship_to_child: null,
        child: {
          nickname: "",
          school: "",
          expected_graduation_year: 2569,
          passport_id: "",
        },
      },
      {
        id: "d",
        prefix: prefix.master,
        firstname: "ตฤณภัทร",
        lastname: "ตฤณภัทร",
        birthdate: "11-12-2000",
        gender: gender.male,
        tel: "098-942-8556",
        is_child: true,
        relationship_to_child: null,
        child: {
          nickname: "",
          school: "",
          expected_graduation_year: 2569,
          passport_id: "",
        },
      },
    ],
  };

  return {
    props: { messages, family },
  };
};

export default MyRegistrationPage;
