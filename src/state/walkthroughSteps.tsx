import { Side } from "../models/Side.model";
import type { Steps } from "../models/Steps.model";

// components
import Arrow from "../components/Arrow";
import Paragraph from "../components/Paragraph";

const steps: Steps = [
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
    title: "Welcome to the GridMaster create tool!",
    content: <Paragraph text="Let's walk through what you can do here."/>,
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
    content: <Paragraph
      text="Click on the dark or light squares to toggle them from dark to light, and vice-versa."/>,
    component: Arrow,
    attach: Side.TOP,
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
    content: <Paragraph
      text="Be careful though! There are some rules to determine if a crossword grid is valid or not. We'll let you know if your grid is not valid!"/>
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
    content: <Paragraph
      text="If your grid is valid, you'll be able to click the 'Generate Answers' button to, well, er ... generate answers for your crossword. Hurray!"/>,
    component: Arrow,
    attach: Side.RIGHT,
  },
  {
    id: "step4-5",
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
    title: "Disable Warnings",
    content: <Paragraph
      text="You can turn off warnings about the grid being invalid here."/>,
    component: Arrow,
    attach: Side.LEFT,
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
    content: <Paragraph
      text="If this is unchecked, we'll try to fill in all the blank answers on your grid. If there is nothing that fits, we'll remove the empty cells at the end."/>,

    component: Arrow,
    attach: Side.LEFT,
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
    content: <Paragraph
      text="These buttons become available after you edit the grid and/or generate answers. You can reset the generated answers while retaining any changes you've made to your grid!"/>,
    component: Arrow,
    attach: Side.RIGHT,
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
    content: <Paragraph
      text="Why, they come from clicking the 'AI Generate Clues' button, of course! Your answers are sent to OpenAI and it comes up with the clues for your puzzle. Pretty sweet!"/>,
    component: Arrow,
    attach: Side.RIGHT,
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
    content: <Paragraph
      text="Once you have completed all the previous steps and created your puzzle, you can save it by entering a name and hitting 'Save Crossword.'"/>,
    component: Arrow,
    attach: Side.TOP,
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
    content: <Paragraph
      text="Once your puzzle is saved, you can try to solve it by clicking on 'Solve' and selecting it from the dropdown menu!"/>,
    component: Arrow,
    attach: Side.BOTTOM,
  },
];

export default steps;
