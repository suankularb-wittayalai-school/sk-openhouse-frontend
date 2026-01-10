import StageIndicatorCard from "@/components/common/StageIndicatorCard";
import AccountSection from "@/components/register/AccountSection";
import EventsSection from "@/components/register/EventsSection";
import FamilySection from "@/components/register/FamilySection";
import { useUser } from "@/contexts/UserContext";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import getUserType from "@/utils/helpers/getUserType";
import type { FamilyCreate } from "@/utils/types/person";
import { AnimatePresence, motion } from "motion/react";
import type { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useState,
} from "react";

const RegisterationPage = () => {
  const tx = useTranslations("register");
  const registerationStages = [
    tx("stage.account"),
    tx("stage.family"),
    tx("stage.activity"),
  ] as const;

  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();

  const [registerationStep, setRegisterationStep] = useState(0);
  const [formData, setFormData] = useState<FamilyCreate>();

  useEffect(
    () => {
      if (userIsLoading) return;

      const handleUserRedirects = async () => {
        if (user === null) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          return setRegisterationStep(1);
        }
        if (getUserType(user)) {
          return router.push("/staff");
        }
        if (typeof user.onboarded_at === "string") {
          return router.push("/me");
        } else setRegisterationStep(2);
      };

      handleUserRedirects();
    },
    [userIsLoading, user], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (userIsLoading) return <></>;

  return (
    <div className="flex flex-col gap-6 p-3">
      <StageIndicatorCard
        stages={registerationStages}
        active={registerationStep}
      />
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
              // Placeholder step
              <Fragment key={0}>{/* Empty */}</Fragment>,

              // Step 1
              <AccountSection
                type="register"
                onRedirect={() =>
                  typeof user?.onboarded_at !== "string"
                    ? setRegisterationStep(2)
                    : router.push("/me")
                }
                key={1}
              />,

              // Step 2
              user !== null && (
                <FamilySection
                  user={user}
                  setFormData={setFormData}
                  setRegisterationStep={setRegisterationStep}
                  key={2}
                />
              ),

              // Step 3
              user !== null && typeof formData !== "undefined" && (
                <EventsSection
                  formData={formData}
                  setFormData={
                    setFormData as Dispatch<SetStateAction<FamilyCreate>>
                  }
                  setRegisterationStep={setRegisterationStep}
                  key={3}
                />
              ),
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
