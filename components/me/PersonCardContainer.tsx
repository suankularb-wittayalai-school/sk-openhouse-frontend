import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import RegistrationCard from "@/components/me/RegistrationCard";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import { StylableFC } from "@/utils/types/common";
import { Family, person } from "@/utils/types/person";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { user } from "@/utils/types/user";
import { useState } from "react";
import FamilyEditDialog from "@/components/me/FamilyEditDialog";
import isMissingRequiredTextField from "@/utils/helpers/register/isMissingRequiredTextFields";
import MissingInformationDialog from "@/components/register/MissingInformationDialog";
import fetchAPI from "@/utils/helpers/fetchAPI";
import { parallel } from "radash";

const PersonCardContainer: StylableFC<{
  family: Family;
  onFamilyChange: (family: {
    registrant: { user: user; person: person };
    adult: person[];
    child: person[];
  }) => void;
}> = ({ family, onFamilyChange }) => {
  const t = useTranslations("me");

  const [registrationCardOpen, setRegistrationCardOpen] =
    useState<boolean>(false);
  const [editingFamily, setEditingFamily] = useState(family);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deletingPerson, setDeletingPerson] = useState<string[]>([]);
  const [openMissingInfoDialog, setOpenMissingInfoDialog] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Text type="body">{t("section.aboutFamily")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {[
          family.registrant.person,
          ...(family.adult || []),
          ...(family.child || []),
        ].map((person, i) => (
          <PersonCard person={person} key={i} />
        ))}
      </Card>
      <div className="flex gap-2">
        <Button
          variant="outline"
          icon="edit"
          className="w-10 shrink-0 *:p-0"
          onClick={() => {
            setEditDialogOpen(true);
          }}
        />
        <Button
          variant="primarySurface"
          className="w-full"
          onClick={() => {
            setRegistrationCardOpen(true);
          }}
        >
          {t("action.registrationCard")}
        </Button>
      </div>
      <AnimatePresence>
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
              // TODO: Rewrite this.
              const fetchAndUpdate = async () => {
                // Get family details -> Head / Adult / Child
                const res = await fetchAPI("/v1/user/family", {
                  method: "GET",
                });
                let currentData = [];
                if (res.ok) {
                  currentData = await res.json();
                }

                // Seperate the type of person main `family` super-fat variable.
                const adults = [...family.adult, family.registrant.person];
                const children = [...family.child];
                const formattedAdults = [];

                // ENG: For all adults
                for (let adult of adults) {
                  // Checks for missing fields in adults
                  if (isMissingRequiredTextField("adult", adult)) {
                    setOpenMissingInfoDialog(true);
                    return;
                  }
                  // Creates a adult item, add into `formattedAdult`
                  const { child, created_at, ...formattedAdult } = adult;
                  if (!formattedAdult.tel) {
                    formattedAdult.tel = undefined; // For non-provided phones.
                  }
                  formattedAdults.push(formattedAdult);
                }
                // ENG: For all childs
                for (let child of children) {
                  // Checks for missing fields in childs
                  if (isMissingRequiredTextField("child", child)) {
                    setOpenMissingInfoDialog(true);
                    return;
                  }
                  // Set this child's grad-year
                  child.child.expected_graduation_year = Number(
                    child.child.expected_graduation_year,
                  );
                  // Set child's next_grade from current if not present.
                  if (!child.child.next_grade) {
                    if (child.id && Array.isArray(currentData)) {
                      const found = currentData.find((c) => c.id === child.id);
                      if (found && found.child && found.child.next_grade) {
                        child.child.next_grade = found.child.next_grade;
                      }
                    }
                  }
                }

                // List of all `person` to **create** using API.
                const newPerson = [
                  ...formattedAdults.filter(
                    (adult) =>
                      !adult.id ||
                      typeof adult.id !== "string" ||
                      adult.id.length === 0,
                  ),
                  ...children.filter(
                    (child) =>
                      !child.id ||
                      typeof child.id !== "string" ||
                      child.id.length === 0,
                  ),
                ].map(({ id, ...person }) => person);

                // List of all `person` to **modify** using API.
                const orginPerson = [
                  ...formattedAdults.filter(
                    (adult) =>
                      adult.id &&
                      typeof adult.id === "string" &&
                      adult.id.length !== 0,
                  ),
                  ...children.filter(
                    (child) =>
                      child.id &&
                      typeof child.id === "string" &&
                      child.id.length !== 0,
                  ),
                ];

                // Delete person using ID, per call
                for (let id of deletingPerson) {
                  fetchAPI(`/v1/user/family/${id}`, { method: "DELETE" });
                }

                // Always send the new data, regardless of changes

                // Send create person
                await parallel(newPerson.length, newPerson, (person) => {
                  return fetchAPI("/v1/user/family", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(person),
                  });
                });

                // Send change existing person detail
                await parallel(orginPerson.length, orginPerson, (person) => {
                  const { id, ...formattedPerson } = person;
                  return fetchAPI(`/v1/user/family/${person.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedPerson),
                  });
                });

                // When any family data changes, set it as that.
                onFamilyChange(family);
                // Close dialog, not waiting for fetch to finish but 
                // let it runs in background.
                setEditDialogOpen(false);

                // TODO: [TEMP: KEY NOT LINKING TO EACH PERSON BUT 'i']
                location.reload()
              };
              fetchAndUpdate();
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
        {registrationCardOpen && (
          <RegistrationCard
            persons={[
              ...[family.registrant.person],
              ...family.adult,
              ...family.child,
            ]}
            onClose={() => setRegistrationCardOpen(false)}
          />
        )}
        {openMissingInfoDialog && (
          <MissingInformationDialog
            onClose={() => setOpenMissingInfoDialog(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonCardContainer;
