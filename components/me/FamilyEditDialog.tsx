import { StylableFC } from "@/utils/types/common";
import Dialog from "@/components/common/Dialog";
import {
  person,
  gender,
  prefix,
  relationshipToChild,
  Family,
} from "@/utils/types/person";
import { user } from "@/utils/types/user";
import Text from "@/components/common/Text";
import AdultRegistrationForm from "@/components/register/subcomponents/AdultRegistrationForm";
import ChildRegistrationForm from "@/components/register/subcomponents/ChildRegistrationForm";
import { useTranslations } from "next-intl";
import Button from "@/components/common/Button";

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
            hideEventExpectations={true}
          />
        </div>
        <div className="flex flex-col gap-1">
          {(family.adult.length !== 0 || family.child.length !== 0) && (
            <Text type="body">{t("title.otherMembers")}</Text>
          )}
          <div className="flex flex-col gap-[0.25rem]">
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
                  onDeleteAdult(count);
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
                  onDeleteChild(count);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="self-strech flex flex-row justify-center gap-1">
        <Button
          variant="primarySurface"
          icon="child_hat"
          className="flex-grow-1"
          onClick={() =>
            onFamilyChange({
              ...family,
              child: [
                ...family.child,
                {
                  id: "",
                  firstname: "",
                  lastname: "",
                  gender: gender.male,
                  relationship_to_child: undefined,
                  tel: "",
                  prefix: prefix.master,
                  is_child: true,
                  birthdate: "",
                  child: {
                    nickname: "",
                    expected_graduation_year: 2569,
                    school: "",
                    passport_id: "",
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
          className="flex-grow-1"
          onClick={() =>
            onFamilyChange({
              ...family,
              adult: [
                ...family.adult,
                {
                  id: "",
                  firstname: "",
                  lastname: "",
                  gender: gender.male,
                  relationship_to_child: relationshipToChild.father,
                  tel: "",
                  prefix: prefix.master,
                  is_child: false,
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
      <div className="self-strech flex flex-row justify-center gap-1">
        <Button
          variant="primarySurface"
          className="flex-grow-1"
          onClick={() => onClose()}
        >
          {t("action.cancel")}
        </Button>
        <Button
          variant="primary"
          className="flex-grow-1"
          onClick={() => onSubmit(family)}
        >
          {t("action.save")}
        </Button>
      </div>
    </Dialog>
  );
};

export default FamilyEditDialog;
