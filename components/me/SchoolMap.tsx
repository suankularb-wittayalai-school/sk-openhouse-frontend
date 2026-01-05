import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import map from "@/public/Map.svg";

const SchoolMap: StylableFC<{}> = ({}) => {
  const t = useTranslations("me");
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.map")}</Text>

      <Image
        src={map}
        alt="event map"
        className="border-primary-border self-center rounded-lg border"
      />

      {/* <Button variant="primarySurface" className="w-full">
        {t("action.exploreMap")}
      </Button> */}
    </div>
  );
};

export default SchoolMap;
