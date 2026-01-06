import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Chip from "@/components/common/Chip";
import TextField from "@/components/common/TextField";
import Select from "@/components/common/Select";
import DatePicker from "@/components/common/DatePicker";
import {
  gender,
  person,
  prefix,
  relationshipToChild,
} from "@/utils/types/person";
import { useTranslations } from "next-intl";
import { user } from "@/utils/types/user";
import MaterialIcon from "@/components/common/MaterialIcon";
import getDateEighteenYearsAgo from "@/utils/helpers/register/getDateEighteenYearsAgo";

const AdultRegistrationForm: StylableFC<{
  type: "registrant" | "member";
  person: person;
  user?: user;
  count: number;
  handlePersonChange: (person: person) => void;
  handleUserChange?: (user: user) => void;
  handleDeletePerson?: () => void;
  hideEventExpectations?: boolean;
}> = ({
  type,
  person,
  user,
  count,
  handlePersonChange,
  handleUserChange,
  handleDeletePerson,
  hideEventExpectations = false,
}) => {
  const t = useTranslations("person");
  const tx = useTranslations("register.family.label");
  return (
    <Card className="flex-col">
      <div className="grid grid-cols-2">
        <div className="flex flex-row gap-1">
          <Chip variant="surface" apperance="rounded">
            {t("adult") + " " + count}
          </Chip>
          {type == "registrant" && (
            <Chip variant="outline" apperance="rounded">
              {t("registrant")}
            </Chip>
          )}
        </div>
        {!user && handleDeletePerson && (
          <div
            className="grid cursor-pointer place-items-center justify-self-end
              rounded-full"
            onClick={() => {
              handleDeletePerson();
            }}
          >
            <MaterialIcon icon="close" className="text-2xl!" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <Select
          name="prefix"
          value={person.prefix}
          label={tx("prefix")}
          setValue={(prefix) => {
            handlePersonChange({ ...person, prefix: prefix });
          }}
        >
          <option value={prefix.mr}>{t("prefix.mr")}</option>
          <option value={prefix.ms}>{t("prefix.ms")}</option>
          <option value={prefix.mrs}>{t("prefix.mrs")}</option>
        </Select>
        <TextField
          name="firstname"
          label={tx("firstname")}
          value={person.firstname}
          setValue={(firstname) => {
            handlePersonChange({ ...person, firstname: firstname });
          }}
        />
        <TextField
          name="lastname"
          label={tx("lastname")}
          value={person.lastname}
          setValue={(lastname) => {
            handlePersonChange({ ...person, lastname: lastname });
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Select
          name="gender"
          value={person.gender}
          label={tx("gender")}
          setValue={(gender) => {
            handlePersonChange({ ...person, gender: gender });
          }}
        >
          <option value={gender.male}>{t("gender.male")}</option>
          <option value={gender.female}>{t("gender.female")}</option>
          <option value={gender.other}>{t("gender.other")}</option>
        </Select>
        <DatePicker
          name="birthdate"
          label={tx("birthdate")}
          date={person.birthdate}
          setDate={(birthdate) => {
            handlePersonChange({ ...person, birthdate: birthdate });
          }}
          max={getDateEighteenYearsAgo()}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <TextField
          name="tel"
          label={tx("tel")}
          value={person.tel || ""}
          setValue={(tel) => {
            handlePersonChange({ ...person, tel: tel });
          }}
        />
        <Select
          name="relationshipToChild"
          value={person.relationship_to_child}
          label={tx("relationshipToChild")}
          setValue={(relationshipToChild) => {
            handlePersonChange({
              ...person,
              relationship_to_child: relationshipToChild,
            });
          }}
        >
          <option value={relationshipToChild.father}>
            {t("relationshipToChild.father")}
          </option>
          <option value={relationshipToChild.mother}>
            {t("relationshipToChild.mother")}
          </option>
          <option value={relationshipToChild.legal_guardian}>
            {t("relationshipToChild.legal_guardian")}
          </option>
          <option value={relationshipToChild.other}>
            {t("relationshipToChild.other")}
          </option>
        </Select>
      </div>
      {type == "registrant" && user && handleUserChange && (
        <>
          <div className="grid grid-cols-1">
            <TextField
              name="email"
              label={tx("email")}
              value={user.email}
              setValue={() => {}}
              disabled={true}
            />
          </div>
          {!hideEventExpectations && (
            <div className="grid grid-cols-1">
              <TextField
                name="eventExpectations"
                label={tx("eventExpectations")}
                value={user.event_expectations}
                setValue={(expectations) => {
                  handleUserChange({
                    ...user,
                    event_expectations: expectations,
                  });
                }}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AdultRegistrationForm;
