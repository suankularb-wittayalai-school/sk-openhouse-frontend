// Imports
import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";

const TextField: StylableFC<{
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
  setValue: (value: string) => void;
}> = ({ name, label, value, disabled = false, setValue, className }) => {
  return (
    <div className={cn("flex flex-1 flex-col items-start gap-0.5", className)}>
      <Text type="body">{label}</Text>
      <input
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={label}
        className={cn(
          `border-primary-border text-tertiary flex h-8 items-center gap-2.5
          self-stretch rounded-sm border px-2 py-1.5 text-sm leading-[120%]
          font-normal`,
          disabled ? "pointer-events-none cursor-not-allowed opacity-50" : null,
        )}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;
