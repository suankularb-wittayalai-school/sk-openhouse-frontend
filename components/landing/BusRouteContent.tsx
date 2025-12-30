type BusRouteChipType = {
  children: React.ReactNode;
};

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
