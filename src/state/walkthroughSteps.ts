import ArrowLeft, { type ArrowLeftProps } from "../components/ArrowLeft";

export type Steps = {
  id: string;
  buttons: { text: string; buttonType: string }[];
  title: string;
  text: string;
  component: React.FC<ArrowLeftProps> | null;
}[];

const steps: Steps = [
  {
    id: "welcome",
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
    title: "Welcome to the CrossWord creation tool!",
    text: "Let's walk through what you can do here.",
    component: null,
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
    title: "Editing the Grid",
    text: "Click on the dark or light squares to toggle them from dark to light, and vice-versa.",
    component: ArrowLeft,
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
    title: "Editing the Grid",
    text: "Be careful though! There are some rules to determine if a crossword grid is valid or not. We'll let you know if your grid is not valid!",
    component: null,
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
      {
        text: "Next",
        buttonType: "next",
      },
    ],
    title: "Generate Answers",
    text: "If your grid is valid, you'll be able to click the 'Generate Answers' button to, well, er ... generate answers for your crossword. Hurray!",
    component: ArrowLeft,
  },
  {
    id: "step5",
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
    title: "The Force Fill Grid Option",
    text: "If this is unchecked, we'll try to fill in all the blank answers on your grid. If there is nothing that fits, we'll remove the empty cells at the end.",
    component: null,
  },
  {
    id: "step6",
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
    title: "Resetting the Answers and/or Grid",
    text: "These buttons become available after you edit the grid and/or generate answers. You can reset the generated answers while retaining any changes you've made to your grid!",
    component: null,
  },
  {
    id: "step7",
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
    title: "Mommy, where do clues come from?",
    text: "Why, they come from clicking the 'AI Generate Clues' button, of course! Your answers are sent to OpenAI and it comes up with the clues for your puzzle. Pretty sweet!",
    component: null,
  },
  {
    id: "step8",
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
    title: "Saving Your Puzzle",
    text: "Once you have completed all the previous steps and created your puzzle, you can save it by entering a name and hitting 'Save Crossword.'",
    component: null,
  },
  {
    id: "step9",
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
    title: "Solving Your Puzzle",
    text: "Once your puzzle is saved, you can try to solve it by clicking on 'Solve' and selecting it from the dropdown menu!",
    component: null,
  },
];

export default steps;
