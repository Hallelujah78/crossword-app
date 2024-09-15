import type { ReactNode, FC } from "react";

// components
import TooShort from "../components/InvalidSteps/TooShort";
import Island from "../components/InvalidSteps/Island";
import Voids from "../components/InvalidSteps/Voids";
import Blocks from "../components/InvalidSteps/Blocks";

export type InvalidSteps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  content: ReactNode | FC;
}[];

const invalidGridSteps: InvalidSteps = [
  {
    id: "step1",
    buttons: [
      {
        text: "Exit",
        buttonType: "cancel",
      },

      {
        text: "Next",
        buttonType: "next",
      },
    ],
    title: "Invalid Grid: Answer Too Short",
    content: TooShort,
  },
  {
    id: "step2",
    buttons: [
      {
        text: "Exit",
        buttonType: "cancel",
      },
      {
        text: "Back",
        buttonType: "back",
      },
      {
        text: "Next",
        buttonType: "next",
      },
    ],
    title: "Invalid Grid: Disconnected Answers",
    content: Island,
  },
  {
    id: "step3",
    buttons: [
      {
        text: "Exit",
        buttonType: "cancel",
      },
      {
        text: "Back",
        buttonType: "back",
      },
      {
        text: "Next",
        buttonType: "next",
      },
    ],
    title: "Invalid Grid: Disconnected Answers",
    content: Voids,
  },
  {
    id: "step4",
    buttons: [
      {
        text: "Exit",
        buttonType: "cancel",
      },
      {
        text: "Back",
        buttonType: "back",
      },
    ],
    title: "Invalid Grid: Answer Blocks",
    content: Blocks,
  },
];

export default invalidGridSteps;
