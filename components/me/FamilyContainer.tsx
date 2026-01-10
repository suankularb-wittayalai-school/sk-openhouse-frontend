import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Text from "@/components/common/Text";
import EditFamilyDialog from "@/components/me/EditFamilyDialog";
import RegisterationTicketDialog from "@/components/me/RegisterationTicketDialog";
import PersonCard from "@/components/me/subcomponents/PersonCard";
import MissingInformationDialog from "@/components/register/MissingInformationDialog";
import { useUser } from "@/contexts/UserContext";
import type { Family, Person } from "@/utils/types/person";
import type { User } from "@/utils/types/user";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { type FC, useMemo, useState } from "react";

type FamilyContainerProps = {
  user: User;
  family: Family;
};

const INELIGIBLE_FOR_HALL_TIME = "2026-01-10T23:59:59+07:00"

const FamilyContainer: FC<FamilyContainerProps> = ({ user, family }) => {
  const t = useTranslations("me");

  const familyMembers = useMemo<Person[]>(
    () => [family.registrant, ...family.adults, ...family.children],
    [family],
  );
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [openEditFamilyDialog, setOpenEditFamilyDialog] = useState(false);
  const [openMissingInfoDialog, setOpenMissingInfoDialog] = useState(false);

  const ineligibleForHallEvent =
    new Date(user.onboarded_at ?? "") > new Date(INELIGIBLE_FOR_HALL_TIME);

  return (
    <div className="flex flex-col gap-2">
      {/* List of family members */}
      <Text type="body">{t("section.aboutFamily")}</Text>
      <Card className="flex flex-col gap-0! p-0!">
        {familyMembers.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </Card>

      {/* Controls */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          icon="edit"
          className="w-10 shrink-0 *:p-0"
          onClick={() => setOpenEditFamilyDialog(true)}
        />
        <Button
          variant="primarySurface"
          className="w-full"
          onClick={() => setOpenTicketDialog(true)}
          disabled={ineligibleForHallEvent}
        >
          {!ineligibleForHallEvent
            ? t("action.registrationCard")
            : "คุณไม่มีสิทธิ์ในการรับตั๋วเข้าหอประชุม"}
        </Button>
      </div>

      {/* Family editor */}
      <AnimatePresence>
        {openEditFamilyDialog && (
          <EditFamilyDialog
            user={user}
            family={family}
            setOpenDialog={setOpenEditFamilyDialog}
            setOpenMissingInfoDialog={setOpenMissingInfoDialog}
          />
        )}

        {/* Registeration ticket dialog */}
        {openTicketDialog && (
          <RegisterationTicketDialog
            people={familyMembers}
            onClose={() => setOpenTicketDialog(false)}
          />
        )}

        {/* Missing information dialog */}
        {openMissingInfoDialog && (
          <MissingInformationDialog
            onClose={() => setOpenMissingInfoDialog(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FamilyContainer;
