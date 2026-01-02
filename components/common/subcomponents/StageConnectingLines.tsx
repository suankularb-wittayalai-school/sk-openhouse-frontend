import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const StageConnectingLines: StylableFC<{
  active: boolean;
}> = ({ active }) => {
  return (
    <div
      className={cn(
        "w-full border-t pb-4.5",
        active
          ? "border-primary border-solid"
          : "border-primary-border border-dashed",
      )}
    />
  );
};

export default StageConnectingLines;
