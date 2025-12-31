import BusRouteContent from "@/components/landing/BusRouteContent";

type BusRouteContainerType = {
  routes: string[];
};

/**
 * A list of routes to show, seperated and wrapped around nicely by 0.25rem.
 * 
 * @param routes  A list of bus routes to display. [str[]]
 */

const BusRouteContainer = ({ routes }: BusRouteContainerType) => {
  return (
    <div className="flex flex-wrap gap-1">
      {routes.map((route, _i) => {
        return <BusRouteContent key={_i}>{route}</BusRouteContent>;
      })}
    </div>
  );
};

export default BusRouteContainer;
