import { StylableFC } from "@/utils/types/common";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import { person } from "@/utils/types/person";
import Button from "@/components/common/Button";
import constructName from "@/utils/helpers/constructName";
import { pick } from "radash";
import { useTranslations } from "next-intl";

const PassportLinkConfirmDialog: StylableFC<{
  open: boolean;
  person: person;
  onClose: () => void;
  passportID: string;
}> = ({ open, person, onClose, passportID }) => {
  const t = useTranslations("passport");

  return (
    <Dialog open={open}>
      <div className="flex flex-col">
        <Text type="headline" className="text-tertiary!">
          {t("confirmConnect")}
        </Text>
        <Text type="headline" className="text-xl!">
          {constructName(pick(person, ["firstname", "lastname", "prefix"]))}
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Button
          variant="primarySurface"
          onClick={() => {
            onClose();
          }}
        >
          {t("action.close")}
        </Button>
        <Button variant="primary" onClick={() => {}}>
          {t("action.link")}
        </Button>
      </div>
    </Dialog>
  );
};

export default PassportLinkConfirmDialog;
