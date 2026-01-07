import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import FamilyForm from "@/components/register/FamilyForm";
import { fetchAPI2 } from "@/utils/helpers/fetchAPI";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import type { Family, FamilyUpdate } from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditFamilyDialogProps = {
  user: User;
  family: Family;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setOpenMissingInfoDialog: Dispatch<SetStateAction<boolean>>;
};

const EditFamilyDialog: FC<EditFamilyDialogProps> = ({
  user,
  family,
  setOpenDialog,
  setOpenMissingInfoDialog,
}) => {
  const t = useTranslations("register.family");

  const formMethods = useForm<FamilyUpdate>({
    defaultValues: {
      ...family,
      registrant: {
        ...family.registrant,
        event_expectations: user.event_expectations,
      },
    },
  });
  const [deletedPersonIds, setDeletedPersonIds] = useState<string[]>([]);
  const areFieldsInvalid = (formData: FamilyUpdate): boolean =>
    isMissingRequiredTextField(formData.registrant) ||
    formData.adults.some((adult) => isMissingRequiredTextField(adult)) ||
    formData.children.some((child) => isMissingRequiredTextField(child));
  const onSubmit = async (formData: FamilyUpdate) => {
    if (areFieldsInvalid(formData)) return setOpenMissingInfoDialog(true);

    const updateEventExpectations = async () => {
      if (formData.registrant.event_expectations === user.event_expectations)
        return;

      const body = await fetchAPI2("/v1/user", {
        method: "PUT",
        body: JSON.stringify({
          event_expectations: formData.registrant.event_expectations,
        }),
      });
      if (!body.success)
        throw new Error("Failed to update user's event expectations");
    };

    const createFamilyMembers = async () => {
      const createdPeople = [
        ...formData.adults.filter((person) => typeof person.id === "undefined"),
        ...formData.children.filter(
          (person) => typeof person.id === "undefined",
        ),
      ];
      if (createdPeople.length === 0) return;

      const personIds = await Promise.all(
        createdPeople.map(async (person) => {
          const body = await fetchAPI2<string>("/v1/user/family", {
            method: "POST",
            body: JSON.stringify(person),
          });
          if (!body.success) throw new Error("Failed to create person");

          return body.data;
        }),
      );

      console.log("Created person(s): ", personIds);
    };

    const updateFamilyMembers = async () => {
      const updatedPeople = [
        formData.registrant,
        ...formData.adults.filter((person) => typeof person.id === "string"),
        ...formData.children.filter((person) => typeof person.id === "string"),
      ];

      const personIds = await Promise.all(
        updatedPeople.map(async (person) => {
          const body = await fetchAPI2(`/v1/user/family/${person.id}`, {
            method: "PUT",
            body: JSON.stringify(person),
          });
          if (!body.success) throw new Error("Failed to update person");

          return person.id;
        }),
      );

      console.log("Updated person(s): ", personIds);
    };

    const deleteFamilyMembers = async () => {
      console.log("DELETED: ", deletedPersonIds);
      if (deletedPersonIds.length === 0) return;

      await Promise.all(
        deletedPersonIds.map(async (personId) => {
          const body = await fetchAPI2(`/v1/user/family/${personId}`, {
            method: "DELETE",
          });
          if (!body.success) throw new Error("Failed to update person");
        }),
      );

      console.log("Deleted person(s): ", deletedPersonIds);
    };

    await updateEventExpectations();
    await createFamilyMembers();
    await updateFamilyMembers();
    await deleteFamilyMembers();
    window.location.reload();
  };

  return (
    <Dialog
      className="max-h-[calc(100vh-4rem)] overflow-scroll p-3!"
      onClickOutside={() =>
        !formMethods.formState.isSubmitting && setOpenDialog(false)
      }
    >
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-3"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <Text type="headline" className="mt-3 text-xl!">
            {t("title.edit")}
          </Text>
          <FamilyForm
            user={user}
            showEventExpectations={true}
            setDeletedPersonIds={setDeletedPersonIds}
          />
          <div className="self-strech flex flex-row justify-center gap-1">
            <Button
              variant="primarySurface"
              className="grow"
              disabled={formMethods.formState.isSubmitting}
              onClick={() => setOpenDialog(false)}
            >
              {t("action.cancel")}
            </Button>
            <Button
              variant="primary"
              className="grow"
              busy={formMethods.formState.isSubmitting}
              onClick={() =>
                areFieldsInvalid(formMethods.getValues()) &&
                setOpenMissingInfoDialog(true)
              }
            >
              {t("action.save")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EditFamilyDialog;
