import { StylableFC } from "@/utils/types/common";
import Text from "@/components/common/Text";
import AdultRegistrationForm from "@/components/register/subcomponents/AdultRegistrationForm";
import ChildRegistrationForm from "@/components/register/subcomponents/ChildRegistrationForm";
import Button from "@/components/common/Button";
import {
  Family,
  gender,
  prefix,
  relationshipToChild,
  person,
} from "@/utils/types/person";
import { useTranslations } from "next-intl";

const FamilyForm: StylableFC<{
  family: Family;
  onFamilyChange: (family: Family) => void;
  onDeleteAdult?: (index: number) => void;
  onDeleteChild?: (index: number) => void;
  hideRegistrantEventExpectations?: boolean;
}> = ({
  family,
  onFamilyChange,
  onDeleteAdult,
  onDeleteChild,
  hideRegistrantEventExpectations = false,
  className,
}) => {
  const t = useTranslations("register.family");

  const handleRegistrantChange = (updatedPerson: person) => {
    onFamilyChange({
      ...family,
      registrant: { ...family.registrant, person: updatedPerson },
    });
  };

  const handleRegistrantUserChange = (
    updatedUser: Family["registrant"]["user"],
  ) => {
    onFamilyChange({
      ...family,
      registrant: { ...family.registrant, user: updatedUser },
    });
  };

  const handleAdultChange = (updatedPerson: person, index: number) => {
    const newAdult = [...family.adult];
    newAdult[index] = updatedPerson;
    onFamilyChange({ ...family, adult: newAdult });
  };

  const handleChildChange = (updatedPerson: person, index: number) => {
    const newChild = [...family.child];
    newChild[index] = updatedPerson;
    onFamilyChange({ ...family, child: newChild });
  };

  const handleAdultDelete = (index: number) => {
    if (onDeleteAdult) {
      onDeleteAdult(index);
      return;
    }
    const adult = [...family.adult];
    onFamilyChange({ ...family, adult: adult.toSpliced(index, 1) });
  };

  const handleChildDelete = (index: number) => {
    if (onDeleteChild) {
      onDeleteChild(index);
      return;
    }
    const child = [...family.child];
    onFamilyChange({ ...family, child: child.toSpliced(index, 1) });
  };

  const addAdult = () => {
    const newAdult: person = {
      firstname: "",
      lastname: "",
      gender: gender.male,
      relationship_to_child: relationshipToChild.father,
      tel: "",
      prefix: prefix.mr,
      is_child: false,
      birthdate: "",
      child: {
        nickname: undefined,
        expected_graduation_year: undefined,
        next_grade: "m1",
        school: undefined,
        passport_id: undefined,
      },
    };

    onFamilyChange({ ...family, adult: [...family.adult, newAdult] });
  };

  const addChild = () => {
    const newChild: person = {
      firstname: "",
      lastname: "",
      gender: gender.male,
      prefix: prefix.master,
      birthdate: "",
      child: {
        nickname: "",
        expected_graduation_year: 2569,
        next_grade: "m1",
        school: "",
        passport_id: undefined,
      },
    };

    onFamilyChange({ ...family, child: [...family.child, newChild] });
  };

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.you")}</Text>
        <AdultRegistrationForm
          type="registrant"
          person={family.registrant.person}
          user={family.registrant.user}
          count={1}
          handlePersonChange={handleRegistrantChange}
          handleUserChange={handleRegistrantUserChange}
          hideEventExpectations={hideRegistrantEventExpectations}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.otherAdultMembers")}</Text>
        <div className="flex flex-col gap-1">
          {family.adult.length === 0 && (
            <div
              className="text-primary border-primary-border rounded-lg border
                bg-white px-3 py-16 text-center text-xs"
            >
              {t("title.noOtherAdultMembers")}
            </div>
          )}
          {family.adult.map((member, count) => (
            <AdultRegistrationForm
              key={`adult-${count}`}
              type="member"
              person={member}
              count={count + 2}
              handlePersonChange={(person) => handleAdultChange(person, count)}
              handleDeletePerson={() => handleAdultDelete(count)}
            />
          ))}
        </div>
        <Button
          variant="primarySurface"
          icon="face"
          className="grow"
          onClick={addAdult}
        >
          {t("action.addAdult")}
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.otherChildMembers")}</Text>
        {family.child.length === 0 && (
          <div
            className="text-primary border-primary-border rounded-lg border
              bg-white px-3 py-16 text-center text-xs"
          >
            <p>{t("title.noOtherChildMembers")}</p>
            <p>{t("title.childRegistrationRequired")}</p>
          </div>
        )}
        {family.child.map((member, count) => (
          <ChildRegistrationForm
            key={`child-${count}`}
            person={member}
            count={count + 1}
            handlePersonChange={(person) => handleChildChange(person, count)}
            handleDeletePerson={() => handleChildDelete(count)}
          />
        ))}
        <Button
          variant="primarySurface"
          icon="child_hat"
          className="grow"
          onClick={addChild}
        >
          {t("action.addChild")}
        </Button>
      </div>
    </div>
  );
};

export default FamilyForm;
