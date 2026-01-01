// Imports
import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import MaterialIcon from "./MaterialIcon";

const DatePicker: StylableFC<{
  name: string;
  label: string;
  date: string;
  setDate: (date: string) => void;
}> = ({ name, label, date, setDate }) => {
  return (
    <div className="flex w-full flex-1 flex-col items-start gap-0.5 text-right">
      <Text type="body">{label}</Text>
      <div className="w-full">
        <input
          name={name}
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="border-primary-border text-tertiary flex h-8 w-full
            items-center gap-2.5 rounded-sm border py-1 pr-1 pl-2 text-sm
            leading-[120%] font-normal"
        />
      </div>
    </div>
  );
};

export default DatePicker;
