import BusRouteContent from "@/components/landing/BusRouteContent";

type BusRouteContainerType = {
  routes: string[];
};

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
