import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import StageIndicatorCard from "@/components/common/StageIndicatorCard";
import AccountSection from "@/components/register/AccountSection";
import ActivitiesSection from "@/components/register/ActivitiesSection";
import FamilySection from "@/components/register/FamilySection";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const RegisterLoginPage = () => {
  const tx = useTranslations("register");

  const stages = [
    tx("stage.account"),
    tx("stage.family"),
    tx("stage.activity"),
  ];
  const [page, setPage] = useState<number>(0);

  const [expStageIndicator, setExpStageIndicator] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6 p-2">
      <StageIndicatorCard
        stages={stages}
        active={page}
        experimental={expStageIndicator}
      />
      <AnimatePresence mode="wait" initial={false}>
        {
          [
            <motion.div
              key="account"
              initial={{ translateY: "-0.5rem", opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
                transition: { duration: 0.25 },
              }}
              exit={{
                translateY: "0.5rem",
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              <AccountSection />
            </motion.div>,
            <motion.div
              key="family"
              initial={{ translateY: "-0.5rem", opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
                transition: { duration: 0.25 },
              }}
              exit={{
                translateY: "0.5rem",
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              <FamilySection />
            </motion.div>,
            <motion.div
              key="activities"
              initial={{ translateY: "-0.5rem", opacity: 0 }}
              animate={{
                translateY: 0,
                opacity: 1,
                transition: { duration: 0.25 },
              }}
              exit={{
                translateY: "0.5rem",
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              <ActivitiesSection />
            </motion.div>,
          ][page]
        }
      </AnimatePresence>

      {/* DEV!!! */}
      <div
        className="fixed bottom-2 left-1/2 flex w-[calc(100vw-1rem)] max-w-xs
          -translate-x-1/2 flex-col gap-1 rounded-lg border border-black/20
          bg-yellow-400 p-3 opacity-25 transition-opacity hover:opacity-100"
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
  const messages = await getStaticTranslations("common", "register");

  return {
    props: { messages },
  };
}

export default RegisterLoginPage;
