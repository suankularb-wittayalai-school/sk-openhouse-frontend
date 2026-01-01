import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const Chip: StylableFC<{
  children: React.ReactNode;
  variant: "primary" | "surface" | "outline";
  apperance: "square" | "rounded";
}> = ({ children, style, className, variant, apperance }) => {
  const CHIP_VARIANT = {
    outline: "text-primary border border-primary-border",
    primary: "bg-primary text-on-primary",
    surface: "bg-primary-surface text-primary border border-primary-border",
  };
  const CHIP_APPERANCE = {
    square: "px-1 py-0.5 rounded-sm",
    rounded: "px-2 py-1 rounded-full",
  };
  return (
    <div
      style={style}
      className={cn(
        "flex w-fit shrink-0 border text-[12px]",
        CHIP_VARIANT[variant],
        CHIP_APPERANCE[apperance],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
