import type { CSSProperties, FC } from "react";

/**
 * A function component stylable through `className` and `style`.
 */
export type StylableFC<Props extends object = object> = FC<
  Props & { className?: string; style?: CSSProperties }
>;

export type BusRoutes = {
  infront: string[];
  opposite: string[];
};

export type MrtLocation = {
  station: string;
  exit: string;
  mapLocation: string;
};

export type ScheduleItem = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
};
