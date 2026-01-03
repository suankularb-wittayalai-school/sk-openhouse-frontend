import { StylableFC } from "@/utils/types/common";
import Card from "@/components/common/Card";
import Chip from "@/components/common/Chip";
import TextField from "@/components/common/TextField";
import Select from "@/components/common/Select";
import DatePicker from "@/components/common/DatePicker";
import { gender, person, prefix } from "@/utils/types/person";
import { useTranslations } from "next-intl";
import MaterialIcon from "@/components/common/MaterialIcon";

const ChildRegistrationForm: StylableFC<{
  person: person;
  count: number;
  handlePersonChange: (person: person) => void;
  handleDeletePerson: () => void;
}> = ({ person, count, handlePersonChange, handleDeletePerson }) => {
  const t = useTranslations("person");
  const tx = useTranslations("register.family.label");
  const GRADUATION_YEAR = [
    2569, 2570, 5271, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580,
  ];
  return (
    <Card className="flex-col">
      <div className="grid grid-cols-2 gap-1">
        <Chip variant="surface" apperance="rounded" className="h-max">
          {t("child") + " " + count}
        </Chip>
        <div
          className="grid cursor-pointer place-items-center justify-self-end
            rounded-full"
          onClick={() => {
            handleDeletePerson();
          }}
        >
          <MaterialIcon icon="close" className="text-2xl!" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[0.38rem]">
        <Select
          name="prefix"
          value={person.prefix}
          label={tx("prefix")}
          setValue={(prefix) => {
            handlePersonChange({ ...person, prefix: prefix });
          }}
        >
          <option value={prefix.master}>{t("prefix.master")}</option>
          <option value={prefix.miss}>{t("prefix.miss")}</option>
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
      <div className="grid grid-cols-2 gap-2">
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
        />
      </div>
      <div className="grid grid-cols-1">
        <TextField
          name="tel"
          label={tx("tel")}
          value={person.tel}
          setValue={(tel) => {
            handlePersonChange({ ...person, tel: tel });
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-[0.38rem]">
        <TextField
          name="nickname"
          label={tx("nickname")}
          value={person.child.nickname || ""}
          setValue={(nickname) => {
            handlePersonChange({
              ...person,
              child: { ...person.child, nickname: nickname },
            });
          }}
        />
        <Select
          name="expectedGraduationYear"
          value={person.child.expected_graduation_year || GRADUATION_YEAR[0]}
          label={tx("expectedGraduationYear")}
          setValue={(year) => {
            handlePersonChange({
              ...person,
              child: { ...person.child, expected_graduation_year: year },
            });
          }}
        >
          {GRADUATION_YEAR.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1">
        <TextField
          name="school"
          label={tx("school")}
          value={person.child.school || ""}
          setValue={(school) => {
            handlePersonChange({
              ...person,
              child: { ...person.child, school: school },
            });
          }}
        />
      </div>
    </Card>
  );
};

export default ChildRegistrationForm;
