import Text from "@/components/common/Text";
import type { MrtLocation, StylableFC } from "@/utils/types/common";

const MapsMRTStationLocation: StylableFC<{ mrtLocation: MrtLocation }> = ({
  mrtLocation,
}) => (
  <div
    className="border-primary-border h-max w-full overflow-hidden rounded-md
      border"
  >
    <div className="flex items-center justify-between p-2 pl-3">
      <Text type="title" className="text-primary! opacity-100!">
        <span className="font-bold">{mrtLocation.station}</span>{" "}
        <span>{mrtLocation.exit}</span>
      </Text>
    </div>
    <div className="border-primary-border overflow-hidden border-t">
      <iframe
        src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&origin=${mrtLocation.mapLocation},Bangkok&destination=Suankularb+Wittayalai+School,Bangkok&mode=walking&zoom=15`}
        className="h-full max-h-100 w-full border-none"
        loading="lazy"
      />
    </div>
  </div>
);

export default MapsMRTStationLocation;
