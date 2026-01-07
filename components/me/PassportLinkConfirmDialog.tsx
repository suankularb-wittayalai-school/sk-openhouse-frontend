import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import constructName from "@/utils/helpers/constructName";
import type { ChildPerson } from "@/utils/types/person";
import { useTranslations } from "next-intl";
import { pick } from "radash";
import { type FC, useState } from "react";

type PassportLinkConfirmDialogProps = {
  person: ChildPerson;
  onClose: () => void;
  onScannerDialogClose: () => void;
  passportId: string;
};

const PassportLinkConfirmDialog: FC<PassportLinkConfirmDialogProps> = ({
  person,
  onClose,
  onScannerDialogClose,
  passportId,
}) => {
  const t = useTranslations("passport");

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const handleLinkPassport = () => {
    setIsBusy(true);
    // TODO: API IMPLEMENTATION FUNCTIONALITY
    setTimeout(() => {
      onClose();
      onScannerDialogClose();
    }, 1000);
  };

  return (
    <Dialog onClickOutside={onClose}>
      <div className="flex flex-col gap-2">
        <Text type="headline" className="text-xl!">
          {t("scanner.dialog.confirm.title")}
        </Text>
        <p className="flex flex-col gap-0">
          <Text type="title" className="text-tertiary!">
            {t("scanner.dialog.confirm.description")}
          </Text>
          <Text type="title" className="font-bold!">
            {constructName(pick(person, ["firstname", "lastname", "prefix"]))}
          </Text>
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primarySurface"
          onClick={() => onClose()}
          className="w-full"
        >
          {t("action.close")}
        </Button>
        <Button
          variant="primary"
          onClick={() => handleLinkPassport()}
          className="w-full"
          busy={isBusy}
        >
          {t("action.link")}
        </Button>
      </div>
    </Dialog>
  );
};

export default PassportLinkConfirmDialog;
