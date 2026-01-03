import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import RegistrationCard from "@/components/me/RegistrationCard";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const PersonCardContainer: StylableFC<{
  persons: person[];
}> = ({ persons }) => {
  const t = useTranslations("me");

  const [registrationCardOpen, setRegistrationCardOpen] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.aboutFamily")}</Text>
        <Card className="flex flex-col gap-0! p-0!">
          {persons.map((person, i) => (
            <PersonCard person={person} key={i} />
          ))}
        </Card>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon="edit"
            className="w-10 shrink-0 *:p-0"
          />
          <Button
            variant="primarySurface"
            className="w-full"
            onClick={() => {
              setRegistrationCardOpen(true);
            }}
          >
            {t("action.registrationCard")}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {registrationCardOpen && (
          <RegistrationCard
            persons={persons}
            onClose={() => setRegistrationCardOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PersonCardContainer;
