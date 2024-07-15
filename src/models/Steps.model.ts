import type { PositionProps } from "../components/Arrow";
import type { Side } from "./Side.model";

export type Steps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  text: string;
  component?: React.FC<PositionProps> | null;
  attach?: Side;
}[];
