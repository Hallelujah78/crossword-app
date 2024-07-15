import { toast } from "react-toastify";

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
        text: "Disable Warnings",
        buttonType: "turnoff",
        func: () => {
          toast("Invalid grid warnings are turned off!");
        },
      },

      {
        text: "Next",
        buttonType: "next",
      },
    ],
    title: "Invalid Grid Modal",
    text: "Let's walk through what you can do here.",
  },
  {
    id: "step1",
    buttons: [
      {
        text: "Exit",
        buttonType: "cancel",
      },
      {
        text: "Disable Warnings",
        buttonType: "turnoff",
        func: () => {
          console.log("hi");
          alert("yo!");
        },
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
