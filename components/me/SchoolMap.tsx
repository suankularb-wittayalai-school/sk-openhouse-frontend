import Text from "@/components/common/Text";
import map from "@/public/Map.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { FC } from "react";

const SchoolMap: FC = () => {
  const t = useTranslations("landing");

  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.map")}</Text>

      <Image
        src={map}
        alt="Event Map Diagram"
        className="border-primary-border self-center rounded-lg border"
      />
    </div>
  );
};

export default SchoolMap;
