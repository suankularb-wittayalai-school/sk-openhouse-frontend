import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import FAQDropdown from "@/components/landing/FAQDropdown";
import { Faqs } from "@/utils/types/landing";

const FAQsContainer: StylableFC<{
  faqs: Faqs[];
}> = ({ faqs }) => {
  return (
    <>
      <Text type="body">คำถามที่พบบ่อย</Text>
      <div className="flex flex-col gap-1">
        {faqs.map((faq) => (
          <FAQDropdown question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
};

export default FAQsContainer;
