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
      <div className="relative w-full">
        <input
          name={name}
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="border-primary-border text-tertiary flex h-8 w-full
            appearance-none items-center gap-2.5 rounded-sm border py-1 pr-1
            pl-2 text-sm leading-[120%] font-normal"
        />
        <div
          className="text-primary pointer-events-none absolute top-1/2 right-1
            flex -translate-y-1/2 flex-col items-center"
        >
          <MaterialIcon icon="event_note" />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
