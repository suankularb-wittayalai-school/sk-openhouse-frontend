import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import { StylableFC } from "@/utils/types/common";
import { useTranslations } from "next-intl";

const PassportLinkInvalidDialog: StylableFC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const t = useTranslations("passport");

  return (
    <Dialog onClickOutside={onClose}>
      <div className="flex flex-col gap-2">
        <Text type="headline" className="text-xl!">
          {t("scanner.dialog.invalid.title")}
        </Text>
        <p className="flex flex-col gap-0">
          <Text type="title" className="text-tertiary!">
            {t("scanner.dialog.invalid.description")}
          </Text>
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => {
            onClose();
          }}
          className="w-full"
        >
          {t("action.scanAgain")}
        </Button>
      </div>
    </Dialog>
  );
};

export default PassportLinkInvalidDialog;
