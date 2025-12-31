import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const ChipSet: StylableFC<{ children: React.ReactNode }> = ({
  children,
  style,
  className,
}) => {
  return (
    <div style={style} className={cn("flex w-full flex-wrap gap-2", className)}>
      {children}
    </div>
  );
};

export default ChipSet;
