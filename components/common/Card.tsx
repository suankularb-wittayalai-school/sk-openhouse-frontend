import cn from "@/utils/helpers/cn";
import { StylableFC } from "@/utils/types/common";
import React from "react";

const Card: StylableFC<{ children: React.ReactNode }> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      style={style}
      className={cn(
        "bg-on-background border-primary-border flex gap-2 rounded-lg",
        "border p-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
