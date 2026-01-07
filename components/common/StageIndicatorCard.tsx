import StageConnectingLines from "@/components/common/subcomponents/StageConnectingLines";
import StageIcon from "@/components/common/subcomponents/StageIcon";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { Fragment } from "react";

/**
 * A clear indicator of stages the user have to fulfill, it explains the flow,
 * their progress, and what is left.
 *
 * @param stages  List of all the stages, keep it short. [str[]]
 * @param active  The active stage, starts from 0. [int]
 */

const StageIndicatorCard: StylableFC<{
  stages: readonly string[];
  active: number;
  className?: string;
}> = ({ stages, active, className }) => (
  <div
    className={cn(
      "solid border-primary-border rounded-lg border bg-white p-3",
      className,
    )}
  >
    {/* `mx-1` to cancel out the <StageIcon /> negative margin. */}
    <div className="mx-1 flex items-center gap-0">
      {stages.map((stage, idx) => (
        <Fragment key={stage}>
          {idx !== 0 && <StageConnectingLines active={idx < active} />}
          <StageIcon stage={idx + 1} title={stage} active={idx < active} />
        </Fragment>
      ))}
    </div>
  </div>
);

export default StageIndicatorCard;
