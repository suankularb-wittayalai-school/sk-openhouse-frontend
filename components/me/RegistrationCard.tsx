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
          <Text type="body">
            บัตรการลงทะเบียน<span className="print:hidden">ดิจิทัล</span>
          </Text>
          <Text type="headline" className="text-xl!">
            SK Open House 2026
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Text type="body">วันที่</Text>
            <Text type="title">11 มกราคม พ.ศ. 2569</Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text type="body">ผู้เข้าร่วม</Text>
            <Card className="flex flex-col gap-0! p-0!">
              {persons.map((person, i) => (
                <PersonCard person={person} key={i} count={i + 1} />
              ))}
            </Card>
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
