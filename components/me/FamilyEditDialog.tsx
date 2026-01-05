import { StylableFC } from "@/utils/types/common";
import Dialog from "@/components/common/Dialog";
import { Family } from "@/utils/types/person";
import Text from "@/components/common/Text";
import { useTranslations } from "next-intl";
import Button from "@/components/common/Button";
import FamilyForm from "@/components/register/FamilyForm";

const FamilyEditDialog: StylableFC<{
  family: Family;
  onFamilyChange: (family: Family) => void;
  onClose: () => void;
  onSubmit: (family: Family) => void;
  onDeleteAdult: (index: number) => void;
  onDeleteChild: (index: number) => void;
}> = ({
  family,
  onFamilyChange,
  onClose,
  onSubmit,
  onDeleteAdult,
  onDeleteChild,
}) => {
  const t = useTranslations("register.family");
  return (
    <Dialog
      onClickOutside={onClose}
      className="max-h-[calc(100vh-4rem)] overflow-scroll p-3!"
    >
      <div className="flex flex-col gap-3">
        <Text type="headline" className="mt-3 text-xl!">
          {t("title.edit")}
        </Text>
        <FamilyForm
          family={family}
          onFamilyChange={onFamilyChange}
          onDeleteAdult={onDeleteAdult}
          onDeleteChild={onDeleteChild}
          hideRegistrantEventExpectations={true}
        />
      </div>
      <div className="self-strech flex flex-row justify-center gap-1">
        <Button
          variant="primarySurface"
          className="grow"
          onClick={() => onClose()}
        >
          {t("action.cancel")}
        </Button>
        <Button
          variant="primary"
          className="grow"
          onClick={() => onSubmit(family)}
        >
          {t("action.save")}
        </Button>
      </div>
    </Dialog>
  );
};

export default FamilyEditDialog;
