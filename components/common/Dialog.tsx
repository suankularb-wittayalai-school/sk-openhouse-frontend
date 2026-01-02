import { StylableFC } from "@/utils/types/common";
import { useEffect, useRef } from "react";
import Card from "@/components/common/Card";
import cn from "@/utils/helpers/cn";

const Dialog: StylableFC<{
  open: boolean;
  children: React.ReactNode;
}> = ({ open, children, style, className }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    console.log("activated");
    if (dialogRef.current?.open && !open) {
      dialogRef.current.close();
    } else if (!dialogRef.current?.open && open) {
      dialogRef.current?.show();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef}>
      <div
        className="h-vh w-vh bg-on-surface-variant fixed top-0 right-0 bottom-0
          left-0 flex flex-col items-center justify-center"
      >
        <div id="card">
          <Card
            style={style}
            className={cn("p-6 flex w-92.5 flex-col gap-4 rounded-[1.75rem]!", className)}
          >
            {children}
          </Card>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
