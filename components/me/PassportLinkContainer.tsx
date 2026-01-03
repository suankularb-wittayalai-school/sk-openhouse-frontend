import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import PassportLinkCard from "@/components/me/subcomponents/PassportLinkCard";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { useTranslations } from "next-intl";

const PassportLinkContainer: StylableFC<{
  persons: person[];
}> = ({ persons }) => {
  const t = useTranslations("me")
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.passport")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {persons
          .filter((person) => person.is_child)
          .map((person, i) => (
            <PassportLinkCard person={person} key={i} />
          ))}
      </Card>
    </div>
  );
};

export default PassportLinkContainer;
