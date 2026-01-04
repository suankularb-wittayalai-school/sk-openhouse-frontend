import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { FC } from "react";
import { useTranslations } from "next-intl";

const MissingInformationDialog: FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = useTranslations("register.family");
  return (
    <Dialog>
      <Text type="headline">{t("title.missingInformation")}</Text>
      <Button variant="primary" onClick={() => onClose()}>
        {t("action.close")}
      </Button>
    </Dialog>
  );
};

export default MissingInformationDialog;
