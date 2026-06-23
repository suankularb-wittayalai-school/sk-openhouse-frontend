import CardContainer from "@/components/common/CardContainer";
import Text from "@/components/common/Text";
import EventTitle from "@/components/landing/EventTitle";
import FAQsContainer from "@/components/landing/FAQSection";
import TransitGuideBusSection from "@/components/landing/TransitGuideBusSection";
import TransitGuideMRTSection from "@/components/landing/TransitGuideMRTSection";
import MapsSchoolLocation from "@/components/landing/subcomponents/MapsSchoolLocation";
import ScheduleCard from "@/components/landing/subcomponents/ScheduleCard";
import SchoolMap from "@/components/me/SchoolMap";
import { fetchAPI } from "@/utils/helpers/fetchAPI";
import getStaticTranslations from "@/utils/helpers/getStaticTranslations";
import type { BusRoutes, ScheduleItem } from "@/utils/types/common";
import type { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import type { FC } from "react";

const LandingPage: FC<{
  busRoutes: BusRoutes;
  scheduleItems: ScheduleItem[] | null;
}> = ({ busRoutes, scheduleItems }) => {
  const t = useTranslations("landing");
  return (
    <div className="mt-5.5 flex flex-col gap-6 p-3 pt-0">
      {/* Title */}
      <EventTitle />

      {/* Schedule */}
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.schedule")}</Text>
        {scheduleItems ? (
          <CardContainer>
            {scheduleItems.map((scheduleItem) => (
              <ScheduleCard scheduleItem={scheduleItem} key={scheduleItem.id} />
            ))}
          </CardContainer>
        ) : (
          <div
            data-theme="orange"
            className="border-primary-border text-primary flex flex-col gap-0.5
              rounded-lg! border bg-white p-2"
          >
            <p className="text-sm">
              Oops, we've messed up. Please try again later!
            </p>
            <p className="text-xs opacity-50">(API Endpoint Unreachable)</p>
          </div>
        )}
      </div>

      <SchoolMap />

      {/* FAQs  */}
      <FAQsContainer />

      {/* TransitGuide */}
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.transit")}</Text>
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col gap-1 md:flex-row">
            <TransitGuideMRTSection />
            <TransitGuideBusSection routes={busRoutes} />
          </div>
          <MapsSchoolLocation />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const messages = await getStaticTranslations("common", "landing");
  const busRoutes: BusRoutes = {
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

  const body = await fetchAPI<ScheduleItem[]>("/v1/schedule");
  const scheduleItems = body.success ? body.data : null;

  return {
    props: { messages, busRoutes, scheduleItems },
  };
};

export default LandingPage;
