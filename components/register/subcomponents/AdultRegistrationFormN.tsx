import Card from "@/components/common/Card";
import Chip from "@/components/common/Chip";
import DatePicker from "@/components/common/DatePicker";
import MaterialIcon from "@/components/common/MaterialIcon";
import Select from "@/components/common/Select";
import TextField from "@/components/common/TextField";
import getDateEighteenYearsAgo from "@/utils/helpers/register/getDateEighteenYearsAgo";
import {
  type FamilyCreate,
  Gender,
  Prefix,
  RelationshipToChild,
} from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { type FieldPath, useFormContext } from "react-hook-form";

type AdultRegistrationFormProps =
  | AdditionalAdultRegisterationFormProps
  | RegistrantFormProps;

type AdditionalAdultRegisterationFormProps = {
  count: number;
  isRegistrant?: false;
  user?: undefined;
  showEventExpectations?: false;
  onDelete: (idx: number) => void;
};

type RegistrantFormProps = {
  count: 1;
  isRegistrant: true;
  user: User;
  showEventExpectations?: boolean;
  onDelete?: undefined;
};

const AdultRegistrationFormN: FC<AdultRegistrationFormProps> = ({
  count,
  isRegistrant,
  user,
  showEventExpectations,
  onDelete,
}) => {
  const t = useTranslations("person");
  const tx = useTranslations("register.family.label");

  const { register } = useFormContext<FamilyCreate>();
  const fp = (
    s: FieldPath<FamilyCreate["registrant"]>,
  ): FieldPath<FamilyCreate> =>
    ((isRegistrant ? "registrant." : `adults.${count - 2}.`) +
      s) as FieldPath<FamilyCreate>;

  return (
    <Card className="flex-col">
      {/* Indicator chips */}
      <div className="grid grid-cols-2">
        <div className="flex flex-row gap-1">
          <Chip variant="surface" apperance="rounded">
            {t("adult") + " " + count}
          </Chip>
          {isRegistrant && (
            <Chip variant="outline" apperance="rounded">
              {t("registrant")}
            </Chip>
          )}
        </div>
        {!isRegistrant && (
          <div
            className="grid cursor-pointer place-items-center justify-self-end
              rounded-full"
            onClick={() => onDelete(count - 2)}
          >
            <MaterialIcon icon="close" className="text-2xl!" />
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-3 gap-1.5">
        <Select
          label={tx("prefix")}
          {...register(fp("prefix"), { required: true })}
        >
          <option value={Prefix.Mr}>{t("prefix.mr")}</option>
          <option value={Prefix.Ms}>{t("prefix.ms")}</option>
          <option value={Prefix.Mrs}>{t("prefix.mrs")}</option>
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
            max: getDateEighteenYearsAgo(),
            setValueAs: (v: string) => (v === "" ? undefined : v),
          })}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <TextField
          label={tx("tel")}
          {...register(fp("tel"), {
            setValueAs: (v: string) => (v.trim() === "" ? undefined : v.trim()),
          })}
        />
        <Select
          label={tx("relationshipToChild")}
          {...register(fp("relationship_to_child"), { required: true })}
        >
          <option value={RelationshipToChild.Father}>
            {t("relationshipToChild.father")}
          </option>
          <option value={RelationshipToChild.Mother}>
            {t("relationshipToChild.mother")}
          </option>
          <option value={RelationshipToChild.LegalGuardian}>
            {t("relationshipToChild.legal_guardian")}
          </option>
          <option value={RelationshipToChild.Other}>
            {t("relationshipToChild.other")}
          </option>
        </Select>
      </div>

      {/* Registrant-exclusive fields */}
      {isRegistrant && (
        <>
          <div className="grid grid-cols-1">
            <TextField
              name="email"
              label={tx("email")}
              value={user.email}
              disabled={true}
            />
          </div>
          {showEventExpectations && (
            <div className="grid grid-cols-1">
              <TextField
                label={tx("eventExpectations")}
                value={user.event_expectations}
                {...register(fp("event_expectations"), {
                  setValueAs: (v: string) =>
                    v.trim() === "" ? undefined : v.trim(),
                })}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AdultRegistrationFormN;
