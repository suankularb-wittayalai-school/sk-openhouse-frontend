import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import Button from "@/components/common/Button";
import EventTitle from "@/components/landing/EventTitle";
import { GetStaticProps } from "next";
import Link from "next/link";
import ActivitesCardContainer from "@/components/landing/ActivitesCard";
import FAQsContainer from "@/components/landing/FAQCard";
import { FC } from "react";
import { ActivitiesList, BusRoute, Faqs } from "@/utils/types/landing";
import { useTranslations } from "next-intl";
import MrtDirectionCard from "@/components/landing/TransitGuideMRTCard";
import BusRouteCard from "@/components/landing/TransitGuideBusCard";
import WalkingMapCard from "@/components/landing/subcomponents/WalkingMapCard";
import Text from "@/components/common/Text";

const LandingPage: FC<{
  activities: ActivitiesList[];
  faqs: Faqs[];
  busRoute: BusRoute;
}> = ({ activities, faqs, busRoute }) => {
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

      <div className="flex flex-col gap-1">
        <MrtDirectionCard/>
        <BusRouteCard route={busRoute}/>
        <WalkingMapCard/>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations("common", "landing");

  /* Tempoary !!!  */
  const faqs: Faqs[] = [
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
  const activities: ActivitiesList[] = [
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

  const busRoute: BusRoute = {
    infront: ["6 / 4-1", "43 / 4-11"],
    opposite: [
      "3 / 2-37",
      "2 / 3-1",
      "2E / 3-2E",
      "5",
      "6 / 4-1",
      "7ก / 4-48",
      "9 / 4-37",
      "42R / 4-10",
      "53 / 2-9",
      "82 / 4-15 ",
    ],
  };

  return {
    props: { messages, activities, faqs, busRoute },
  };
};

export default LandingPage;
