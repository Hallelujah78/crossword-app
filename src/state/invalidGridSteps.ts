export type InvalidSteps = {
  id: string;
  buttons: { text: string; buttonType: string; func?: () => void }[];
  title: string;
  text: string;
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
    title: "Step 1",
    text: "Lorem ipsum",
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
