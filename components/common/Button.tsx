import MaterialIcon from "@/components/common/MaterialIcon";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const Button: StylableFC<{
  variant: "primary" | "primarySurface" | "transparent" | "outline";
  children?: React.ReactNode;
  icon?: string;
  disabled?: boolean;
  busy?: boolean;
  busyWithText?: boolean;
  onClick?: () => void;
}> = ({
  variant,
  children,
  icon,
  disabled = false,
  busy = false,
  busyWithText = false,
  onClick,
  style,
  className,
}) => {
  const BUTTON_VARIANT = {
    transparent: `text-primary hover:bg-primary/10`,
    outline: `text-primary hover:bg-primary/10 border 
      border-primary-border`,
    primary: `bg-primary text-on-primary hover:brightness-80`,
    primarySurface: `bg-primary-surface text-primary border 
      border-primary-border hover:brightness-90`,
  };
  return (
    <button
      style={style}
      className={cn(
        `flex h-10 cursor-pointer flex-col items-center justify-center gap-2
        self-stretch rounded-full transition-all`,
        BUTTON_VARIANT[variant],
        (disabled || busy) && "pointer-events-none brightness-60",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={cn(
          `flex flex-1 items-center justify-center gap-2 self-stretch px-6
          py-2.5 text-sm leading-[140%] font-normal`,
          icon || busy && "pl-4.5!"
        )}
      >
        {busy && (
          <div className="grid place-items-center">
            <MaterialIcon icon="progress_activity" className="animate-spin" />
          </div>
        )}
        {!(busy && !busyWithText) && (
          <>
            {icon && <MaterialIcon icon={icon} />}
            {children}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
