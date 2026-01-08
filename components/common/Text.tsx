import { StylableFC } from "@/utils/types/common";
import cn from "@/utils/helpers/cn";
import { JSX } from "react";

const Text: StylableFC<{
  type: "headline" | "title" | "body";
  element?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}> = ({ type, element: Element = "span", children, style, className }) => {
  const TYPE_STYLE = {
    headline: "text-primary text-xl font-bold leading-[120%]",
    title: "text-primary text-sm font-normal leading-[140%]",
    body: "text-tertiary text-xs font-normal leading-[140%] opacity-50",
  };
  return (
    <Element style={style} className={cn(TYPE_STYLE[type], className)}>
      {children}
    </Element>
  );
};

export default Text;
