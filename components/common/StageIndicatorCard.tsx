import StageConnectingLines from "@/components/common/subcomponents/StageConnectingLines";
import StageIcon from "@/components/common/subcomponents/StageIcon";
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
  experimental?: boolean;
  className?: string;
}> = ({ stages, active, experimental = false, className }) => {
  const t = useTranslations();

  return experimental == false ? (
    <div
      className={cn(
        "solid border-primary-border rounded-lg border bg-white p-3",
        className,
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
  ) : (
    // Test Design for Stages Indicator
    <div className={cn("flex gap-0.5 *:duration-500", className)}>
      {stages.map((stage, i) => {
        return (
          <div className={cn("flex w-full flex-col")}>
            <p
              className={cn(
                "p-1 pb-0.5 text-left text-sm transition-colors",
                i <= active ? "text-primary" : "text-primary-border",
              )}
            >
              <b>{i + 1}</b> - {stages[i]}
            </p>
            <div className="bg-primary-border h-1 w-full">
              <div
                className={cn(
                  "bg-primary h-full w-0 transition-all",
                  i <= active && "w-full",
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StageIndicatorCard;
