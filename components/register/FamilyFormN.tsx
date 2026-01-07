import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import AdultRegistrationFormN from "@/components/register/subcomponents/AdultRegistrationFormN";
import ChildRegistrationFormN from "@/components/register/subcomponents/ChildRegistrationFormN";
import {
  type FamilyCreate,
  Gender,
  Prefix,
  RelationshipToChild,
} from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type FamilyFormProps = { user: User };

const FamilyFormN: FC<FamilyFormProps> = ({ user }) => {
  const t = useTranslations("register.family");

  const { control } = useFormContext<FamilyCreate>();
  const {
    fields: adultFields,
    append: appendAdultField,
    remove: removeAdultField,
  } = useFieldArray({
    control,
    name: "adults",
  });
  const {
    fields: childFields,
    append: appendChildField,
    remove: removeChildField,
  } = useFieldArray({
    control,
    name: "children",
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Registrant */}
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.you")}</Text>
        <AdultRegistrationFormN
          count={1}
          isRegistrant={true}
          user={user}
          showEventExpectations={true}
        />
      </div>

      {/* Additional adults */}
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.otherAdultMembers")}</Text>
        <div className="flex flex-col gap-1">
          {adultFields.length === 0 && (
            <div
              className="text-primary border-primary-border rounded-lg border
                bg-white px-3 py-16 text-center text-xs"
            >
              {t("title.noOtherAdultMembers")}
            </div>
          )}
          {adultFields.map((field, idx) => (
            <AdultRegistrationFormN
              count={idx + 2}
              onDelete={removeAdultField}
              key={field.id}
            />
          ))}
        </div>
        <Button
          variant="primarySurface"
          icon="face"
          className="grow"
          onClick={() =>
            appendAdultField({
              prefix: Prefix.Mr,
              gender: Gender.Male,
              relationship_to_child: RelationshipToChild.Father,
            })
          }
        >
          {t("action.addAdult")}
        </Button>
      </div>

      {/* Additional children */}
      <div className="flex flex-col gap-1">
        <Text type="body">{t("title.otherChildMembers")}</Text>
        {childFields.length === 0 && (
          <div
            className="text-primary border-primary-border rounded-lg border
              bg-white px-3 py-16 text-center text-xs"
          >
            <p>{t("title.noOtherChildMembers")}</p>
            <p>{t("title.childRegistrationRequired")}</p>
          </div>
        )}
        {childFields.map((field, idx) => (
          <ChildRegistrationFormN
            count={idx + 1}
            onDelete={removeChildField}
            key={field.id}
          />
        ))}
        <Button
          variant="primarySurface"
          icon="child_hat"
          className="grow"
          onClick={() =>
            appendChildField({ prefix: Prefix.Master, gender: Gender.Male })
          }
        >
          {t("action.addChild")}
        </Button>
      </div>
    </div>
  );
};

export default FamilyFormN;
