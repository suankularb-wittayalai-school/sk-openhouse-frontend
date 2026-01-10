import Button from "@/components/common/Button";
import GSIButton, { GSIStatus } from "@/components/common/GSIButton";
import Text from "@/components/common/Text";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { type FC, useEffect, useState } from "react";

const AccountSection: FC<{
  type: "register" | "login";
  onRedirect: () => void;
}> = ({ type, onRedirect }) => {
  const t = useTranslations("register");

  const [currentState, setCurrentState] = useState(GSIStatus.initial);

  useEffect(() => {
    if (currentState === GSIStatus.redirecting) onRedirect();
  }, [onRedirect, currentState]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-primary text-2xl font-bold">
        {type == "register"
          ? t("account.header.register")
          : t("account.header.signIn")}
      </h1>
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, y: "-0.5rem", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "0.5rem", filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {
              {
                [GSIStatus.initial]: <GSIButton onStateChange={setCurrentState} />,
                [GSIStatus.chooserShown]: (
                  <div className="flex flex-col gap-2">
                    <Text type="title">
                      {t("account.google.continueInNew")}
                    </Text>
                    <Button
                      variant="primarySurface"
                      onClick={() => setCurrentState(GSIStatus.initial)}
                      className="w-full max-w-max"
                    >
                      {t("account.google.action.cancel")}
                    </Button>
                  </div>
                ),
                [GSIStatus.processing]: (
                  <Text type="title">{t("account.google.processing")}</Text>
                ),
                [GSIStatus.redirecting]: (
                  <Text type="title">{t("account.google.redirecting")}</Text>
                ),
              }[currentState]
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountSection;
