import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import Button from "@/components/common/Button";
import EventTitle from "@/components/landing/EventTitle";
import { GetStaticProps } from "next";
import Link from "next/link";
import ActivitesCardContainer from "@/components/landing/ActivitesCardContainer";
import FAQsContainer from "@/components/landing/FAQsContainer";
import { FC } from "react";
import { ActivitiesList, Faqs } from "@/utils/types/landing";
import { useTranslations } from "next-intl";

const LandingPage: FC<{
  activities: ActivitiesList[];
  faqs: Faqs[];
}> = ({ activities, faqs }) => {
  const t = useTranslations("landing");
  return (
    <div className="mt-5.5 flex flex-col gap-6 p-4 pt-0">
      {/* Title */}
      <EventTitle />

      {/* Activities List */}
      <div className="flex flex-col gap-2">
        <ActivitesCardContainer activities={activities} />
        <Link href={"/register"}>
          <Button variant="primarySurface" className="w-full">
            {t("register")}
          </Button>
        </Link>
      </div>

      {/* FAQs  */}
      <FAQsContainer faqs={faqs} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations("common", "landing");

  /* Tempoary !!!  */
  const faqs = [
    {
      question: "ต้องแต่งชุดอะไรไป ?",
      answer: "อยากใส่ชุดอะไรก็ใส่เลยครับ",
    },
    {
      question: "คำถามอื่น ?",
      answer: "อยากใส่ชุดอะไรก็ใส่เลยครับ",
    },
    {
      question: "คำถามนอกโลกไปแล้ว ?",
      answer: "อยากใส่ชุดอะไรก็ใส่เลยครับ",
    },
  ];

  /* Tempoary !!!  */
  const activities = [
    {
      name: "แนะนำภาพรวมหลักสูตร",
      location: "หอประชุมสวนกุหลาบรำลึก",
    },
    {
      name: "นิทรรศการ SK Open House 2026",
      location: "ใต้อาคารหอประชุม อาคาร 123 ปีฯ",
    },
    {
      name: "School Tour",
      location: "รอบโรงเรียน",
    },
  ];

  return {
    props: { messages, activities, faqs },
  };
};

export default LandingPage;
