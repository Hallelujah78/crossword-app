import shortAnswer from "../assets/images/short.png";

export type InvalidSteps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  text: string;
  image?: string;
  alt?: string;
  height?: string;
  width?: string;
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
    text: "Generally, a cross word clue answer must be at least 3 letters long. When answers are too short, we highlight the cells in the problem answer with a red border.",
    image: shortAnswer,
    alt: "short answer",
    width: "9rem",
    height: "9rem",
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
    text: "Let's walk through what you can do here.",
  },
];

export default invalidGridSteps;
