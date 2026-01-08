import { StylableFC } from "@/utils/types/common";
import cn from "@/utils/helpers/cn";
const SegmentedButton: StylableFC<{ children: React.ReactNode }> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      style={style}
      className={cn(
        `flex flex-row *:w-full [&>*:first-child]:rounded-r-none
        [&>*:last-child]:rounded-l-none
        [&>*:not(:first-child):not(:last-child)]:rounded-none`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SegmentedButton;
