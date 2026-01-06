import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";

const RegistrationCard: StylableFC<{
  persons: person[];
  onClose: () => void;
}> = ({ persons, onClose }) => {
  return (
    <Dialog onClickOutside={() => onClose()}>
      <div
        className="flex flex-col gap-4 print:fixed print:top-0 print:left-0
          print:h-dvh print:w-dvw print:bg-white"
      >
        <div className="flex flex-col">
          <Text type="body">ตั๋วเข้าหอประชุม</Text>
          <Text type="headline" className="text-xl!">
            การบรรยายและนำเสนอหลักสูตร
          </Text>
          <Text type="title">SK Open House 2026 • 11 มกราคม 2569</Text>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Text type="body">ผู้เข้าร่วม</Text>
            <Card className="flex flex-col gap-0! p-0!">
              {persons.map((person, i) => (
                <PersonCard person={person} key={i} count={i + 1} />
              ))}
            </Card>
          </div>
          <div className="text-primary! flex flex-col gap-1 text-sm!">
            <Text type="body">หมายเหตุ</Text>
            <ol>
              <li>
                โปรดถ่ายภาพหน้าจอ หรือพิมพ์ตั๋วใบนี้ให้กับผู้เข้าร่วม คนอื่น ๆ
                ของคุณ ในกรณีที่ไม่ได้เข้าหอประชุมพร้อมกัน
              </li>
              <li>
                ที่นั่งในหอประชุมมีจำนวนจำกัด ผู้ที่มาถึงหอประชุมก่อน
                มีสิทธิ์ได้ที่นั่งก่อน
              </li>
            </ol>
          </div>
        </div>
        <p className="hidden text-center text-xs opacity-50 print:block">
          พิมพ์เมื่อ: {String(new Date())}
        </p>
        <div className="flex gap-2 print:hidden">
          <Button
            variant="outline"
            icon="print"
            className="w-10 shrink-0 *:p-0"
            onClick={() => {
              window.print();
            }}
          />
          <Button
            variant="primary"
            onClick={() => onClose()}
            className="w-full"
          >
            ปิด
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default RegistrationCard;
