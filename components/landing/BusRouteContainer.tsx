import BusRouteContent from "@/components/landing/BusRouteContent";
import { StylableFC } from "@/utils/types/common";

/**
 * A list of routes to show, seperated and wrapped around nicely by 0.25rem.
 *
 * @param routes  A list of bus routes to display. [str[]]
 */

const BusRouteContainer: StylableFC<{
  routes: string[];
}> = ({ routes }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {routes.map((route, _i) => {
        return <BusRouteContent key={_i}>{route}</BusRouteContent>;
      })}
    </div>
  );
};

export default BusRouteContainer;
