# Revisting GridMaster - unfamiliar code
- https://chatgpt.com/c/6999b6b5-b9c4-832b-82da-034afd8c177b
- sorting out utils.ts - search for Phase 3 Taming the 1700-line utils.ts in above
## Core Features
### Application Structure

- Two routes/pages: Create and Solve
- Local storage persistence
- OpenAI clue generation integration

### Grid Engine

- Crossword grid editor
- Grid validation system
- Invalid grid detection
- Visual invalid-state indicators
- Answer generation algorithm
- Grid + answer reset functionality

### Puzzle Management
- Puzzle naming
- Puzzle saving to local storage
- Puzzle loading from local storage
- New puzzle generation

### Solving Engine
- Interactive guess entry
- Guess checking logic
- Solution reveal logic
- Grid clearing logic
- Partial progress persistence (buggy)

---

## What Happens on First Load?
- on first load the user is taken to the Create route
- on first visit, the user is greeted with some modals that walk through how they can use the app
    - the user can exit this walkthrough process at any time
    - the walkthrough process only occurs on first visit - there is no mechanism for the user to view this modal walkthrough at a later time but the app is pretty intuitive
- the user is presented with the default initial empty grid that they can edit or generate answers for
- if there are saved puzzles (for the solve route), they are loaded from local storage and can be selected from the dropdown menu on the solve route

## Routes
- We have the following routes:
- Editor - rendered on `/` and renders `Editor.tsx` which renders `Grid.tsx` component
- Root - common to entire app
- Solve - rendered on `/solver` and renders `Solve.tsx` which renders `SolveGrid.tsx`

## State
- the answers used to generate the words for our crossword live in `state/answers2.ts` as a number of named arrays that consist of Answer type objects. The name of the array reflects the length of the words it contains. The `five` Answer array consts of words that are 5 letters long. I believe I split the 60,000 words into separate arrays to make finding words of a particular length more efficient. When populating the grid with solutions, words are picked randomly using a regular expression based on their length.

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
  solution?: string;
  selected: boolean;
  guess?: string;
  isValid?: boolean;
  backgroundColor?: string;
};
```
- the props in each `CellType` as found in `state/grid.ts` are default values
- a CellType in grid.ts only contains 9 props on file
    - when initialized and interacted with by the user, it contains 12 props 

- when the app loads, we actually call `initializeGrid` and this sets values in each cell that makes up the grid:
    - id is set to the index of the cell in the grid
    - `solution` set to empty string
    - `guess` set to empty string
- the initialized grid state is stored locally in `GridOLD` in `gridState`
- the `isVoid` prop is correctly set in `state/grid.ts` before `initializeGrid` is run
    - isVoid is true if cell is void, false if it is light
- top, bottom, left, right - set by `initializeGrid`
    - false if cell in that direction is void
    - true if cell in that direction is light
- `clueNumber` is set for each cell in `initializeGrid`
    - this is the small number displayed in the top-left of a cell and represents the down and across clues, eg 4 Down, 3 Across, etc.
- we also have a local state (local to GridOLD) for clues called `clueList`
    - after grid is initialized, the clues state is either loaded from local storage or created with `createCluesFromGrid`
- createCluesFromGrid does the following:
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
    public solution: string[],
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
- the app uses the OpenAI API to generate clues for solutions that the app generates locally.
- on the `Create` route, the user can click `Fetch Clues from OpenAI` to perform the API call
- on the `Solve` route, the `New Puzzle` button will request clues from the API once the solutions have been generated locally
- The app has no backend, so we use Netlify Serverless Functions to hide the API key from the client
- the API URL:
```js
const apiURL = "/.netlify/functions/getClues";
```
- API requests are made using the `hooks/useClueFetch` hook. The hook holds and exposes the clues returned by the API, as well as error and loading states and it exposes an async `getClues` function that can be called in components that use the hook.
- the request:
```js
 const response = await fetch(apiURL, {
        method: "POST",
        headers: { accept: "application/json" },
        body: JSON.stringify(requestArray),
      });
```
- `requestArray` has the following format:
```js
[{"id":"10DOWN","word":"HAIRDRESSING","clue":""},{"id":"12DOWN","word":"SATISFACTION","clue":""},{"id":"13DOWN","word":"ORGANIZATION","clue":""},{"id":"15DOWN","word":"GRACIOUSNESS","clue":""},{"id":"4ACROSS","word":"GUNRIGHTS","clue":""},{"id":"156ACROSS","word":"NOSTALGIA","clue":""},{"id":"4DOWN","word":"GUNMAKER","clue":""},{"id":"52ACROSS","word":"ARCHAISM","clue":""},{"id":"73DOWN","word":"DEMENTIA","clue":""},{"id":"109ACROSS","word":"SUPERSET","clue":""},{"id":"32ACROSS","word":"CHEMIST","clue":""},{"id":"130ACROSS","word":"ICEPICK","clue":""},{"id":"6DOWN","word":"NOCOST","clue":""},{"id":"78ACROSS","word":"ISOMER","clue":""},{"id":"85ACROSS","word":"OEDEMA","clue":""},{"id":"97DOWN","word":"MUSKEG","clue":""},{"id":"26ACROSS","word":"RERUN","clue":""},{"id":"138ACROSS","word":"TONDO","clue":""},{"id":"8DOWN","word":"IDEA","clue":""},{"id":"61ACROSS","word":"ODDS","clue":""},{"id":"104ACROSS","word":"ARSE","clue":""},{"id":"121DOWN","word":"VITA","clue":""}]
```
- For each clue, we send an object. The `word` is the word we want to generate a clue for. The clue field is blank and we prompt the OpenAI API to send the response back with the clue field filled in for the corresponding word. The ID allows me to relate the response back to our crossword structure.

## Main User Interactions
### Create Flow

- User edits crossword grid.
- User optionally disables warnings.
- User fixes grid until valid.
- User generates solutions.
- User resets solutions (optional).
- User resets entire grid (optional).
- User requests AI-generated clues.
- User names and saves puzzle.

### Solve Flow

- User creates a new puzzle OR loads a saved one.
- User reads clues.
- User fills in guesses.
- User checks individual guesses.
- User reveals solutions.
- User clears solutions.
- User checks/reveals/clears entire grid.
- User progress may persist (inconsistently).

## Entry Points
- `main.tsx` is the entry point for the app

main.tsx
 └── RouterProvider
      └── Root.tsx
            ├── PoweredBy.tsx
            ├── Editor.tsx
            │   └── Grid.tsx
            │       ├── Information.tsx
            │       │     ├──Button.tsx 
            │       │     ├── Blocks.tsx
            │       │     ├── Island.tsx
            │       │     ├── TooShort.tsx
            │       │     ├── Voids.tsx
            │       │     ├── Arrow.tsx
            │       │     └── Paragraph.tsx
            │       │
            │       ├── LoadingSmall.tsx
            │       └── Cell.tsx
            │
            └── Solve.tsx
                └── SolveGrid.tsx
                    ├── ErrorPage.tsx
                    ├── Loading.tsx
                    ├── PoweredBy.tsx
                    └── SolveCell.tsx

## Utils.ts
### Classifying functions
- Grid Navigation
    - getCellAbove
    - getCellBelow
    - findRightEdge
    - findLeftEdge
    - findTopEdge
    - findBottomEdge
    - isLeftEdge
    - isRightEdge
    - isTopEdge
    - isBottomEdge
    - getCellDownRight 
    - getRotationallySymmetricIndex()
- Crossword Construction
    - generator.ts
        - createAnswersRegex
        - getMatches()
        - getAllMatches()
        - getLetter()
        - resetIntersectingClueLetters()
        - getUniqueIntersectingLetters()
        - generateIntersectionLetterCombinations()
        - applyCandidateAnswerToClue() **MUTATES**
        - propagateIntersectionLetters() **MUTATES**
        - resetClueLetters()
        - writeClueToGrid() **MUTATES**
        - resolveIncompleteClues()
- Crossword Rules
    - setClueNumbers
    - invalidateEdgesThatAreAllVoid()
    - areAllCellsValid()
    - resetGridValidationState()
    - markShortClueCellsInvalid()
    - invalidateIslandCells()
- Crossword Structure
    - updateSurroundingCells
    - createCluesFromGrid
    
- Clues
    - removeClue()
    - createClues
    - getClueIndices
    - populateClues - solution generation, affects grid and clues
    - sortCluesDescendingLength
    - getAcrossClues
    - getDownClues
        - relationships.ts
            - setCluesThatIntersect
            - getIntersectingClues
            - getIncompleteAnswers
    - setClueAnswers - needs work/research, very long function
    - formatAnswerLengths()

- Data 
    - Answers
        - normalize.ts
            - removeChars
            - separateByLength
        - lookup.ts
            - getWordList()
- User Interface
    - clearCellSelection()
    - selectCellsForClue()
    - getCluesContainingCell()
    - annotateDisconnectedGroupsWithColors()
- Unused
    - updateClueNumbersFromGrid() **UNUSED**
- Persistence
    - setStateToLocalStorage()
    - loadStateFromLocalStorage()
- Experimental (unused)
    - getCellsInRowOrColumn()
    - getCellUpRight()
    - getCellDownLeft()
    - getCellUpLeft()
    - getAllEdgeCellIndices()
    - isSubset()
    - getAdjacentLightIndices()
    - getAdjacentVoidIndices()
- utils/array
    - mergeOverlappingArrays()
- Input Validation
    - isLetter()

## Design Issues
- function names are too generic
    - makes it difficult to understand what the function does
- parameter, variable and property names are confusing
    - this is because of the data structures I used when creating the app
    - there is a confusion between Answers and Clues in particular
        - I should have designed it using something like:
            - Entry - a collection of cells 
            - Cell - a single cell in the grid
            - Answer - the answer that relates to an entry and Clue
            - Clue - the hint text for a particular entry
            - Grid - a collection of cells tha make up the crossword
            - Crossword - stores all of the above and provides methods
        - this confusion makes determining what some functions actually do difficult
        - it makes it difficult to think/reason about the code, even creating a comment to clearly state what the code does can be difficult
- I am storing values that can be derived
    - this makes updating Cells, Clues, Answers, the Grid unnecessarily complicated
- I didn't sufficiently plan the app in terms of diagrams
    - I reasoned about how it might work by writing my thoughts down
    - these thoughts were "spread out" and so it was hard to see the greater picture
- state such as our basic starting grid is missing properties and we have to initialize these with code when our app starts
    - this is due to the "design as you go" approach that I took
    - partially due to having a word list in a particular format
- more extensive use of classes would have
    - helped identify flaws in the design early
    - avoided the creation of a 1700 line utils.ts file that later had to be split out
    - made it easier to think about what methods I needed
    - simplified the design process
    - simplified thinking about what the code does or should do
- I am using arrays where key/value pairs would often be significantly easier to use
    - this is a gut feeling
- some functions are not pure, they mutate params
    - harder to test
    - hidden mutation
- duplicate functions where an extra param in one function with an extra param would have sufficied, example:
    - getItems(currentItem) - exclude current item
    - getAllItems(currentItem) - include currentItem
    - versus: getItems(currentItem, includeCurrent: Boolean) - or someting similar
- Sacrificed readability and separation of concerns for unnecessary optimization
    - cf `resetPuzzleAnswers`
        - resets the generated solutions
        - resets the user guesses including what cell is selected
        - convenient to lump together since it avoids looping over the same data multiple times - optimization is pointless with small dataset
        - better to split into
            - restGeneratedAnswers
            - resetUserInput or even resetUserAnswers and resetCellSelection
- don't use global variables to store easily derived state - eg storing grid side length
    - makes functions difficult to reason about/test/can lead to bugs

## Interesting Points from AI Chats
- my idea to fill longer solutions first is good - filling the most constrained solution
- my intuition to skip backtracking and simply regenerate from the start is justifiable
    - pro crossword fillers
        - fill most constrained first
        - limit backtracking depth
        - restart if stuck
- my intuition that a larger word list makes automatic solution generation easier is correct