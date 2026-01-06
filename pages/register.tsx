import StageIndicatorCard from "@/components/common/StageIndicatorCard";
import AccountSection from "@/components/register/AccountSection";
import ActivitiesSection from "@/components/register/ActivitiesSection";
import FamilySection from "@/components/register/FamilySection";
import { useUser } from "@/contexts/UserContext";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import {
  Gender,
  type Person,
  Prefix,
  RelationshipToChild,
  SchoolGrade,
} from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { AnimatePresence, motion } from "motion/react";
import type { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const RegisterationPage = () => {
  const tx = useTranslations("register");

  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

  const stages = [
    tx("stage.account"),
    tx("stage.family"),
    tx("stage.activity"),
  ];

  const [registerationStep, setRegisterationStep] = useState(0);
  const [familyForm, setFamilyForm] = useState<{
    registrant: { user: User; person: Person };
    adult: Person[];
    child: Person[];
  }>({
    registrant: {
      user: {
        email: "",
        onboarded_at: null,
        event_expectations: "",
        registered_events: [],
      },
      person: {
        firstname: "",
        lastname: "",
        gender: Gender.Male,
        relationship_to_child: RelationshipToChild.Father,
        tel: "",
        prefix: Prefix.Mr,
        birthdate: "",
        child: {
          nickname: undefined,
          expected_graduation_year: undefined,
          next_grade: SchoolGrade.M1,
          school: undefined,
          passport_id: undefined,
        },
      },
    },
    adult: [],
    child: [],
  });

  useEffect(
    () => {
      if (userIsLoading) return;

      if (user === null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        return setRegisterationStep(1);
      }
      if (typeof user.onboarded_at === "string") {
        router.push("/me");
        return;
      } else setRegisterationStep(2);
    },
    [userIsLoading], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (userIsLoading) return <span>Loading...</span>;

  return (
    <div className="flex flex-col gap-6 p-3">
      <StageIndicatorCard stages={stages} active={registerationStep} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={registerationStep}
          initial={{ translateY: "-1rem", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: "1rem", opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {
            [
              <Fragment key={0}>{/* Empty */}</Fragment>,
              <AccountSection
                type="register"
                onRedirect={() => {
                  if (typeof user?.onboarded_at !== "string")
                    setRegisterationStep(2);
                  else router.push("/me");
                }}
                key={1}
              />,
              <FamilySection
                family={familyForm}
                onFamilyChange={setFamilyForm}
                onRedirect={() => setRegisterationStep(3)}
                key={2}
              />,
              <ActivitiesSection
                family={familyForm}
                onFamilyChange={setFamilyForm}
                onBack={() => setRegisterationStep(2)}
                key={3}
              />,
            ][registerationStep]
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations("common", "register", "person");

  return {
    props: { messages },
  };
};

export default RegisterationPage;
