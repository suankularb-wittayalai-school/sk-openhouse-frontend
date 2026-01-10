import useGoogleIdentityServices from "@/utils/helpers/account/useGoogleIdentityServices";
import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import { useRef } from "react";

export enum GSIStatus {
  initial = "initial",
  chooserShown = "chooserShown",
  processing = "processing",
  redirecting = "redirecting",
}

const GSIButton: StylableFC<{
  onStateChange: (state: GSIStatus) => void;
}> = ({ onStateChange, style, className }) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useGoogleIdentityServices({
    parentButtonID: "button-google-sign-in",
    onStateChange,
  });

  return (
    <div
      ref={buttonRef}
      id="button-google-sign-in"
      style={style}
      className={cn(
        `[&:not(:has(iframe))]:bg-surface-primary h-9.5 w-max rounded-full
        [&:not(:has(iframe))]:animate-pulse`,
        className,
      )}
    />
  );
};

export default GSIButton;
