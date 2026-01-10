import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import FAQDropdown from "@/components/landing/subcomponents/FAQDropdown";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, type FC } from "react";

const QUESTIONS = [
  {
    question: "ลงทะเบียนเข้าร่วมงาน SK Open House 2026 อย่างไร",
    answer: (
      <>
        ผู้ปกครองกดปุ่มลงทะเบียนผ่านเว็บไซต์{" "}
        <Link href="/" className="faq-links" target="_blank">
          https://openhouse.mysk.school/
        </Link>{" "}
        ด้วยบัญชี Google (ไม่สามารถใช้บัญชี @sk.ac.th หรือ @student.sk.ac.th
        สำหรับการลงทะเบียนได้) โดยผู้ปกครองจะเป็นเจ้าของบัญชีครอบครัว จากนั้น
        ผู้ปกครองสามารถเพิ่มสมาชิกที่จะเข้าร่วมงาน SK Open House 2026 เช่น
        ผู้ปกครองอีกท่าน หรือนักเรียนได้ครับ
      </>
    ),
  },
  {
    question: "จำเป็นต้องเพิ่มนักเรียนเป็นสมาชิกในบัญชีครอบครัวหรือไม่",
    answer: (
      <>
        ไม่จำเป็น ถ้าหากเพิ่มนักเรียนเป็นสมาชิกในบัญชีครอบครัว จะมี QR Code
        เพื่อให้นักเรียนสะสมคะแนนจากการเข้าร่วมกิจกรรมในโซนนิทรรศการ
        และนำไปแลกของรางวัลได้ครับ
      </>
    ),
  },
  {
    question: "งานจัดที่ไหน และเมื่อใด",
    answer: (
      <>
        จัดขึ้นที่โรงเรียนสวนกุหลาบวิทยาลัย ถนนตรีเพชร เขตพระนคร กรุงเทพฯ​
        <br />
        วันที่ 11 มกราคม 2569 เริ่มงานเวลา 08:00 น. เป็นต้นไปครับ
      </>
    ),
  },
  {
    question: "ภายในงานมีกิจกรรมอะไรบ้าง",
    answer: (
      <div className="flex flex-col gap-2">
        ภายในงานจะมีกิจกรรม ดังนี้
        <ol>
          <li>
            การนำเสนอข้อมูลหลักสูตรของแต่ละโครงการฯ ของโรงเรียนสวนกุหลาบวิทยาลัย
            ณ หอประชุมสวนกุหลาบรำลึก โดยตัวแทนของแต่ละหลักสูตร
            พร้อมการตอบคำถามที่ผู้ปกครองได้กรอกมาในการลงทะเบียน
          </li>
          <li>
            นิทรรศการ SK Open House ในบริเวณต่างๆ ของโรงเรียน ได้แก่
            โซนนิทรรศการ ใต้อาคาร 123 ปี สวนกุหลาบวิทยาลัยเกี่ยวกับหลักสูตรปกติ,
            GATE Program, Gifted Science, EPLUS+ และหลักสูตรใหม่
            “วิทยาศาสตร์หุ่นยนต์”
          </li>
        </ol>
        อีกทั้งยังมีการให้ข้อมูลเกี่ยวกับการรับนักเรียน
        ความสำเร็จของโรงเรียนในปีที่ผ่านมา
        นิทรรศการจากครูแนะแนวและความร่วมมือทางวิชาการ นอกจากนี้ ยังมีกิจกรรม
        “ตึกยาวทรงคุณค่า” ณ บริเวณพิพิธภัณฑ์ตึกยาว, “SK Sports Challenge” ณ
        บริเวณหน้าทางเดินตึกยาว และ “uท้องฟ้าจำลองสิรินธร”
      </div>
    ),
  },
  {
    question: "มางานต้องแต่งกายอย่างไร",
    answer: <>นักเรียนและผู้ปกครองแต่งกายชุดสุภาพเพื่อเข้าร่วมกิจกรรมครับ</>,
  },
  {
    question:
      "หากมางานไม่ได้ จะติดตามข้อมูลเกี่ยวกับโรงเรียนและการรับสมัครนักเรียนได้อย่างไร",
    answer: (
      <>
        ผู้ปกครองและนักเรียนสามารถติดตามการถ่ายทอดสดการนำเสนอข้อมูลหลักสูตรของแต่ละโครงการฯ
        ของโรงเรียนสวนกุหลาบวิทยาลัยได้จากเพจ{" "}
        <Link
          href="https://www.facebook.com/PRsuankularb"
          className="faq-links"
          target="_blank"
        >
          Facebook
        </Link>{" "}
        และติดตามข่าวสารเกี่ยวกับโรงเรียนและการรับสมัครนักเรียนได้ผ่านช่องทางเดียวกันนี้ครับ
      </>
    ),
  },
  {
    question: "มีกิจกรรมพิเศษสำหรับนักเรียนหรือไม่",
    answer: (
      <div className="flex flex-col gap-2">
        นอกจากการบรรยายหลักสูตร
        โรงเรียนได้จัดกิจกรรมเพื่อสร้างความเข้าใจเกี่ยวกับโรงเรียนและหลักสูตร
        โดยครูและรุ่นพี่สวนกุหลาบฯ และมีการสะสมคะแนนสำหรับนักเรียน จำนวน 10
        ฐานกิจกรรม ดังนี้
        <ol>
          <li>
            บูธนิทรรศการข้อมูลการรับนักเรียน
            และหลักสูตรโรงเรียนสวนกุหลาบวิทยาลัย
          </li>
          <li>บูธนิทรรศการ “Year in Review” : บันทึกความสําเร็จของเด็กสวนฯ</li>
          <li>บูธนิทรรศการห้องเรียนวิทยาศาสตร์หุ่นยนต์ Robotic Science</li>
          <li>บูธนิทรรศการความร่วมมือทางด้านวิชาการในประเทศและต่างประเทศ</li>
          <li>บูธนิทรรศการโครงการห้องเรียนพิเศษ EPLUS+</li>
          <li>บูธนิทรรศการโครงการห้องเรียนพิเศษ GATE Program</li>
          <li>บูธนิทรรศการโครงการห้องเรียนพิเศษ Gifted Science</li>
          <li>SK Sports Challenge</li>
          <li>ตึกยาวทรงคุณค่า</li>
          <li>ท้องฟ้าจําลองสิรินธร</li>
        </ol>
        เมื่อนักเรียนสะสมคะแนนครบตามที่กำหนด
        สามารถแลกรับของรางวัลพิเศษจากทางโรงเรียนได้ครับ
      </div>
    ),
  },
  {
    question: "ต้องการเข้าฟังบรรยายบนหอประชุม ต้องทำอย่างไร",
    answer: (
      <>
        ทุกท่านที่ลงทะเบียนในช่วงเวลาที่กำหนด
        จะได้รับตั๋วเข้าหอประชุมเพื่อใช้สำหรับเข้าหอประชุมได้ครับ
        ในกรณีที่ไม่ได้เข้าหอประชุมพร้อมกัน ให้บันทึกหน้าจอ
        หรือพิมพ์ตั๋วให้กับผู้เข้าร่วมคนอื่น ๆ เพื่อใช้ในการผ่านประตู ทั้งนี้
        การลงทะเบียนมิได้เป็นการสำรองที่นั่ง ผู้ที่มาถึงหอประชุมก่อนในวันงาน
        มีสิทธิ์ได้ที่นั่งก่อนครับ
      </>
    ),
  },
  {
    question: "หากที่นั่งบนหอประชุมเต็มแล้ว สามารถรับชมการบรรยายได้ที่ใด",
    answer: (
      <>
        โรงเรียนได้จัดสรรพื้นที่สำหรับรับชมถ่ายทอดสดการบรรยายไว้ ณ ห้องนวัตกรรม
        ตึกดำรงราชานุภาพ โรงเรียนสวนกุหลาบวิทยาลัย และการถ่ายทอดสดผ่านทาง{" "}
        <Link
          href="https://www.facebook.com/PRsuankularb"
          className="faq-links"
          target="_blank"
        >
          Facebook
        </Link>{" "}
        ไว้สำหรับผู้ที่ไม่สะดวกรับชมภายในงานครับ
      </>
    ),
  },
] as const;

const FAQsContainer: FC = () => {
  const t = useTranslations("landing");

  const [openAIWarningDialog, setOpenAIWarningDialog] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Text type="body">{t("section.faq")}</Text>
        <div className="flex flex-col gap-1">
          {QUESTIONS.map((faqItem) => (
            <FAQDropdown question={faqItem.question} key={faqItem.question}>
              {faqItem.answer}
            </FAQDropdown>
          ))}
        </div>

        <Button
          variant="primarySurface"
          icon="comic_bubble"
          className="w-full"
          onClick={() => setOpenAIWarningDialog(true)}
        >
          คุยกับ ROSE-BOT 3.0
        </Button>
      </div>
      <AnimatePresence>
        {openAIWarningDialog && (
          <Dialog onClickOutside={() => setOpenAIWarningDialog(false)}>
            <div className="flex flex-col gap-2">
              <Text type="headline">
                คุณกำลังดำเนินการต่อไปยัง
                <br />
                ROSE-BOT 3.0
              </Text>
              <Text type="title" className="text-tertiary">
                กรุณาล็อกอินด้วย Gmail ก่อนเข้าใช้งานสอบถามข้อมูล
              </Text>
            </div>

            <div
              className="border-primary-border flex gap-2 rounded-lg border p-2"
            >
              <MaterialIcon icon="warning" className="text-secondary" />
              <div className="flex flex-col gap-2">
                <Text type="body" className="text-tertiary">
                  ROSE-BOT 3.0 ถูกขับเคลื่อนด้วย Gemini Gem สำหรับงาน SK Open
                  House 2026
                  เพื่อตอบคำถามเกี่ยวกับการรับสมัครนักเรียนและข้อมูลเกี่ยวกับโรงเรียนเบื้องต้น
                </Text>
                <Text type="body" className="text-tertiary">
                  ทั้งนี้ ROSE-BOT 3.0 อาจให้ข้อมูลที่คลาดเคลื่อน
                  ควรตรวจสอบจากครู บุคลากร
                  หรือนักเรียนภายในโรงเรียนสวนกุหลาบวิทยาลัยอีกครั้ง
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="primarySurface"
                onClick={() => setOpenAIWarningDialog(false)}
              >
                ยกเลิก
              </Button>
              <Link
                href={
                  "https://gemini.google.com/gem/1RnxVcA4XMQV0loZ6myZteUalF-UwcsDW"
                }
                target="_blank"
              >
                <Button variant="primary" className="w-full">
                  ต่อไป
                </Button>
              </Link>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default FAQsContainer;
