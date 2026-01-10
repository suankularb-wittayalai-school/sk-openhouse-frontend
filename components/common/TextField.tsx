import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import cn from "@/utils/helpers/cn";
import { InputHTMLAttributes } from "react";

type TextFieldProps = StylableFC<
  { label: string } & InputHTMLAttributes<HTMLInputElement>
>;

const TextField: TextFieldProps = ({ label, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-0.5 min-w-0", className)}>
      <Text type="body">{label}</Text>
      <input
        placeholder={label}
        className={cn(
          `border-primary-border text-tertiary flex h-8 items-center gap-2.5
          rounded-sm border px-2 py-1.5 text-sm leading-[120%] font-normal`,
          props.disabled && "pointer-events-none cursor-not-allowed opacity-50",
        )}
        {...props}
      />
    </div>
  );
};

export default TextField;
