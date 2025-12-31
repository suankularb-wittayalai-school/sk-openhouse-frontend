// Imports
import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";

const DatePicker: StylableFC<{
  name: string;
  label: string;
  date: string;
  setDate: () => void;
}> = ({ name, label, date, setDate }) => {
  return (
    <div className="flex flex-1 flex-col items-start gap-0.5">
      <Text type="body">{label}</Text>
      <input
        name={name}
        type="date"
        value={date}
        onChange={setDate}
        className="self-strech border-primary-border text-tertiary flex
          items-center gap-2.5 rounded-sm border py-1 pr-1 pl-2 text-sm
          leading-[120%] font-normal"
      />
    </div>
  );
};

export default DatePicker;
