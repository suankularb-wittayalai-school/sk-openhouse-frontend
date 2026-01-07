import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import FamilyForm from "@/components/register/FamilyForm";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import type { FamilyCreate } from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MissingInformationDialog from "./MissingInformationDialog";

type FamilySectionProps = {
  user: User;
  setFormData: Dispatch<SetStateAction<FamilyCreate | undefined>>;
  setRegisterationStep: Dispatch<SetStateAction<number>>;
};

const FamilySection: FC<FamilySectionProps> = ({
  user,
  setFormData,
  setRegisterationStep,
}) => {
  const t = useTranslations("register.family");

  const [openMissingInfoDialog, setOpenMissingInfoDialog] = useState(false);
  const formMethods = useForm<FamilyCreate>({
    defaultValues: { registrant: { registered_events: [] } },
  });
  const areFieldsInvalid = (formData: FamilyCreate): boolean =>
    isMissingRequiredTextField(formData.registrant) ||
    formData.adults.some((adult) => isMissingRequiredTextField(adult)) ||
    formData.children.some((child) => isMissingRequiredTextField(child));
  const onSubmit = (formData: FamilyCreate) => {
    if (areFieldsInvalid(formData)) return setOpenMissingInfoDialog(true);

    setFormData(formData);
    setRegisterationStep(3);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-3"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <Text type="headline">{t("title.family")}</Text>
        <FamilyForm user={user} showEventExpectations={true} />
        <Button
          variant="primary"
          busy={formMethods.formState.isSubmitting}
          onClick={() =>
            areFieldsInvalid(formMethods.getValues()) &&
            setOpenMissingInfoDialog(true)
          }
        >
          {t("action.continue")}
        </Button>
      </form>

      {/* Missing information dialog */}
      {openMissingInfoDialog && (
        <MissingInformationDialog
          onClose={() => setOpenMissingInfoDialog(false)}
        />
      )}
    </FormProvider>
  );
};

export default FamilySection;
