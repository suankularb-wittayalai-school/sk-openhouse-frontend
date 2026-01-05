import CardContainer from "@/components/common/CardContainer";
import Text from "@/components/common/Text";
import EventTitle from "@/components/landing/EventTitle";
import FAQsContainer from "@/components/landing/FAQSection";
import TransitGuideBusSection from "@/components/landing/TransitGuideBusSection";
import TransitGuideMRTSection from "@/components/landing/TransitGuideMRTSection";
import MapsSchoolLocation from "@/components/landing/subcomponents/MapsSchoolLocation";
import ScheduleCard from "@/components/landing/subcomponents/ScheduleCard";
import SchoolMap from "@/components/me/SchoolMap";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { getStaticTranslations } from "@/utils/helpers/getStaticTranslations";
import { ActivitiesList, BusRoute, Faqs } from "@/utils/types/landing";
import { scheduleItem } from "@/utils/types/schedule";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";

const LandingPage: FC<{
  activities: ActivitiesList[];
  faqs: Faqs[];
  busRoute: BusRoute;
  scheduleItems: scheduleItem[];
}> = ({ activities, faqs, busRoute, scheduleItems }) => {
  const t = useTranslations("landing");
  return (
    <div className="mt-5.5 flex flex-col gap-6 p-3 pt-0">
      {/* Title */}
      <EventTitle />

      {/* Schedule */}
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.schedule")}</Text>
        <CardContainer>
          {scheduleItems.map((scheduleItem) => (
            <ScheduleCard scheduleItem={scheduleItem} />
          ))}
        </CardContainer>
      </div>

      <SchoolMap />

      {/* FAQs  */}
      <FAQsContainer faqs={faqs} />

      {/* TransitGuide */}
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.transit")}</Text>
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col gap-1 md:flex-row">
            <TransitGuideMRTSection />
            <TransitGuideBusSection route={busRoute} />
          </div>
          <MapsSchoolLocation />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getStaticTranslations("common", "landing");

  /* Tempoary !!!  */
  // Lmao it's not temp now
  const faqs: Faqs[] = [
    {
      question: "ลงทะเบียนเข้าร่วมงาน SK Open House 2026 อย่างไร",
      answer:
        "ผู้ปกครองกดปุ่มลงทะเบียนผ่านเว็บไซต์ http://openhouse.mysk.school ด้วยบัญชี Google (ไม่สามารถใช้บัญชี @sk.ac.th หรือ @student.sk.ac.th สำหรับการลงทะเบียนได้) โดยผู้ปกครองจะเป็นเจ้าของบัญชีครอบครัว จากนั้น ผู้ปกครองสามารถเพิ่มสมาชิกที่จะเข้าร่วมงาน SK Open House 2026 เช่น ผู้ปกครองอีกท่าน หรือนักเรียนได้ครับ",
    },
    {
      question: "จำเป็นต้องเพิ่มนักเรียนเป็นสมาชิกในบัญชีครอบครัวหรือไม่",
      answer:
        "เมื่อเพิ่มนักเรียนเป็นสมาชิกในบัญชีครอบครัว จะมี QR code เพื่อให้นักเรียนสะสมคะแนนจากการเข้าร่วมกิจกรรมในโซนนิทรรศการ และนำไปแลกของรางวัลได้ครับ",
    },
    {
      question: "งาน SK Open House 2026 จัดที่ไหน และเมื่อใด",
      answer:
        "งาน SK Open House 2026 จัดขึ้นที่โรงเรียนสวนกุหลาบวิทยาลัย ถนนตรีเพชร เขตพระนคร กรุงเทพฯ​ วันที่ 11 มกราคม 2569 เริ่มงานเวลา 8.00 เป็นต้นไปครับ",
    },
    {
      question: "งาน SK Open House 2026 มีกิจกรรมอะไรบ้าง",
      answer: `ภายในงานจะมีกิจกรรม ดังนี้ 1. การนำเสนอข้อมูลหลักสูตรของแต่ละโครงการฯ ของโรงเรียนสวนกุหลาบวิทยาลัย ณ หอประชุมสวนกุหลาบรำลึก โดยตัวแทนของแต่ละหลักสูตร พร้อมการตอบคำถามที่ผู้ปกครองได้กรอกมาในการลงทะเบียน 2. นิทรรศการ SK Open House ในบริเวณต่างๆ ของโรงเรียน ได้แก่ โซนนิทรรศการ ใต้อาคาร 123 ปี สวนกุหลาบวิทยาลัยเกี่ยวกับหลักสูตรปกติ, GATE Program, Gifted Science, EPLUS+ และหลักสูตรใหม่ "วิทยาศาสตร์หุ่นยนต์" อีกทั้งยังมีการให้ข้อมูลเกี่ยวกับการรับนักเรียน ความสำเร็จของโรงเรียนในปีที่ผ่านมา นิทรรศการจากครูแนะแนวและความร่วมมือทางวิชาการ นอกจากนี้ ยังมีกิจกรรม "ตึกยาวทรงคุณค่า" ณ บริเวณพิพิธภัณฑ์ตึกยาว, "SK Sports Challenge" ณ บริเวณหน้าทางเดินตึกยาว และ "ท้องฟ้าจำลองสิรินธร"`,
    },
    {
      question: "มางาน SK Open House 2026 ต้องแต่งกายอย่างไร",
      answer: "นักเรียนและผู้ปกครองแต่งกายชุดสุภาพเพื่อเข้าร่วมกิจกรรมครับ",
    },
    {
      question:
        "หากมางาน SK Open House 2026 ไม่ได้ จะติดตามข้อมูลเกี่ยวกับโรงเรียนและการรับสมัครนักเรียนได้อย่างไร",
      answer:
        "ผู้ปกครองและนักเรียนสามารถติดตามข่าวสารเกี่ยวกับโรงเรียนและการรับสมัครนักเรียนได้จาก https://www.facebook.com/PRsuankularb ครับ",
    },
    {
      question: "มีกิจกรรมพิเศษสำหรับนักเรียนหรือไม่",
      answer: `นอกจากการบรรยายหลักสูตร โรงเรียนได้จัดกิจกรรมเพื่อสร้างความเข้าใจเกี่ยวกับโรงเรียนและหลักสูตร โดยครูและรุ่นพี่สวนกุหลาบฯ และมีการสะสมคะแนนสำหรับนักเรียน จำนวน 10 ฐานกิจกรรม ดังนี้ครับ

ฐานที่ 1 – บูธนิทรรศการข้อมูลการรับนักเรียน และหลักสูตรโรงเรียนสวนกุหลาบวิทยาลัย
ฐานที่ 2 – บูธนิทรรศการ “Year in Review” : บันทึกความสําเร็จของเด็กสวนฯ
ฐานที่ 3 - บูธนิทรรศการห้องเรียนวิทยาศาสตร์หุ่นยนต์ Robotic Science
ฐานที่ 4 - บูธนิทรรศการความร่วมมือทางด้านวิชาการในประเทศและต่างประเทศ
ฐานที่ 5 - บูธนิทรรศการโครงการห้องเรียนพิเศษ EPLUS+
ฐานที่ 6 - บูธนิทรรศการโครงการห้องเรียนพิเศษ GATE Program
ฐานที่ 7 - บูธนิทรรศการโครงการห้องเรียนพิเศษ Gifted Science
ฐานที่ 8 – SK Sports Challenge
ฐานที่ 9 - ตึกยาวทรงคุณค่า
ฐานที่ 10 – ท้องฟ้าจําลองสิรินธร

เมื่อนักเรียนสะสมคะแนนครบตามที่กำหนด สามารถแลกรับของรางวัลพิเศษจากทางโรงเรียนได้ครับ`,
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

  const { data: scheduleItems } = await fetchAPI("/v1/schedule", {
    method: "GET",
  }).then((res) => res.json());

  return {
    props: { messages, faqs, busRoute, scheduleItems },
  };
};

export default LandingPage;
