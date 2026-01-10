import { StylableFC } from "@/utils/types/common";
import Card from "../common/Card";
import MaterialIcon from "../common/MaterialIcon";
import Text from "@/components/common/Text";
import { Passport } from "@/utils/types/passport";

const PrizeRedemptionCard: StylableFC<{
  tier: string;
  requirement: number;
  passport: Passport;
}> = ({ tier, requirement, passport }) => {
  return (
    <Card className="theme-orange items-center">
      <MaterialIcon icon="package_2" className="text-primary" />
      <div className="flex flex-1 flex-col">
        <Text type="title">{tier}</Text>
        <Text type="body">{requirement}</Text>
      </div>
    </Card>
  );
};

export default PrizeRedemptionCard;
