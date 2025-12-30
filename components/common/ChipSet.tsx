import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const ChipSet: StylableFC<{ children: React.ReactNode }> = ({
  children,
  style,
  className,
}) => {
  return (
    <div style={style} className={cn("flex w-full gap-2 flex-wrap",className)}>
      {children}
    </div>
  );
};

export default ChipSet;