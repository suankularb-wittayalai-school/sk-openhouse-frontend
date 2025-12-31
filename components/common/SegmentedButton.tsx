// Imports
import { StylableFC } from "@/utils/types/common";

const SegmentedButton: StylableFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="flex flex-row [&>*:first-child]:rounded-r-none
        [&>*:last-child]:rounded-l-none
        [&>*:not(:first-child):not(:last-child)]:rounded-none"
    >
      {children}
    </div>
  );
};

export default SegmentedButton;
