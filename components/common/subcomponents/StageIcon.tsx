import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";

const StageIcon: StylableFC<{
  stage: number;
  title: string;
  active: boolean;
}> = ({ stage, title, active }) => {
  return (
    <div className="-mx-1 flex w-12 flex-none flex-col items-center gap-0.5">
      <div
        className={cn(
          "grid h-6 w-6 place-items-center rounded-full text-sm",
          active ? "bg-primary text-white" : "bg-primary-border text-primary",
        )}
      >
        {stage}
      </div>
      <p className="text-primary text-xs">{title}</p>
    </div>
  );
};

export default StageIcon;
