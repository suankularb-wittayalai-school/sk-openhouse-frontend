import { StylableFC } from "@/utils/types/common";

const CardContainer: StylableFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="![&>*:first-child]:rounded-t-[0.0625rem]
        ![&>*:last-child]:rounded-b-[0.0625rem] [&>*:first-child]:rounded-b-none
        [&>*:last-child]:rounded-t-none [&>*:not(:first-child)]:border-t-0
        [&>*:not(:first-child):not(:last-child)]:rounded-none"
    >
      {children}
    </div>
  );
};

export default CardContainer;
