import { StylableFC } from "@/utils/types/common";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import {
  person,
  gender,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { user } from "@/utils/types/user";
import AdultRegistrationForm from "@/components/register/subcomponents/AdultRegistrationForm";
import ChildRegistrationForm from "@/components/register/subcomponents/ChildRegistrationForm";
import { useTranslations } from "next-intl";
import { parallel } from "radash";
import fetchAPI from "@/utils/helpers/fetchAPI";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import { useState } from "react";
import MissingInformationDialog from "@/components/register/MissingInformationDialog";

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
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.you")}</Text>
        <AdultRegistrationForm
          type="registrant"
          person={family.registrant.person}
          user={family.registrant.user}
          count={1}
          handlePersonChange={(person: person) =>
            onFamilyChange({
              ...family,
              registrant: { ...family.registrant, person: person },
            })
          }
          handleUserChange={(user: user) => {
            onFamilyChange({
              ...family,
              registrant: { ...family.registrant, user: user },
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        {(family.adult.length !== 0 || family.child.length !== 0) && (
          <Text type="body">{t("title.otherMembers")}</Text>
        )}
        <div className="flex flex-col gap-1">
          {family.adult.map((member, count) => (
            <AdultRegistrationForm
              type="member"
              person={member}
              count={count + 2}
              handlePersonChange={(person: person) => {
                const newAdult = [...family.adult];
                newAdult[count] = person;
                onFamilyChange({ ...family, adult: newAdult });
              }}
              handleDeletePerson={() => {
                const adult = [...family.adult];
                onFamilyChange({
                  ...family,
                  adult: adult.toSpliced(count, 1),
                });
              }}
            />
          ))}
          {family.child.map((member, count) => (
            <ChildRegistrationForm
              person={member}
              count={count + 1}
              handlePersonChange={(person: person) => {
                const newChild = [...family.child];
                newChild[count] = person;
                onFamilyChange({ ...family, child: newChild });
              }}
              handleDeletePerson={() => {
                const child = [...family.child];
                onFamilyChange({
                  ...family,
                  child: child.toSpliced(count, 1),
                });
              }}
            />
          ))}
        </div>
        <div className="self-strech flex flex-row justify-center gap-1">
          <Button
            variant="primarySurface"
            icon="child_hat"
            className="grow"
            onClick={() =>
              onFamilyChange({
                ...family,
                child: [
                  ...family.child,
                  {
                    firstname: "",
                    lastname: "",
                    gender: gender.male,
                    prefix: prefix.master,
                    birthdate: "",
                    child: {
                      nickname: "",
                      expected_graduation_year: 2569,
                      school: "",
                    },
                  },
                ],
              })
            }
          >
            {t("action.addChild")}
          </Button>
          <Button
            variant="primarySurface"
            icon="face"
            className="grow"
            onClick={() =>
              onFamilyChange({
                ...family,
                adult: [
                  ...family.adult,
                  {
                    firstname: "",
                    lastname: "",
                    gender: gender.male,
                    relationship_to_child: relationshipToChild.father,
                    tel: "",
                    prefix: prefix.master,
                    birthdate: "",
                    child: {
                      nickname: undefined,
                      expected_graduation_year: undefined,
                      school: undefined,
                      passport_id: undefined,
                    },
                  },
                ],
              })
            }
          >
            {t("action.addAdult")}
          </Button>
        </div>
      </div>
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
