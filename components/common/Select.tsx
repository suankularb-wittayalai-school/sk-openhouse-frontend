import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import type { StylableFC } from "@/utils/types/common";
import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = StylableFC<
  {
    label: string;
    children: ReactNode;
  } & SelectHTMLAttributes<HTMLSelectElement>
>;

const Select: SelectProps = ({ label, children, className, ...props }) => (
  <div className={cn("flex flex-1 flex-col gap-0.5", className)}>
    <Text type="body">{label}</Text>
    <div className="relative flex flex-col">
      <select
        className="border-primary-border text-tertiary h-8 appearance-none
          gap-2.5 rounded-sm border py-1 pr-8 pl-2 text-sm leading-[120%]
          font-normal focus:outline-none"
        {...props}
      >
        {children}
      </select>
      <div
        className="text-primary pointer-events-none absolute top-1/2 right-1
          flex -translate-y-1/2 flex-col items-center"
      >
        <MaterialIcon icon="arrow_drop_down" />
      </div>
    </div>
  </div>
);

export default Select;
