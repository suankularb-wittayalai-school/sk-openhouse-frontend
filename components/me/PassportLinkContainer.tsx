import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import PassportLinkCard from "@/components/me/subcomponents/PassportLinkCard";
import { StylableFC } from "@/utils/types/common";
import { Family, person } from "@/utils/types/person";
import { user } from "@/utils/types/user";
import { useTranslations } from "next-intl";

const PassportLinkContainer: StylableFC<{
  family: Family;
}> = ({ family }) => {
  const t = useTranslations("me");

  const children = family.child;
  if (children.length === 0) return;

  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.passport")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {children.map((person, i) => (
          <PassportLinkCard person={person} key={i} />
        ))}
      </Card>
    </div>
  );
};

export default PassportLinkContainer;
