import PassportLinkContainer from "@/components/me/PassportLinkContainer";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import {
  gender,
  person,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { GetStaticProps } from "next";
import { FC } from "react";
import PersonCardContainer from "@/components/me/PersonCardContainer";
import SchoolMap from "@/components/me/SchoolMap";

const MyRegistrationPage: FC<{ persons: person[] }> = ({ persons }) => {
  return (
    <div className="flex flex-col gap-6 p-3 pt-0">
      <SchoolMap />
      <PersonCardContainer persons={persons} />
      <PassportLinkContainer persons={persons} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations(
    "common",
    "me",
    "person",
    "passport",
  );

  
  {/* Tempoary !!!*/}
  const persons = [
    {
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
        nickname: null,
        school: null,
        expected_graduation_year: null,
        passport_id: null,
      },
    },
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
        nickname: null,
        school: null,
        expected_graduation_year: null,
        passport_id: null,
      },
    },
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
        nickname: null,
        school: null,
        expected_graduation_year: null,
        passport_id: null,
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
        nickname: null,
        school: null,
        expected_graduation_year: null,
        passport_id: null,
      },
    },
  ];

  return {
    props: { messages, persons },
  };
};

export default MyRegistrationPage;
