## Notes you make during development go here

## Assumptions

- the grid is a square - 13x13, 15x15, 17x17, etc
  - grids with an even number of rows and columns are not uncommon but this saves me potentially having to add a bunch of logic

## Terminology

- cell: a square on a crossword grid
- void: a dark square
- lights: a series of light squares
- darks: a series of light squares

## Why This Project?

- I was in the middle of creating a Wordle clone, and so a crossword seems like an obvious next project
- It occurred to me that I can use AI to generate the clues
  - ChatGPT can generate decent clues

## Expectations

- I don't necessarily expect to be able to create a perfect crossword puzzle programmatically
- I expect the difficulty will be all over the place since I will be selecting the words randomly
- this may be beyond my capability but will be fun to find out

## Starting Point

- I've deliberately not searched for 'generate a crossword puzzle using code' or anything like that
  - part of this is so I get to, hopefully, solve the problem myself
  - part of it is that creating a crossword puzzle seems like something an AI could be trained to do very well,
- I did ask ChatGPT if it could generate a crossword puzzle for me and it could not
- I asked ChatGPT if it could generate clues and words for a crossword puzzle that might fit in a 13x13 grid and it kind of gave me something but it really wasn't usable
- I asked ChatGPT to generate clues for two words I provided and when I requested a slightly crytpic clue the response it gave was decent

## What are the steps to create a crossword puzzle

- as per ChatGPT:
  Creating a crossword puzzle can be a fun and rewarding process. Here are the basic steps to create one:

1. **Choose a Grid Size**: Decide on the size of your crossword grid. Common sizes include 15x15, 17x17, or 21x21 squares.

2. **Create the Grid**: Use a crossword grid template to draw your grid. Make sure to include black squares to separate words and create the structure of the puzzle. Traditional crosswords have rotational symmetry, so if you black out one square, you should black out the symmetrically corresponding square as well.

3. **Select Theme (Optional)**: Decide if you want your puzzle to have a theme. Themes can be based on words related to a specific topic, holiday, or concept. This can help guide your word selection and make the puzzle more interesting.

4. **Choose Words**: Start by selecting words to fill in the grid. These words should intersect with each other to form a cohesive puzzle. Use a mix of common words and more challenging vocabulary to keep the puzzle engaging.

5. **Write Clues**: Once you've filled in the grid with words, write clues for each word. Clues should be concise but provide enough information for the solver to figure out the answer. Remember to match the difficulty of the clue with the difficulty of the word.

6. **Test Solve**: Test solve the puzzle yourself to make sure all the words and clues are accurate and solvable. You may need to make adjustments to the grid or clues based on your testing.

7. **Refine and Edit**: After test solving, review your puzzle for any errors or inconsistencies. Make any necessary edits to improve the overall quality of the puzzle.

8. **Finalize**: Once you're satisfied with the puzzle, finalize it by creating a clean, legible version of the grid and clues. You may also want to include a title for the puzzle and any additional instructions or notes for the solver.

9. **Publish or Share**: You can publish your crossword puzzle in a newspaper, magazine, or online platform, or share it with friends and family for them to enjoy.

10. **Receive Feedback**: If you're sharing your puzzle publicly, be open to feedback from solvers. This can help you improve your puzzle-making skills for future creations.

Remember, creating a crossword puzzle takes time and practice, so don't be discouraged if your first attempts aren't perfect. Keep experimenting and refining your skills to develop engaging and enjoyable puzzles.

## Points worth noting from the above steps

- choose a grid size
  - Guardian quick is 13x13, and so we'll aim for this
- the grid has rotational symmetry
  - you rotate it 180 degrees and the black spaces match up
  - if the top left grid square is black, then the bottom right grid square will be black
- use common words and harder vocabulary
  - this will require a large colleciton of words that are categorized or classified by obscurity, how archaic they are etc, how much in common usage

## Further thoughts from Guardian quick crossword

- aside from standard words you will need lists of:
- film titles, songs, directors, authors, books, places
- you will need phrases such as `go the whole hog` which appeared in one of the puzzles I looked at
  - another example from the same puzzle: `man of the match`
- you need names like `chatgpt` which won't be found in a dictionary but is something that everyone knows about
  - contrast 'netlify' which is not a good word for a crossword puzzle
- musical terms - eg allegro, pianissimo
- foreign words such as `salaam`
- the larger the pool of words and phrases we have to choose from, the easier it will be to generate the puzzle without backtracking
  - I imagine that selecting words randomly may often leave us in a situation where there are no words of X length that contain z, x and a in the required positions
  - in this case we'll have to backtrack and swap out one of our other clues, and this will have knock-on consequences for other words we may have already selected
  - ultimately, this may make it impossible to easily/quickly create a puzzle in the browser

## How to develop the grid

- look at many Guardian quick crossword puzzles, identify broad patterns
  - is the top left square ever shaded?
    - yes
  - it may be easier, at first, to take a number of grid patterns and select one at random
    - let's say we take 3 patterns
- our grid is 13x13 => 169 squares numbered 0 to 168
  - if position 0 is shaded
    - position 168-0 must be shaded
  - if position 12 (top right) is shaded, then position 168-12, 156 is shaded
- okay, this is complex

## A deeper dive

- how many possible valid grids are there with a 13x13 grid?
  - the rules for a valid grid:
    - rotationally symmetrical
    - all words must be at least 3 letters long
    - no islands of white squares that are not connected to the rest of the puzzle
    - all letters must appear in a down word and an across word
      - not sure exactly what is meant by this
      - it may mean that if a letter appears somewhere in the grid then it must appear both across and down
        - this is from examining a single puzzle where x and z are omitted completely
        - also, xwordinfo notes omitted letters and so this may be correct
- there are 40,575,832,476 possible valid puzzles in a 13x13 grid: https://fivethirtyeight.com/features/time-for-some-abstract-math-drink-up/
- obviously an enormous number of these will be of little use to construct a usable crossword grid
  - example, a grid with a single void is valid but to fit words into it may be impossible
- this is an interesting website: https://www.xwordinfo.com/Crossword?date=4/8/2024
  - unfortunately, the shape of these puzzles is not similar to the Guardian puzzle

## Describing a grid

- I will take a 13x13 grid that has been used in a crossword
- lets say each cell is an object
- each cell:

  - isVoid: true/false
  - index (from top left)
  - isDown - it is the start of a down clue
  - isAcross - it is the start of an across clue
  - clue number
    - if isDown is true and isAcross is true, then the clue number will be the same

- the number of voids in the grid may be similar between Guardian quicks
  - 49 in 16824
  - 48 in 16823
  - 45 in 16822
  - 51 in 16821
- again we are back to the 'shape' of the puzzle
- the NYT puzzle has an average of about 37 voids monday through thursday, but it is 15x15, 225 squares or about 33% more squares than our 169 square Guardian quick
- a common scheme in a grid appears to be:
  - one void on a single line
  - followed by a line where every other square is a void
  - followed by a single void
  - and so on
- we only need a valid grid for the first 7 lines (of a 13x13 grid)
  - it's actually 6 lines plus 7 cells from the next line since we rotate our grid around the center of the centremost cell
- we can rotate a grid 90 degrees to create a new puzzle (assuming it does not have rotational symmetry when rotated 90 degrees)

## Automatically numbering our clues

- we'll come back to this

## Relative position of cells

- to get the cell immediately below the current cell:
  - index + Math.sqrt(grid.length)
- to get cell immediately above the current cell:
  - index - Math.sqrt(grid.length)
- the center cell index
  - (tempGrid.length - 1) / 2
- corner cells
  - top left: grid[0]
  - bottom right: grid[grid.length - 1]
  - top right: Math.sqrt(grid.length) - 1
  - bottom left: grid.length - sqrt(grid.length) => 169 - 13
- all cells along top: index <= Math.sqrt(grid.length) - 1
- all cells along right: (targetIndex + 1) % 13 === 0
- all cells along left: targetIndex % 13 === 0
- all cells along bottom: index >= grid.length - sqrt(grid.length) => index >=156

- note that finding the cells along the right using only the above method, requires us to check all squares, which seems inefficient
- if we first find the top right square, which can be done without knowing the index of any particular cell, we can simple add a value to it
- finding all the cells on the right edge efficiently:

```js
const findRightEdge = () =>{
  const rightIndices = [];
  const gridLength = grid.length; // 169
  const sideLength = Math.sqrt(grid.length); // 13
  for(let index = sideLength - 1; index < gridLength - 1, index += Math.sqrt.gridLength){
    rightIndices.push(index);
  }
  return rightIndices;
}
```

- we do the same with the left - code added in project
- we do the same with the top and bottom edges - code in the project

## More precise rules for a valid grid

- there are other rules not noted elsewhere, let's gather all rules here
- rotational symmetry through 180 degrees
- no islands of white cells
  - for example, an unbroken diagonal of voids from one side of the grid to the other would make the grid invalid
  - another way to say no islands of unconnected white cells is to say they must be orthogonally contiguous to form a single polyomino
- no word can be less than 3 cells in length - this is an american rule but we may follow it (review Guardian quick puzzles)
- all letters must appear in a down clue and an across clue - again, this is an American convention and does not apply to British, Australian, and Irish puzzles, which have a lattice like structure
- approx 25% of the cells will be voids in a lattice like crossword
- I'm sure there is a rule about no side being wholly comprised of voids, but will have to check this
  - I'll take this as a given since if an entire side is composed of voids then the puzzle could effectively be 12x13, 13x12 etc
  - there is no reason to include a column or row if it is entirely comprised of voids

## Numbering our clues

- We iterate through our array of cells until we find a cell that is not a void. A void cannot be the start of a clue
- for any given cell at this point we know:

  - if there is a light above it or below it
  - if there is a light to the left or right

- if a cell has no light above and no light to the left of it, it is the start of a clue

  - this may be down or across
  - if there is a light to the right, it is across
    - create a new across clue using the next available number
    - if cell to right
  - if there is also a light below, it is down

  is start of clue
  (!cell.top && !cell.left) || (!cell.left && cell.right)

## Refactor at this point

- we need to determine if a cell is at the edges quite often
- instead of calculating the indices of top, right, bottom and left sides of the grid each time we need to check, let's add to our Grid state and calculate it once
- we can then use a function like isLeft, isRight to cleanly return true or false in an if statement instead of having more confusing code inside the if condition

## Populating our Clue objects with answers

- at this point we have the Clue class, instances of which have the following props:
  - answer: the answer that fits in the crossword grid for a given clue
  - clue: the clue that will be shown to the crossword solver
  - direction: whether the clue is across (0) or down (1)
  - the indices for each cell that comprises a letter in the answer
    - since we had to iterate across or down to get the clue length, it made some sense to store the index of each letter
    - this will be useful when it comes to a few things
    - cross referencing if an index in a clue is also part of another clue
      - when constructing the crossword, if the letter of the ANSWER changes in the across clue, then that affects the answer that must fit in the down clue
      - when solving, in the Guardian crossword when the user clicks a cell that belongs to an across and a down clue, the across clue is highlighted first. A subsequent click highlights the down clue.
- it would probably be better if instead of an array of indices, we have an array of objects with the index as the key and the letter as the value, or an array of tuples with [0, 'A'], [1, 'P']
- anyway, next steps:
- get a big list of words
- iterate over the Clue objects and select a pseudorandom answer of an appropriate length from the list of words/phrases
  - it may be beneficial to fill in the larger words first and work around those
    - it will be harder/impossible to find a large word/phrase that fits with a bunch of other 3-4 letter answers that we have already filled in
      - in our 'starter' Guardian grid, we have 2 12-letter answers that both share letters with 6 other shorter answers
  - OR it may be benficial to pick the words that intersect with the greatest number of other clues (which intuitively may be the longer clues)
