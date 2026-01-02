import { StylableFC } from "@/utils/types/common";
import { person } from "@/utils/types/person";
import Dialog from "@/components/common/Dialog";
import Text from "@/components/common/Text";
import constructName from "@/utils/helpers/constructName";
import { pick } from "radash";
import { useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/common/Button";
import PassportLinkConfirmDialog from "@/components/me/PassportLinkConfirmDialog";

const PassportScanDialog: StylableFC<{
  open: boolean;
  person: person;
  onClose: () => void;
}> = ({ open, person, onClose }) => {
  const t = useTranslations("passport");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [passportID, setPassportID] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setPassportID(result.data);
          setOpenConfirmDialog(true);
        },
        {
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        },
      );

      qrScanner.start();

      return () => {
        qrScanner.stop();
      };
    }
  }, [videoRef]);

  return (
    <Dialog open={open}>
      <div className="flex flex-col">
        <Text type="body">{t("connect")}</Text>
        <Text type="headline" className="!text-xl">
          {constructName(pick(person, ["firstname", "lastname", "prefix"]))}
        </Text>
      </div>
      <div
        className={`grid h-[20rem] w-[20rem] place-items-center self-center
          bg-[url('/ring.svg')]`}
      >
        <div
          className="border-primary-border aspect-65/64 h-64 w-[16.25rem]
            rounded-lg border"
        >
          <video className="h-64 w-[16.25rem]" ref={videoRef} />
        </div>
      </div>
      <Button variant="primary" onClick={() => onClose()}>
        {t("action.close")}
      </Button>
      <PassportLinkConfirmDialog
        person={person}
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        passportID={passportID}
      />
    </Dialog>
  );
};

export default PassportScanDialog;
