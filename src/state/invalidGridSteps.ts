import type { ReactNode, FC } from "react";

// components
import TooShort from "../components/InvalidSteps/TooShort";

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
    title: "Step 2",
    content: "Let's walk through what you can do here.",
  },
];

export default invalidGridSteps;
