import { StylableFC } from "@/utils/types/common";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { Person } from "@/utils/types/person";
import { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import { useState } from "react";
import MissingInformationDialog from "@/components/register/MissingInformationDialog";
import FamilyForm from "@/components/register/FamilyForm";

const FamilySection: StylableFC<{
  family: {
    registrant: { user: User; person: Person };
    adult: Person[];
    child: Person[];
  };
  onFamilyChange: (family: {
    registrant: { user: User; person: Person };
    adult: Person[];
    child: Person[];
  }) => void;
  onRedirect: () => void;
}> = ({ family, onFamilyChange, onRedirect }) => {
  const t = useTranslations("register.family");
  const [openMissingInfoDialog, setOpenMissingInfoDialog] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Text type="headline">{t("title.family")}</Text>
      <FamilyForm family={family} onFamilyChange={onFamilyChange} />
      <Button
        variant="primary"
        onClick={async () => {
          if (
            isMissingRequiredTextField("registrant", family.registrant.person)
          ) {
            setOpenMissingInfoDialog(true);
            return;
          }
          for (const child of family.child) {
            if (isMissingRequiredTextField("child", child)) {
              setOpenMissingInfoDialog(true);
              return;
            }
          }
          for (const adult of family.adult) {
            if (isMissingRequiredTextField("adult", adult)) {
              setOpenMissingInfoDialog(true);
              return;
            }
          }

          onRedirect();
        }}
      >
        {t("action.continue")}
      </Button>
      {openMissingInfoDialog && (
        <MissingInformationDialog
          onClose={() => setOpenMissingInfoDialog(false)}
        />
      )}
    </div>
  );
};

export default FamilySection;
