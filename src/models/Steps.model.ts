import type { ReactNode, ComponentType } from "react";
import type { PositionProps } from "../components/Arrow";
import type { Side } from "./Side.model";


export type Steps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  content: ReactNode;
  component?: ComponentType<PositionProps> | null;
  attach?: Side;
}[];
