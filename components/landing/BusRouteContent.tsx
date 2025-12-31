import { StylableFC } from "@/utils/types/common";

/**
 * A bus route is seperated by colored boxes, without making them too lean when
 * the content is too short.
 *
 * @param children  Literally the text inside of the box. [DOM]
 */

const BusRouteContent: StylableFC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div
      className="bg-primary-surface border-primary-border text-primary
        inline-flex min-w-6 justify-center rounded-sm border px-1 py-0.5
        text-xs"
    >
      {children}
    </div>
  );
};

export default BusRouteContent;
