import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import PassportLinkConfirmDialog from "@/components/me/PassportLinkConfirmDialog";
import PassportLinkInvalidDialog from "@/components/me/PassportLinkInvalidDialog";
import constructName from "@/utils/helpers/constructName";
import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import QrScanner from "qr-scanner";
import { pick } from "radash";
import { useEffect, useRef, useState } from "react";

const PassportScanDialog: StylableFC<{
  person: person;
  onClose: () => void;
}> = ({ person, onClose }) => {
  const t = useTranslations("passport");

  const videoRef = useRef(null);
  const openedDialogRef = useRef(false);

  const [passportID, setPassportID] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openInvalidDialog, setOpenInvalidDialog] = useState<boolean>(false);

  const passportRegex =
    /^https:\/\/o\.mysk\.school\/p\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  useEffect(() => {
    openedDialogRef.current = openConfirmDialog || openInvalidDialog;
  }, [openConfirmDialog, openInvalidDialog]);

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (!openedDialogRef.current) {
            if (passportRegex.test(result.data) === true) {
              setPassportID(result.data);
              setOpenConfirmDialog(true);
            } else {
              setOpenInvalidDialog(true);
            }
          }
        },
        {
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        },
      );
      
      // This is a bit finicky on dev, on build it's "fine".
      qrScanner.start();
      return () => {
        qrScanner.stop();
      };
    }
  }, [videoRef]);

  return (
    <Dialog onClickOutside={onClose}>
      <div className="flex flex-col">
        <Text type="body">{t("scanner.title")}</Text>
        <Text type="headline" className="text-xl!">
          {constructName(pick(person, ["firstname", "lastname", "prefix"]))}
        </Text>
      </div>
      <div
        className={`grid aspect-square w-full place-items-center self-center
          bg-[url('/ring.svg')] bg-cover`}
      >
        <div
          className="border-primary-border bg-primary-surface relative
            aspect-square max-w-64 overflow-hidden rounded-2xl border"
        >
          <div
            className="absolute top-1/2 left-1/2 flex w-full -translate-1/2
              flex-col gap-1 p-4 text-center"
          >
            <Text type="body">{t("scanner.permissionRequest")}</Text>
          </div>
          <video
            className="aspect-square w-full max-w-64! object-cover"
            ref={videoRef}
          />
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          onClose();
        }}
      >
        {t("action.close")}
      </Button>

      <AnimatePresence>
        {openConfirmDialog && (
          <PassportLinkConfirmDialog
            person={person}
            onClose={() => setOpenConfirmDialog(false)}
            onScannerDialogClose={onClose}
            passportID={passportID}
          />
        )}
        {openInvalidDialog && (
          <PassportLinkInvalidDialog
            onClose={() => setOpenInvalidDialog(false)}
          />
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PassportScanDialog;
