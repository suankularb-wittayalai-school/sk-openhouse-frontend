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
}> = ({ family, onFamilyChange }) => {
  const t = useTranslations("register.family");
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
            className="flex-grow-1"
            onClick={() =>
              onFamilyChange({
                ...family,
                child: [
                  ...family.child,
                  {
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
      </div>
      <Button variant="primary">Continue</Button>
    </div>
  );
};

export default FamilySection;
