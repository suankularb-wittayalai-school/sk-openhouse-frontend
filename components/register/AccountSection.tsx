import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import GSIButton from "@/components/common/GSIButton";
import Text from "@/components/common/Text";
import TextField from "@/components/common/TextField";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { FC, useState } from "react";
import { GSIStatus } from "@/components/common/GSIButton";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const AccountSection: FC<{
  type?: "register" | "signIn";
  onRedirect: () => void;
}> = ({ type = "register", onRedirect }) => {
  const t = useTranslations("register");

  const [state, setState] = useState<GSIStatus>(GSIStatus.initial);

  useEffect(() => {
    if (state == GSIStatus.redirecting) {
      onRedirect();
    }
  }, [state]);

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
            key={state}
            initial={{ opacity: 0, y: "-0.5rem", filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "0.5rem", filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {
              {
                [GSIStatus.initial]: <GSIButton onStateChange={setState} />,
                [GSIStatus.chooserShown]: (
                  <>
                    <Text type="title">
                      {t("account.google.continueInNew")}
                    </Text>
                    <Button
                      variant="primarySurface"
                      onClick={() => setState(GSIStatus.initial)}
                    >
                      {t("account.google.action.cancel")}
                    </Button>
                  </>
                ),
                [GSIStatus.processing]: (
                  <Text type="title"> {t("account.google.processing")}</Text>
                ),
                [GSIStatus.redirecting]: (
                  <Text type="title"> {t("account.google.redirecting")}</Text>
                ),
              }[state]
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountSection;
