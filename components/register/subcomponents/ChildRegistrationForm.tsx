import Card from "@/components/common/Card";
import Chip from "@/components/common/Chip";
import DatePicker from "@/components/common/DatePicker";
import MaterialIcon from "@/components/common/MaterialIcon";
import Select from "@/components/common/Select";
import TextField from "@/components/common/TextField";
import getDateEighteenYearsAgo from "@/utils/helpers/register/getDateEighteenYearsAgo";
import {
  type FamilyCreate,
  FamilyUpdate,
  Gender,
  Prefix,
  SchoolGrade,
} from "@/utils/types/person";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { type FieldPath, useFormContext } from "react-hook-form";

const GRADUATION_YEARS = Array.from({ length: 12 }, (_, i) => 2569 + i);

type ChildRegisterationFormProps = {
  count: number;
  onDelete: (idx: number, personId?: string) => void;
};

const ChildRegistrationForm: FC<ChildRegisterationFormProps> = ({
  count,
  onDelete,
}) => {
  const t = useTranslations("person");
  const tx = useTranslations("register.family.label");

  const { register, getValues } = useFormContext<FamilyCreate | FamilyUpdate>();
  const fp = (
    s: FieldPath<(FamilyCreate | FamilyUpdate)["children"]["0"]>,
  ): FieldPath<FamilyCreate | FamilyUpdate> =>
    (`children.${count - 1}.` + s) as FieldPath<FamilyCreate | FamilyUpdate>;

  return (
    <Card className="flex-col">
      {/* Indicator chips */}
      <div className="grid grid-cols-2 gap-1">
        <Chip variant="surface" apperance="rounded" className="h-max">
          {t("child") + " " + count}
        </Chip>
        <div
          className="grid cursor-pointer place-items-center justify-self-end
            rounded-full"
          onClick={() => onDelete(count - 1, getValues(fp("id")) as string)}
        >
          <MaterialIcon icon="close" className="text-2xl!" />
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-3 gap-1.5">
        <Select
          label={tx("prefix")}
          {...register(fp("prefix"), { required: true })}
        >
          <option value={Prefix.Master}>{t("prefix.master")}</option>
          <option value={Prefix.Miss}>{t("prefix.miss")}</option>
        </Select>
        <TextField
          label={tx("firstname")}
          {...register(fp("firstname"), {
            required: true,
            setValueAs: (v: string) => (v.trim() === "" ? undefined : v.trim()),
          })}
        />
        <TextField
          label={tx("lastname")}
          {...register(fp("lastname"), {
            required: true,
            setValueAs: (v: string) => (v.trim() === "" ? undefined : v.trim()),
          })}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Select
          label={tx("gender")}
          {...register(fp("gender"), { required: true })}
        >
          <option value={Gender.Male}>{t("gender.male")}</option>
          <option value={Gender.Female}>{t("gender.female")}</option>
          <option value={Gender.Other}>{t("gender.other")}</option>
        </Select>
        <DatePicker
          label={tx("birthdate")}
          {...register(fp("birthdate"), {
            required: true,
            min: getDateEighteenYearsAgo(),
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
        />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <TextField
          className="col-span-2!"
          label={tx("nickname")}
          {...register(fp("child.nickname"), {
            setValueAs: (v: string) => (v.trim() === "" ? undefined : v.trim()),
          })}
        />
        <Select
          label="ศึกษาต่อชั้น..."
          {...register(fp("child.next_grade"), {
            required: true,
          })}
        >
          <option value={SchoolGrade.M1}>ม.1</option>
          <option value={SchoolGrade.M4}>ม.4</option>
        </Select>
        <Select
          label="...ในปีการศึกษา"
          {...register(fp("child.expected_graduation_year"), {
            required: true,
            valueAsNumber: true,
          })}
        >
          {GRADUATION_YEARS.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1">
        <TextField
          label={tx("school")}
          {...register(fp("child.school"), {
            required: true,
            setValueAs: (v: string) => (v.trim() === "" ? undefined : v.trim()),
          })}
        />
      </div>
    </Card>
  );
};

export default ChildRegistrationForm;
