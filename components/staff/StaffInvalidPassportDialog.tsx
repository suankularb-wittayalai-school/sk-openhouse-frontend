import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { FC } from "react";
import { useTranslations } from "next-intl";

const StaffInvalidPassportDialog: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const t = useTranslations("staff");
  return (
    <Dialog onClickOutside={onClose}>
      <div className="flex flex-col gap-2">
        <Text type="headline">{t("scanner.invalid.title")}</Text>
        <p className="flex flex-col gap-0">
          <Text type="title" className="text-tertiary!">
            {t("scanner.invalid.description")}
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

export default StaffInvalidPassportDialog;
