import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import type { StylableFC, BusRoutes } from "@/utils/types/common";
import { useTranslations } from "next-intl";
import MaterialIcon from "../common/MaterialIcon";
import BusRouteContainer from "./subcomponents/BusRouteContainer";

const TransitGuideBusSection: StylableFC<{ routes: BusRoutes }> = ({
  routes,
}) => {
  const t = useTranslations("landing");
  return (
    <Card className="w-full flex-col">
      <div className="text-primary flex items-center">
        <MaterialIcon icon="directions_bus" className="pr-1" />
        <Text type="title" className="font-bold!">
          {t("bus.title")}
        </Text>
      </div>
      <div className="flex h-full flex-col gap-1">
        <div
          className="border-primary-border flex h-full w-full flex-col
            rounded-md border"
        >
          <div className="flex items-center justify-between p-2 pl-3">
            <Text type="title" className="opacity-100!">
              {t("bus.stop")}{" "}
              <span className="font-bold!">{t("bus.infront")}</span>
            </Text>
          </div>
          <div className="border-primary-border h-full border-t p-2">
            <BusRouteContainer routes={routes.infront} />
          </div>
        </div>
        <div
          className="border-primary-border flex h-full w-full flex-col
            rounded-md border"
        >
          <div className="flex items-center justify-between p-2 pl-3">
            <Text type="title" className="opacity-100!">
              {t("bus.stop")}{" "}
              <span className="font-bold!">{t("bus.opposite")}</span>
            </Text>
          </div>
          <div className="border-primary-border h-full border-t p-2">
            <BusRouteContainer routes={routes.opposite} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransitGuideBusSection;
