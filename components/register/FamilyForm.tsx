import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import AdultRegistrationForm from "@/components/register/subcomponents/AdultRegistrationForm";
import ChildRegistrationForm from "@/components/register/subcomponents/ChildRegistrationForm";
import {
  FamilyCreate,
  FamilyUpdate,
  Gender,
  Prefix,
  RelationshipToChild,
} from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { useTranslations } from "next-intl";
import type { Dispatch, FC, SetStateAction } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type FamilyFormProps = {
  user: User;
  showEventExpectations?: boolean;
  setDeletedPersonIds?: Dispatch<SetStateAction<string[]>>;
};

const FamilyForm: FC<FamilyFormProps> = ({
  user,
  showEventExpectations = false,
  setDeletedPersonIds,
}) => {
  const t = useTranslations("register.family");

  const { control } = useFormContext<FamilyCreate | FamilyUpdate>();
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
        <AdultRegistrationForm
          count={1}
          isRegistrant={true}
          user={user}
          showEventExpectations={showEventExpectations}
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
            <AdultRegistrationForm
              count={idx + 2}
              onDelete={(idx, personId) => {
                removeAdultField(idx);
                setDeletedPersonIds?.((deletedPersonIds) => [
                  ...deletedPersonIds,
                  ...(typeof personId === "string" ? [personId] : []),
                ]);
              }}
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
          <ChildRegistrationForm
            count={idx + 1}
            onDelete={(idx, personId) => {
              removeChildField(idx);
              setDeletedPersonIds?.((deletedPersonIds) => [
                ...deletedPersonIds,
                ...(typeof personId === "string" ? [personId] : []),
              ]);
            }}
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

export default FamilyForm;
