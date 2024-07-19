import type { ReactNode, FC } from "react";
import type { PositionProps } from "../components/Arrow";
import type { Side } from "./Side.model";
import type { EmptyProps } from "./EmptyProps.model";

export type Steps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  content: ReactNode | FC<EmptyProps>;
  component?: React.FC<PositionProps> | null;
  attach?: Side;
}[];
