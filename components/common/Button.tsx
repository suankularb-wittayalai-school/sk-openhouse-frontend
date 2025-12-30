import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const Button: StylableFC<{
  varient: "primary" | "primarySurface" | "transparent";
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}> = ({ varient, children, disabled = false, onClick, style, className }) => {
  const BUTTON_VARIENT = {
    transparent: "text-primary",
    primary: "bg-primary text-on-primary",
    primarySurface:
      "bg-primary-surface text-primary border border-primary-border",
  };
  return (
    <button
      style={style}
      className={cn(
        `flex h-10 flex-col items-center justify-center gap-2 self-stretch
        rounded-[6.25rem]`,
        BUTTON_VARIENT[varient],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={cn(
          `flex flex-1 items-center justify-center gap-2 self-stretch px-6
          py-2.5 text-sm leading-[140%] font-normal`,
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
