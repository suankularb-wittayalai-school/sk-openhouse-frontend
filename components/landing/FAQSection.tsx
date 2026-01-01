import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import FAQDropdown from "@/components/landing/subcomponents/FAQDropdown";
import { Faqs } from "@/utils/types/landing";
import { useTranslations } from "next-intl";

const FAQsContainer: StylableFC<{
  faqs: Faqs[];
}> = ({ faqs }) => {
  const t = useTranslations("landing");
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.faq")}</Text>
      <div className="flex flex-col gap-1">
        {faqs.map((faq, i) => (
          <FAQDropdown question={faq.question} answer={faq.answer} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FAQsContainer;
