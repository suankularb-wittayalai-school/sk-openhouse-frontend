import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import StageIndicatorCard from "@/components/common/StageIndicatorCard";
import AccountSection from "@/components/register/AccountSection";
import ActivitiesSection from "@/components/register/ActivitiesSection";
import FamilySection from "@/components/register/FamilySection";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import {
  person,
  gender,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { user } from "@/utils/types/user";

const RegisterLoginPage = () => {
  const tx = useTranslations("register");

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
              <AccountSection onRedirect={() => setPage(1)} />,
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

      {/* DEV!!! */}
      <div
        className="flex flex-col gap-1 rounded-lg border border-black/20
          bg-yellow-400 p-3 transition-opacity"
      >
        <div className="flex justify-between">
          <p className="text-sm font-bold">Development Controls</p>
        </div>
        <div className="mt-2 flex gap-1">
          <Button
            variant="primary"
            onClick={() => {
              if (page - 1! >= 0) {
                setPage(page - 1);
              }
            }}
            className="w-full border border-black/20 bg-yellow-500
              text-yellow-900!"
          >
            <MaterialIcon icon="west" />
          </Button>
          <div className="w-24 shrink-0">
            <p className="text-center text-xs font-bold text-nowrap">
              Stage [0–{stages.length - 1}]
            </p>
            <p className="text-center text-sm text-nowrap">
              {page} ({stages[page]})
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              if (page + 1! < stages.length) {
                setPage(page + 1);
              }
            }}
            className="w-full border border-black/20 bg-yellow-500
              text-yellow-900!"
          >
            <MaterialIcon icon="east" />
          </Button>
        </div>
        <Button
          variant="primary"
          onClick={() => setExpStageIndicator(!expStageIndicator)}
          className="w-full border border-black/20 bg-yellow-500
            text-yellow-900!"
        >
          Experimental Indicator Card [{expStageIndicator ? "On" : "Off"}]
        </Button>
      </div>
      {/* END OF DEV!!! */}
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
