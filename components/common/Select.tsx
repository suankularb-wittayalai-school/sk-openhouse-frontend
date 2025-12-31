// Imports
import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";

const Select: StylableFC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-0.5">
      <Text type="body">{label}</Text>
      <div className="self-strech relative flex flex-col">
        <select
          className="border-primary-border text-tertiary appearance-none gap-2.5
            rounded-sm border py-1 pr-8 pl-2 text-sm leading-[120%] font-normal
            focus:outline-none"
        >
          {children}
        </select>
        <div
          className="pointer-events-none absolute top-1/2 right-2 flex
            -translate-y-1/2 flex-col items-center"
        >
          <MaterialIcon icon="arrow_drop_down" />
        </div>
      </div>
    </div>
  );
};

export default Select;
