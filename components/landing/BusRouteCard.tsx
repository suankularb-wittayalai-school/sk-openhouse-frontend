import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import BusRouteContainer from "./BusRouteContainer";
import { StylableFC } from "@/utils/types/common";
import { BusRoute } from "@/utils/types/landing";
import MaterialIcon from "../common/MaterialIcon";
import { useTranslations } from "next-intl";

const BusRouteCard: StylableFC<{ route: BusRoute }> = ({ route }) => {
  const t = useTranslations("landing");
  return (
    <Card className="flex-col">
      <div className="text-primary flex items-center">
        <MaterialIcon icon="directions_bus" className="pr-1" />
        <Text type="title" className="font-bold!">
          {t("bus.title")}
        </Text>
      </div>
      <div>
        <Text type="body" className="opacity-100!">
          {t("bus.stop")}
          <span className="font-bold!">{t("bus.infornt")}</span>
        </Text>
        <BusRouteContainer routes={route.infront} />
      </div>
      <div>
        <Text type="body" className="opacity-100!">
          {t("bus.stop")}
          <span className="font-bold!">{t("bus.opposite")}</span>
        </Text>
        <BusRouteContainer routes={route.opposite} />
      </div>
    </Card>
  );
};

export default BusRouteCard;
