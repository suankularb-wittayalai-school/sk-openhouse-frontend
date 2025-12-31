import StageConnectingLines from "@/components/common/StageConnectingLines";
import StageIcon from "@/components/common/StageIcon";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { useTranslations } from "next-intl";

/**
 * A clear indicator of stages the user have to fulfill, it explains the flow,
 * their progress, and what is left.
 *
 * @param stages  List of all the stages, keep it short. [str[]]
 * @param active  The active stage, starts from 0. [int]
 */

const StageIndicatorCard: StylableFC<{
  stages: string[];
  active: number;
}> = ({ stages, active }) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "solid border-primary-border rounded-lg border bg-white p-3",
      )}
    >
      {/* `mx-1` to cancel out the <StageIcon /> negative margin. */}
      <div className="mx-1 flex items-center gap-0">
        {stages.map((stage, _i) => {
          return (
            <>
              {_i !== 0 && <StageConnectingLines active={_i <= active} />}
              <StageIcon stage={_i + 1} title={stage} active={_i <= active} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StageIndicatorCard;
