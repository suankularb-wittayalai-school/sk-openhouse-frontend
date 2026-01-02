import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const SchoolMap: StylableFC<{}> = ({}) => {
  const t = useTranslations("me")
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.map")}</Text>

      {/* Map Here*/}

      <Button variant="primarySurface" className="w-full">
        {t("action.exploreMap")}
      </Button>
    </div>
  );
};

export default SchoolMap;
