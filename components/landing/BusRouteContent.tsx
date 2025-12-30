type BusRouteChipType = {
  children: React.ReactNode;
};

/**
 * A bus route is seperated by colored boxes, without making them too lean when 
 * the content is too short.
 * 
 * @param children  Literally the text inside of the box. [DOM]
 */

const BusRouteContent = ({ children }: BusRouteChipType) => {
  return (
    <div
      className="bg-primary-surface border-primary-border inline-flex min-w-6
        rounded-sm border px-1 py-0.5 text-xs text-primary justify-center"
    >
      {children}
    </div>
  );
};

export default BusRouteContent;
