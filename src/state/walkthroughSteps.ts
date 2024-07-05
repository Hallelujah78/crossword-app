export const steps = [
  {
    id: "welcome",
    buttons: [
      {
        text: "Exit",
        type: "cancel",
      },
      {
        text: "Back",
        type: "back",
      },
      {
        text: "Next",
        type: "next",
      },
    ],
    title: "Welcome to the CrossWord creation tool!",
    text: ["Let's walk through what you can do here."],
  }, // a single step
];

/* what you might need in steps
for each step:
id: 'intro'
buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
  title: 'Welcome to React-Shepherd!',
    text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],

*/
