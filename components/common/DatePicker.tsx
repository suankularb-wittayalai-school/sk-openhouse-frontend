import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import { InputHTMLAttributes } from "react";

type DatePickerProps = StylableFC<
  { label: string } & InputHTMLAttributes<HTMLInputElement>
>;

const DatePicker: DatePickerProps = ({ label, ...props }) => (
  <div className="flex w-full flex-1 flex-col items-start gap-0.5 text-right">
    <Text type="body">{label}</Text>
    <div
      className="flex border-primary-border text-tertiary h-8 w-full items-center
        gap-2.5 rounded-sm border py-1 pr-1 pl-2 text-sm leading-[120%]
        font-normal"
    >
      <input type="date" {...props} className="w-full" />
    </div>
  </div>
);

export default DatePicker;
