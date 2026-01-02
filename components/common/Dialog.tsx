import { StylableFC } from "@/utils/types/common";
import { useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import { useTranslations } from "next-intl";

const Dialog: StylableFC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    console.log("activated");
    if (dialogRef.current?.open && !open) {
      dialogRef.current.close();
    } else if (!dialogRef.current?.open && open) {
      dialogRef.current?.showModal();
    }
  }, [open]);
  const t = useTranslations("common");

  useEffect(() => {
    const bigDialog = document.getElementById("bigDialog");
    bigDialog?.addEventListener("click", () => onClose());
    const card = document.getElementById("card");
    card?.addEventListener("click", (event) => event.stopPropagation());
    const closeButton = document.getElementById("closeButton");
    closeButton?.addEventListener("click", () => onClose());
  });

  return (
    <dialog ref={dialogRef} id="bigDialog">
      <div
        className="h-vh w-vh fixed top-0 right-0 bottom-0 left-0 flex flex-col
          items-center justify-center"
      >
        <div id="card">
          <Card className="P-6 flex w-[23.125rem] flex-col gap-4">
            {children}
            <div id="closeButton" className="flex flex-col">
              <Button variant="primary" onClick={() => onClose()}>
                {t("action.close")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
