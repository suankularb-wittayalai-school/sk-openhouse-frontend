import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";
import { user } from "@/utils/types/user";
import { useState } from "react";
import FamilyEditDialog from "@/components/me/FamilyEditDialog";

const PersonCardContainer: StylableFC<{
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
  const t = useTranslations("me");
  const [editingFamily, setEditingFamily] = useState(family);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deletingPerson, setDeletingPerson] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.aboutFamily")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        <PersonCard person={family.registrant.person} key={"registrant"} />
        {family.adult.map((adult, i) => (
          <PersonCard person={adult} key={"adult" + i} />
        ))}
        {family.child.map((child, i) => (
          <PersonCard person={child} key={"child" + i} />
        ))}
      </Card>
      <div className="flex gap-2">
        <Button
          variant="outline"
          icon="edit"
          className="w-10 shrink-0 *:p-0"
          onClick={() => setEditDialogOpen(true)}
        />
        <Button variant="primarySurface" className="w-full">
          {t("action.registrationCard")}
        </Button>
      </div>
      {editDialogOpen && (
        <FamilyEditDialog
          family={editingFamily}
          onFamilyChange={setEditingFamily}
          onClose={() => {
            setEditingFamily(family);
            setEditDialogOpen(false);
          }}
          onSubmit={(family: {
            registrant: { user: user; person: person };
            adult: person[];
            child: person[];
          }) => {
            // Fetch API here
            console.log(family, "final fetched family");
            onFamilyChange(family);
            setEditDialogOpen(false);
          }}
          onDeleteAdult={(index: number) => {
            if (editingFamily.adult[index].id) {
              setDeletingPerson([
                ...deletingPerson,
                editingFamily.adult[index].id,
              ]);
            }
            setEditingFamily({
              ...editingFamily,
              adult: editingFamily.adult.toSpliced(index, 1),
            });
          }}
          onDeleteChild={(index: number) => {
            if (editingFamily.child[index].id) {
              setDeletingPerson([
                ...deletingPerson,
                editingFamily.child[index].id,
              ]);
            }
            setEditingFamily({
              ...editingFamily,
              child: editingFamily.child.toSpliced(index, 1),
            });
          }}
        />
      )}
    </div>
  );
};

export default PersonCardContainer;
