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
        - create a new puzzle with the click of a button
        - load a saved puzzle from local storage
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