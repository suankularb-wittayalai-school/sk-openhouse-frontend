import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import { useTranslations } from "next-intl";
import type { FC } from "react";

const MissingInformationDialog: FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = useTranslations("register.family");

  return (
    <Dialog>
      <Text type="headline" className="text-xl!">
        {t("title.missingInformation")}
      </Text>
      <Text type="title" className="text-tertiary!">
        {t("title.checkAgain")}
      </Text>
      <Button variant="primary" onClick={onClose}>
        {t("action.close")}
      </Button>
    </Dialog>
  );
};

export default MissingInformationDialog;
