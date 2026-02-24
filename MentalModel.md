# Revisting GridMaster - unfamiliar code
- https://chatgpt.com/c/6999b6b5-b9c4-832b-82da-034afd8c177b
## Core Features
- Two pages, Create and Solve
- The Create page/route
    - Create allows a user to edit a crossword grid
    - There is a "disable warnings" check box
        - if enabled, if the user creates an invalid grid while editing the crossword grid, a warning will be displayed. The user can click for more information on types of invalid grid.
        - if disabled, no warnings are displayed BUT the cells in the grid display a red border to indicate the grid is not a valid crossword grid
    - When the grid is valid, the user can generate answers that fit into the grid
    - The answers may be reset while retaining the edited grid
    - The grid AND answers may be reset
    - When the user is happy with the grid and answers, they may ask OpenAI to generate clues for the generated answers
    - When the clues have been fetched from OpenAI, the user may give their puzzle a name and save it (local storage)
- The Solve route
    - Here the user can 
        - create a new puzzle (clues and answers) with the click of a button
        - load a saved puzzle (created earlier) from local storage
    - Once a puzzle has been created or loaded the clues are displayed to the user
    - user can fill in letters on the crossword grid
    - there are buttons to check, reveal and clear individual answers
    - there are buttons to check, reveal and clear the entire grid
    - the user's progress is not saved in some circumstances but it is in others (needs to be fixed)

## What Happens on First Load?
- on first load the user is taken to the Create route
- on first visit, the user is greeted with some modals that walk through how they can use the app
    - the user can exit this walkthrough process at any time
    - the walkthrough process only occurs on first visit - there is no mechanism for the user to view this modal walkthrough at a later time but the app is pretty intuitive
- the user is presented with the default initial empty grid that they can edit or generate answers for
- if there are saved puzzles (for the solve route), they are loaded from local storage and can be selected from the dropdown menu on the solve route

## Routes
- We have the following routes:
- Editor - rendered on `/` and renders `Editor.tsx` which renders `Grid` component from `GridOLD.tsx`
- Root - common to entire app
- Solve - rendered on `/solver` and renders `Solve.tsx` which renders `SolveGrid`

## State
- the answers used to generate the words for our crossword live in `state/answers2.ts` as a number of named arrays that consist of Answer type objects. The name of the array reflects the length of the words it contains. The `five` Answer array consts of words that are 5 letters long. I believe I split the 60,000 words into separate arrays to make finding words of a particular length more efficient. When populating the grid with answers, words are picked randomly using a regular expression based on their length.

The Answer type:
```js
type Answer = { 
    freq: number; 
    raw: string; // may contain hypens
    length?: number; // not populated in answers2.ts
    word?: string // for values that contain hyphens, this is the word without hyphens
};
```

- the initial grid that we load lives at `state/grid.ts`
- it is an array of `CellType` type objects:
```js
export type CellType = {
  isVoid: boolean; // is the cell a void (black)
  id: number;
  clueNumber?: string;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  letter?: string;
  selected: boolean;
  answer?: string;
  isValid?: boolean;
  backgroundColor?: string;
};
```
- the props in each `CellType` as found in `state/grid.ts` are default values
- a CellType in grid.ts only contains 9 props on file
    - when initialized and interacted with by the user, it contains 12 props 

- when the app loads, we actually call `initializeGrid` and this sets values in each cell that makes up the grid:
    - id is set to the index of the cell in the grid
    - letter set to empty string
    - answer set to empty string
- the initialiezd grid state is stored locally in `GridOLD` in `gridState`
- the `isVoid` prop is correctly set in `state/grid.ts` before `initializeGrid` is run
    - isVoid is true if cell is void, false if it is light
- top, bottom, left, right - set by `initializeGrid`
    - false if cell in that direction is void
    - true if cell in that direction is light
- `clueNumber` is set for each cell in `initializeGrid`
    - this is the small number displayed in the top-left of a cell and represents the down and across clues, eg 4 Down, 3 Across, etc.
- we also have a local state (local to GridOLD) for clues called `clueList`
    - after grid is initialized, the clues state is either loaded from local storage or created with `initializeApp`
- initializeApp does the following:
    - create a deep copy of the grid state (array consisting of CellType objects) to avoid mutation
    - calls `createClues` which returns an array containing instances of the `Clue` class
    - sets the `intersection` prop for each instance of Clue
        - intersection is an array of `Intersection` type objects
        - `intersection` represents information about the clues that intersect with the current clue instance
    - returns an array of Clues, sorted in descending order by length
    - the `Intersection` type:
```js
    id: string; // ID of the intersecting clue
    myIndex: number; // positional index in this Clue
    yourIndex: number; // positional index in the intersecting Clue
    letter?: string | undefined; // left undefined on app initialization
```
- the Clue class:
```js
 public clueNumber: number,
    public id: string,
    public length: number, // the length of the clue
    public direction: Direction, // across or down
    public indices: number[], // indices of the cells that compose the clue
    public answer: string[],
    public raw: string[],
    public clue: string,
    public intersection?: {
      id: string;
      myIndex: number;
      yourIndex: number;
      letter?: string;
    }[]
```

- other state includes
    - invalidGridSteps.tsx: contains information to display when the grid is in an invalid state and the user clicks a more info button
    - walkthroughSteps.tsx: contains components and information to show to the user on first load - a custom Shepherd.js or Intro.js that I built.
    - example_ai_response.ts: contains an example response from the OpenAI API that was useful in development

## API calls
- the app uses the OpenAI API to generate clues for answers that the app generates locally.
- on the `Create` route, the user can click `Fetch Clues from OpenAI` to perform the API call
- on the `Solve` route, the `New Puzzle` button will request clues from the API once the answers have been generated locally
- The app has no backend, so we use Netlify Serverless Functions to hide the API key from the client