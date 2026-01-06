import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";

const Select: StylableFC<{
  name: string;
  value: any;
  setValue: (value: any) => void;
  label: string;
  children: React.ReactNode;
}> = ({ name, value, setValue, label, children }) => {
  return (
    <div className="flex flex-1 flex-col gap-0.5">
      <Text type="body">{label}</Text>
      <div className="self-strech relative flex flex-col">
        <select
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="border-primary-border text-tertiary h-8 appearance-none
            gap-2.5 rounded-sm border py-1 pr-8 pl-2 text-sm leading-[120%]
            font-normal focus:outline-none"
        >
          {children}
        </select>
        <div
          className="text-primary pointer-events-none absolute top-1/2 right-2
            flex -translate-y-1/2 flex-col items-center"
        >
          <MaterialIcon icon="arrow_drop_down" />
        </div>
      </div>
    </div>
  );
};

export default Select;
