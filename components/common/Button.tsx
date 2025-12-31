import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const Button: StylableFC<{
  variant: "primary" | "primarySurface" | "transparent";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ variant, children, disabled = false, onClick, style, className }) => {
  const BUTTON_VARIANT = {
    transparent: `text-primary hover:bg-primary/10`,
    primary: `bg-primary text-on-primary hover:brightness-80`,
    primarySurface: `bg-primary-surface text-primary border 
      border-primary-border hover:brightness-90`,
  };
  return (
    <button
      style={style}
      className={cn(
        `flex h-10 cursor-pointer flex-col items-center justify-center gap-2
        self-stretch rounded-[6.25rem] transition-all`,
        BUTTON_VARIANT[variant],
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
