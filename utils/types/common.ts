// Imports
import { CSSProperties, FC } from "react";

/**
 * The language code of a supported UI language.
 */
export type LangCode = "en-US" | "th";

/**
 * A function component stylable through `className` and `style`.
 */
export type StylableFC<Props extends {} = {}> = FC<
  Props & { className?: string; style?: CSSProperties }
>;
