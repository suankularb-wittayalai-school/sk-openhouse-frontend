import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import StageIndicatorCard from "@/components/common/StageIndicatorCard";
import AccountSection from "@/components/register/AccountSection";
import ActivitiesSection from "@/components/register/ActivitiesSection";
import FamilySection from "@/components/register/FamilySection";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import {
  gender,
  person,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { user } from "@/utils/types/user";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterLoginPage = () => {
  const tx = useTranslations("register");

  const router = useRouter();

  const stages = [
    tx("stage.account"),
    tx("stage.family"),
    tx("stage.activity"),
  ];
  const [page, setPage] = useState<number>(0);

  const [expStageIndicator, setExpStageIndicator] = useState<boolean>(false);
  const [familyForm, setFamilyForm] = useState<{
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  }>({
    registrant: {
      user: {
        email: "",
        is_onboarded: false,
        event_expectations: "",
        is_attending_seminar: true,
      },
      person: {
        firstname: "",
        lastname: "",
        gender: gender.male,
        relationship_to_child: relationshipToChild.father,
        tel: "",
        prefix: prefix.master,
        birthdate: "",
        child: {
          nickname: undefined,
          expected_graduation_year: undefined,
          school: undefined,
          passport_id: undefined,
        },
      },
    },
    adult: [],
    child: [],
  });

  return (
    <div className="flex flex-col gap-6 p-3">
      <StageIndicatorCard
        stages={stages}
        active={page}
        experimental={expStageIndicator}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ translateY: "-1rem", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: "1rem", opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {
            [
              <AccountSection
                onRedirect={() => {
                  fetchAPI("/v1/user", {
                    method: "GET",
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (!data.data.is_onboarded) {
                        setPage(1);
                      } else {
                        router.push("/me")
                      }
                    });
                }}
              />,
              <FamilySection
                family={familyForm}
                onFamilyChange={setFamilyForm}
                onRedirect={() => setPage(2)}
              />,
              <ActivitiesSection
                user={familyForm.registrant.user}
                person={familyForm.registrant.person}
                onUserChange={(user: user) =>
                  setFamilyForm({
                    ...familyForm,
                    registrant: { ...familyForm.registrant, user: user },
                  })
                }
              />,
            ][page]
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export async function getStaticProps() {
  const messages = await getStaticTranslations("common", "register", "person");

  return {
    props: { messages },
  };
}

export default RegisterLoginPage;
