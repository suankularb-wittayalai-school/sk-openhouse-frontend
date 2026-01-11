import Button from "@/components/common/Button";
import MaterialIcon from "@/components/common/MaterialIcon";
import Text from "@/components/common/Text";
import PassportScanDialog from "@/components/me/PassportScanDialog";
import cn from "@/utils/helpers/cn";
import constructName from "@/utils/helpers/constructName";
import type { ChildPerson } from "@/utils/types/person";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { pick } from "radash";
import { FC, useState } from "react";

/**
 * A card that shows if a child is linked to a passport or not and allows the
 * user to link his / her child to a passport.
 * @param person The person (child) to show.
 */
const PassportLinkCard: FC<{ person: ChildPerson }> = ({ person }) => {
  const t = useTranslations("passport");

  const isLinked = typeof person.child.linked_passport_id !== "string";
  const [scanDialogOpen, setScanDialogOpen] = useState(false);

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
          <Text type="title">{person.firstname}</Text>
        </div>
        <div className="flex gap-1">
          <Button
            className={cn(
              `border-primary-border! ml-auto h-8! rounded-lg! border
              [&>div]:px-2`,
            )}
            variant="outline"
            onClick={() => {
              setScanDialogOpen(true);
            }}
          >
            เปลี่ยนเป็นกระดาษ
          </Button>
          <Link
            href={`/me/passport/${person.child.linked_passport_id}`}
            className="flex items-center"
          >
            <Button
              className={cn(
                `border-primary-border! ml-auto h-8! w-8 rounded-lg! border
                [&>div]:px-0!`,
              )}
              variant="primary"
            >
              <MaterialIcon icon="chevron_right" />
            </Button>
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {scanDialogOpen && (
          <PassportScanDialog
            person={person}
            onClose={() => setScanDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PassportLinkCard;
