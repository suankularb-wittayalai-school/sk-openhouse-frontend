import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const PersonCardContainer: StylableFC<{
  persons: person[];
}> = ({ persons }) => {
  const t = useTranslations("me")
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.aboutFamily")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {persons.map((person, i) => (
          <PersonCard person={person} key={i} />
        ))}
      </Card>
      <div className="flex gap-2">
        <Button variant="outline" icon="edit" className="w-10 *:p-0 shrink-0"/>
        <Button variant="primarySurface" className="w-full">{t("action.registrationCard")}</Button>
      </div>
    </div>
  );
};

export default PersonCardContainer;
