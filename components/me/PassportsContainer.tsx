import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import PassportLinkCard from "@/components/me/subcomponents/PassportLinkCard";
import type { Family } from "@/utils/types/person";
import { useTranslations } from "next-intl";
import type { FC } from "react";

type PassportsContainerProps = { family: Family };

const PassportsContainer: FC<PassportsContainerProps> = ({ family }) => {
  const t = useTranslations("me");

  if (family.children.length === 0) return;

  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.passport")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {family.children.map((person) => (
          <PassportLinkCard person={person} key={person.id} />
        ))}
      </Card>
    </div>
  );
};

export default PassportsContainer;
