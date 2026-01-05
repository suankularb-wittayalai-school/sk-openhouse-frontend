import Text from "@/components/common/Text";
import { useTranslations } from "next-intl";
import { FC } from "react";

const EventTitle: FC = () => {
  const t = useTranslations("landing");
  return (
    <div className="my-8">
      <div className="flex w-full flex-col items-center justify-center">
        <Text
          type="headline"
          className="m-1 text-center text-[32px] tracking-[-0.03em]"
        >
          <span>{t("title.first")}</span>
        </Text>
        <Text
          type="body"
          className="m-1 text-center text-[24px] tracking-[-0.03em]"
        >
          <span>{t("title.second")}</span>
        </Text>
        <Text type="body" className="text-sm! opacity-100!">
          {t("title.description")}
        </Text>
      </div>
    </div>
  );
};

export default EventTitle;
