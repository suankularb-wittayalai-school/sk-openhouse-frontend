import { StylableFC } from "@/utils/types/common";

const CardContainer: StylableFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="border-primary-border overflow-hidden rounded-lg border
        *:rounded-none *:border-0 [&>*:not(:first-child)]:border-t-1"
    >
      {children}
    </div>
  );
};

export default CardContainer;
