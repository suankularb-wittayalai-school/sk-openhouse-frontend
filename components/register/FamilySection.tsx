import { StylableFC } from "@/utils/types/common";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { person } from "@/utils/types/person";
import { user } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import { parallel } from "radash";
import fetchAPI from "@/utils/helpers/fetchAPI";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import { useState } from "react";
import MissingInformationDialog from "@/components/register/MissingInformationDialog";
import FamilyForm from "@/components/register/FamilyForm";

const FamilySection: StylableFC<{
  family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  };
  onFamilyChange: (family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
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
            isMissingRequiredTextField(
              "registrant",
              family.registrant.person,
              family.registrant.user,
            )
          ) {
            setOpenMissingInfoDialog(true);
            return;
          }
          const adults = [...family.adult];
          const formattedAdults = [];
          const children = [...family.child];
          for (const child of children) {
            if (isMissingRequiredTextField("child", child)) {
              setOpenMissingInfoDialog(true);
              return;
            }
            child.child.expected_graduation_year = Number(
              child.child.expected_graduation_year,
            );
          }
          for (const adult of adults) {
            if (isMissingRequiredTextField("adult", adult)) {
              setOpenMissingInfoDialog(true);
              return;
            }
            const { child, ...formattedAdult } = adult;
            formattedAdults.push(formattedAdult);
          }
          parallel(formattedAdults.length, formattedAdults, (adult) => {
            return fetchAPI("/v1/user/family", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(adult),
            });
          });
          parallel(children.length, children, (child) => {
            return fetchAPI("/v1/user/family", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(child),
            });
          });
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
