import { StylableFC } from "@/utils/types/common";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import MaterialIcon from "@/components/common/MaterialIcon";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";

const StaffConfirmDialog: StylableFC<{
  title: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  from: { icon: string; content: string };
  to: { icon: string; content: string };
}> = ({ title, onClose, onCancel, onConfirm, from, to }) => {
  const t = useTranslations("staff.action");
  return (
    <Dialog
      onClickOutside={onClose}
      className="theme-orange flex flex-col gap-4"
    >
      <Text type="headline">{title}</Text>
      <div className="flex flex-col gap-1">
        <div
          className="border-primary-border flex items-center gap-2 rounded-lg
            border p-1"
        >
          <MaterialIcon icon={from.icon} className="text-primary" />
          <Text type="body" className="!opacity-100">
            {from.content}
          </Text>
        </div>
        <MaterialIcon
          icon="arrow_downward_alt"
          className="text-primary self-center"
        />
        <div
          className="border-primary-border flex items-center gap-2 rounded-lg
            border p-1"
        >
          <MaterialIcon icon={to.icon} className="text-primary" />
          <Text type="body" className="!opacity-100">
            {to.content}
          </Text>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primarySurface"
          className="flex-1"
          onClick={() => onCancel()}
        >
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => onConfirm()}
        >
          {t("confirm")}
        </Button>
      </div>
    </Dialog>
  );
};

export default StaffConfirmDialog;
