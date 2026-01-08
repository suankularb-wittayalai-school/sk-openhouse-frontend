// Imports
import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import PassportScanDialog from "@/components/me/PassportScanDialog";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { pick } from "radash";
import { useState } from "react";

/**
 * A card that shows if a child is linked to a passport or not and allows the
 * user to link his / her child to a passport.
 * @param person The person (child) to show.
 */
const PassportLinkCard: StylableFC<{ person: person }> = ({ person }) => {
  const t = useTranslations("passport");

  const isLinked = !!person.child.passport_id;

  const [scanDialogOpen, setScanDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          `border-primary-border text-primary flex items-center justify-between
          border-t p-2 first:border-t-0`,
        )}
      >
        <div className="flex items-center gap-2">
          <MaterialIcon icon="face_5" />
          <Text type="title">
            {constructName(pick(person, ["prefix", "firstname", "lastname"]))}
          </Text>
        </div>
        <Text type="body" className="text-tertiary! opacity-50!">
          {t("linkCard.notAvailable")}
        </Text>
        {/* <Button
          className={cn(
            "ml-auto h-8! rounded-lg!",
            isLinked ? "border-primary-border border" : null,
          )}
          variant={isLinked ? "transparent" : "primary"}
          onClick={() => {
            setScanDialogOpen(true);
          }}
          disabled={isLinked}
        >
          {isLinked ? t("linkCard.connected") : t("linkCard.connect")}
        </Button> */}
      </div>
      <AnimatePresence>
        {scanDialogOpen && (
          <PassportScanDialog
            person={person}
            onClose={() => {
              setScanDialogOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PassportLinkCard;
