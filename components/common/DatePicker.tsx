import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import { InputHTMLAttributes } from "react";
import MaterialIcon from "@/components/common/MaterialIcon";

type DatePickerProps = StylableFC<
  { label: string } & InputHTMLAttributes<HTMLInputElement>
>;

const DatePicker: DatePickerProps = ({ label, ...props }) => (
  <div className="flex w-full flex-1 flex-col items-start gap-0.5 text-right">
    <Text type="body">{label}</Text>
    <div
      className="border-primary-border text-tertiary relative flex h-8 w-full
        items-center gap-2.5 rounded-sm border py-1 pr-1 pl-2 text-sm
        leading-[120%] font-normal"
    >
      <input type="date" {...props} className="w-full" />
      <div
        className="text-primary pointer-events-none absolute top-1/2 right-0.75
          flex -translate-y-1/2 flex-col items-center"
      >
        <MaterialIcon icon="calendar_month" size={24} />
      </div>
    </div>
  </div>
);

export default DatePicker;
