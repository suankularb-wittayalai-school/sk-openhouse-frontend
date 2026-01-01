import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";
import MrtStationCard from "./MrtStationCard";
import { useTranslations } from "next-intl";
import { StylableFC } from "@/utils/types/common";

const DirectionMrtCard: StylableFC<{}> = ({}) => {
  const t = useTranslations("landing");

  const MRT_LOCATIONS = [
    {
      station: "สถานีสนามไชย",
      exit: "ทางออก 4",
      mapLocation: "Sanam+Chai+MRT+Station+Exit+4",
    },
    {
      station: "สถานีสามยอด",
      exit: "ทางออก 3",
      mapLocation: "Sam+Yot+MRT+Station+Exit+3",
    },
  ];

  return (
    <Card className="flex flex-col">
      <div className="text-primary item-center flex">
        <MaterialIcon icon="directions_subway" className="pr-1" />
        <Text type="title" className="font-bold!">
          {t("mrt")}
        </Text>
      </div>
      {MRT_LOCATIONS.map((MRT_LOCATION, i) => (
        <MrtStationCard mrtLocation={MRT_LOCATION} key={i}/>
      ))}
    </Card>
  );
};

export default DirectionMrtCard;
