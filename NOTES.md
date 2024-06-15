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
    - it may be harder/impossible to find a large word/phrase that fits with a bunch of other 3-4 letter answers that we have already filled in
      - in our 'starter' Guardian grid, we have 2 12-letter answers that both share letters with 6 other shorter answers
  - OR it may be benficial to pick the words that intersect with the greatest number of other clues. Intuitively, these may be the longer clues - although not necessarily, and it is easy to think of a grid where a very long word only intersects with one other clue

## Word difficulty

- this seems like a deep subject with a lot of different approaches that could be combined
- a few possibilities:

  - word length
  - number of syllables
  - word frequency
  - Scrabble score

- possibilities that are beyond my ability (compute power, storage, RAM, access to enormous corpus of text):

  - combine the above methods with readability analysis:
    - Dale-Chall
    - Flesh-Kincaid
    - Fry readability
    - Gunning Fog index
    - Spache Readability Formula

- Taking a deep dive into word difficulty would be a fun project all on its own, some resources:
- https://datayze.com/word-analyzer?word=difficulty - input a word and get info on its difficulty
- https://stackoverflow.com/questions/5141092/determine-the-difficulty-of-an-english-word
- Porter Stemming Algorithm: http://tartarus.org/~martin/PorterStemmer/def.txt
  - a more advanced idea of 'length' by defining words as being of the form [C](VC){m}[V]; C means a block of consonants and V a block of vowels and this definition says a word is an optional C followed by m VC blocks and finally an optional V. The m value is this advanced 'length'.
- Google n-grams V3: http://storage.googleapis.com/books/ngrams/books/datasetsv3.html
- https://simple.wikipedia.org/wiki/Readability
- since the Google ngram dataset looks promising, here's a great article I mostly read! https://economicsfromthetopdown.com/2020/10/19/working-with-google-ngrams-a-data-wrangling-tale/
  - this article mentions the grady_augmented word list

## Word lists

- picking the right list or combining lists seems important
- https://www.spreadthewordlist.com/
  - this list is large but there is a huge amount of garbage in here. The first 5 entries are:
    aaa;50
    aaaa;40
    aaaaa;20
    aaaaaaaaaaaaaaa;30
    aaaaah;20
  - the words are also not separated by spaces
- https://www.reddit.com/r/crossword/comments/nqsuku/all_the_downloadable_word_lists_ive_been_able_to/

### the CrossWord Nexus Word list

- this is an Americancentric list
- the words are not separated out and so you have an entry like `5440ORFIGHT` which to me looks like nonsense
  - of course, it has meaning as a book and a was a slogan in the 1844 presidential election
- interestingly, ChatGPT has no problems, for the most part, in providing information when you paste something like 5440ORFIGHT in, or LOMEIN (Lo Mein) and so on
- from the perspetive of generating a clue automatically, ChatGPT gives me a good clue but tells me it is 6 letters, not 2,4 (LOMEIN)
- in fact, it will tell you that it is 6 letters even if you type in 'Lo Mein'

### World List Woes

- most of the word lists I've found are US-centric in terms of culture
  - ideally the list would be in British english
- they have information stripped out, such as the spaces between the words, apostrophes, hyphens etc
- an ideal list would:
  - have the spaces left in, so that we could at least say how many words are in the answer!
  - have a stripped version and an intact version of the same answer to make it clear what it is (phrase): `KITTITIANSANDNEVISIANS` initially looks like drivel
- for the sake of simplicity, I'll use a 60,000 word list that has only single words or 1-grams and it retains hypens, and has a frequency rank
  - a quick check shows that it contains British and American spellings :frowning:
  - but let's crack on anyway

## To Do Tomorrow (14-4-24)

- answers.ts needs the following to be done:
  - add a field for the answer stripped of hyphens and apostrophes
  - recalculate the length field
  - pre-split the file based on answer length
    - we don't want to have to filter 60,000 entries everytime we need an answer that is X chars in length
    - the structure might be:

[{len: 3, answers: [{Answer}, {Answer}, {Answer} ...]}, {len: 4, answers: [{Answer}, {Answer}, {Answer} ...]}, ...]

- we also need to investigate calculating a word score before doing the above
  - find out how the pros do it
  - do the calc and add the field

## Cells and Clues - Oh Boy

### Cell

- a cell has an id which is a number that tells us where on the grid it is
- a cell has an optional clueNumber
- a cell must also be capable of displaying a letter

### Clue

- a clue has an answer prop, which is a string of letters we can use to populate a cell
- a clue has an array of indices

- to populate a cell with its letter (this is for crossword construction, not solving)
  - the cell id will match a value in the indices array
  - the position of this index in the array will match the letter in the answer
- to populate the cell with its letter
  - what clues have a non-empty string answer?
  - take the indices of these clues, if the id of the cell is in the clue, take the position of the index (yeah, it's hard) and pass the corresponding letter to the cell

## Not worrying about displaying our answers on our grid

- for the moment, I think I'll focus on iterating through adding a clue, and then filling in letters from that clue in clues that intersect with that clue
- a Clue's answer may be better as an array of letters
- our clue:

```js
{
    "length": 13,
    "direction": 1,
    "indices": [
        0,
        13,
        26,
        39,
        52,
        65,
        78,
        91,
        104,
        117,
        130,
        143,
        156
    ],
    "answer": "PREFIGURATION",
    "clue": ""
}
```

- steps:

  - let's say our answer starts out as an empty array with length 0.
  - We first check if the length is zero
    - if the length is zero, then we know that no clues that intersect with it have had their answers set
      - this means we are free to pick any random answer of an appropriate length
      - if a clue that intersect with it has set a value, then this letter must be filled in in our answer array for this clue and its length will not be zero
    - if the length is not zero, and, say, the length of the answer must be 13 letters, we filter our thirteen answer list for words that match our pattern AND ONLY THEN randomly select an answer from the filtered list
      - for each letter that we fill in, we must update all other clues that intersect with our clue

  clue 0 has a list of indices: [[0, Clue] [1, undefined], 2, 3, 4, 5, 6, 7, 8]
  clue 1 has a list of indices: [0, 13, 26, 39]

  Therefore, the cell with the id of 0 is common to clue 0 and clue 1.
  When we set the value for the answer in clue 0, we must also set the value for the clues that have common indices. In this case, the letter in the 0th position of clue 1

  - a down clue cannot intersect with another down clue
  - an across clue cannot share a cell with another across clue

## Getting there

- Added getAcrossOrDown that takes a clue and if the clue is an across clue, it returns all down clues, and vice versa
- since an across clue won't share cells or intersect with any other across clue, there is no point in checking all clues to see if they share cells

- added getCluesThatIntersect, which apart from being one of the worst named functions in the history of programming, takes a clue and an array of clues derived from calling getAcrossOrDown. For every clue in our clue array, it iterates over our param clue's indices array. If they share an index, we return an object with the Clue, the value in our indices array, and the index of the value in the Clue's indices array.

I think our clues will need an id prop. A unique prop might be, for example, a string composed of the first and last index of the indices array. In getCluesThatIntersect, we would then return the id, the index value in our param clue, and the index of this index in our matching Clue's indices array.
For example, we have clue 1 across and 1 down. They both share the cell with index 0. We run our function, getCluesThatIntersect:

```js
getCluesThatIntersect(oneAcross, cluesDown);
```

- this returns an array of objects, and each object will look like:

```js
{id: "0156", myIndex: 0, yourIndex:0}
```

- 0156 is the id for the Clue 1 Down (assuming it is 13 chars in length with the last cell having index 156 on our grid)
- myIndex: this is the position of the index in our indices array
- yourIndex: this is the position of the index in the intersecting clue's indices array

- why return the position of the index in the indices array instead of the actual value? The actual value gives us the index of the cell in the overall grid. In terms of clues, it's more useful to say that "my 3rd letter intersects with a clue with this id, and the position of the shared letter in that clue is 5th." If I, as a clue, update my letter in the 3rd position, I can say: get me the clue with id of such and such. Now set the 5th element of its answer array to be equal to the 3rd element of my answer array.

## Todo

- add id to the Clue class - first and last elements of the indices array as a string should be unique
- add a new prop to Clue called 'intersection' which will be an array of objects as noted above:

```js
{id: "0156", myIndex: 0, yourIndex:0}
```

## Excited!

- have got the app to the point where it can fill in answers to construct a crossword!
- there is no "backtracking" implemented yet
  - in other words, if it runs into a situation where there are no candidate answers for a particular clue (due to the combination of letters already in the clue from intersecting clues), it can't undo a step or choose a new word for one of the preceding clues
- another point to note is that it is not taking word scores into account at all
  - as a result, the difficulty of the crossword generated will be all over the place
- steps that you can take to ensure there are less clues that have no candidate answers:

  - increase the word list - it's a mere 60,000-ish words with no movie titles, place names, books, plays, people's names, acronyms etc, etc.
  - certain letters are problematic: Y, Z, X

- possible strategy for backtracking:

  - the current clue has no candidate answers and it intersects with, say, two other clues, X and Y
  - remove one of the letters from X clue and search for candidate answers again
  - if you find one, then remove the letters from X clue that are not shared with other clues, and repick the word for X clue such that it will fit with the new candidate answer for our current clue

- we may need to keep track of rejected candidate answers
- the above strategy sounds like it could lead to an infinite loop?
  - could it?
- for a given answer candidate that already contains some letters, we are pattern matching against the set of all words that are of N length
  - let's say we get a list of 30 words, and we pick one randomly
  - it may be worth retaining that list of 30 or 250 words (for each clue), so that we can match against it again, or so that we can swap out words more easily

## Adding Words Woes

- finding quality words lists is difficult
- examples of what Crossword Compiler uses in terms of additional word lists:
  390 000 less common words
  270 000 compounds and phrases
  173 000 Scrabble word list
  UK Advanced Cryptics Dictionary (List of 240 000+ words)
  8 million+ Wikipedia head words
  25 000 medical words, 16 000 legal words
  9500 movies, 5000 literature-related
  20 000 people's names, 59 000 plant names
  4000 world cities, 10 000 world towns
  230 000 words and 70 000 expressions from Webster's 2nd.
  25 000 ethnic words
  19 000 Scottish words
- adding words is going to require some web scraping
- alternatively, it will involve wading through tens of thousands of words and deciding on a word-by-word basis whether I should include it or not
- this might be useful later: https://ucrel.lancs.ac.uk/bncfreq/flists.html

## Forget Adding Words For Now, Next Steps

- What else needs to be done now?

### Storing Words

- How I'm storing the existing words is not workable
  - the current list of 60k-ish words is uneditable due to sluggishness in the IDE
  - they need to be divided up into smaller files
  - solved this buy getting a new computer! Probably should split the words to separate files if anyone else wants to use the repo

### Separate Out Setting the grid and generating the answers

- add a button to generate clues
  - at the moment creating and regenerating the answers/clues each time we toggle a cell from light to dark or viceversa.

### add grid validation

- inform user if the grid is not in a valid configuration
  - see above for what a valid grid is

## Bug

- some of our clues are overwriting the letters already placed in the grid that they share with other clues
- the intersection prop appears fine, so there is some logic wrong in populateClues
- this is fixed

## Backtracking

- we hit the if branch where there are no available options for our answer
- example: 6DOWN (which is the clue 3 down) - 6 is the index of the cell at the start of the clue
  - L _ O _ O _
  - intersection 3across (length 10), 32across (length 7), 52across (length 8)
  - how do we choose which answer to replace in the hopes of finding an answer to fit in 6down?
  - we might use something like:
    - the shortest answer
    - the answer that intersects with the fewest other clues
    - the answer that has the most "awkward" letter that is shared by 6down (Z, X, Y)
      imagine that one of our clues had an I in it and that "I" was the last letter in 6down - that would be a great candidate
      - how do you do that programmatically without a ton of logic and statistics about letter patterns in words?
- another possibility - assess the statistical likelihood of finding a good answer given the pattern

  - we know that L _ O _ O _ has 0 matches in our limited list of words that are 6 characters long
  - if we drop the L, so we have _ _ O _ O _, and count the matches
  - add the L back and drop the first O and count the matches
  - add the first O back and drop the second O and count the matches
    - the pattern with the highest number of potential matches will most likely yield a "good" answer

- at this point, we've determined the best intersecting answer to replace
- we need to take the answer for that intersecting clue and remove the unshared letters AND remove the letter shared with 6down, in this case
- then we find what matches we have excluding the letter we dropped

- in our example of 6down, we are best to replace the middle O, this gives us 52 possible results on crosswordsolver.org
- 32across is the clue with the O we are removing: OBVERSE
  - removing unshared letters AND the O: _ _ V _ R _ E
  - there are many options, let's try ADVERSE
- this means 6down is: L _ A _ O _
  - that yields no candidates in our lists (obscure ones on crosswordsolver.org)
  - ADVERSE is no good
    - we need to retain this list to iterate down it
    - we only need 1 word with each letter in it!
  - DIVERGE, Inverse, reverse
- DIVERGE gives L _ D _ O _
- yields nothing in our list (LUDLOW on crossword solver)
- INVERSE gies L _ I _ O _
- yields nothing (LEIPOA, v obscure)
- REVERSE gives L _ R _ O _
- yields nothing
- and so, in terms of our list, we've hit a deadend with replacing the middle O

- removing the last O gives L _ O _ _ _
- but now we are replacing 52Across: RESISTOR, dropping the O and the non-shared letters we get: R _ S _ S _ _ _ 
- the possibilities are: RESISTED, RESISTOR, or RESISTER
- the shared letter is the second last, so RESISTED and RESISTER are effectively the same, we used RESISTOR already, so let's try RESISTED
- so:
L_O_E_ 

and we get 15 results! LOOKER, LOOPER, LOOKED

now we just have to implement this in code! Yay! 

## Where are we Now? 
- At the moment, we have:
  - `replaceCluePattern` which is an array of regular expression instances that can be used to match against our answer2.ts words. The purpose of this is to find alternative answers for intersecting clue answers.
  - `replaceClues` which is an array of Clue instances that intersect (or share a cell) with our current clue answer.
  - `candidateAnswers` is an array of objects of type Answer `{freq: 121, raw: "GRAPE"}`
    - the candidateAnswers needs a further filter
    - we need a ref to the shared letter + its position in our candidate answer that caused the inability to find an answer that would fit
      - answers that have this same letter in the same position are of no use and should also be discarded

## 21/4/24 update
- current example:
  - clue ans is ['I', '', 'A', 'N']
  - the regexp for the first clue is: /[A-Z]I[A-Z]G[A-Z]E[A-Z]A[A-Z]E[A-Z]T/
  - note the I in the second position of the regex is the letter shared with our current clue's answer, but should be discarded

## 22/4/24 update
- current example with better logging:
  - 6Down is: ['A', '', 'H', '', 'E', '']
- first clue that intersect is: 
4across: ['N', 'E', 'A', 'R', 'E', 'A', 'R', 'T', 'H']
cleaning up 4Across (which is what we are testing), we get:
['', '', '', '', 'E', '', '', '', 'H']

- the goal is to remove all  unshared letters AND the letter that 4across shares with 6Down, did we succeed?
- The issue with determining this is we are in an else branch of a bunch of loops!
- The letters that 6Down contains are a snapshot of 6Down in that moment
- the clues get processed based on the answer length, with those with a longer answer getting processed first
  - therefore, it is possible  that the 'N' of Near Death hasn't been filled in yet
  - however, 6down has a length of 6, 4across is 9, 4down is 8
  - this means that the order of processing is: 4across, 4down, 6down
  - this means 4down has been filled in when we arrive at the else branch for 6down, and so ['', '', '', '', 'E', '', '', '', 'H'] is wrong, since the N should be retained
  the answer for 4down is ["N", "E", "C", "R", "O", "T", "I", "C"]

## Update 24/4/24 Why is this so hard?
- I think it's hard because of how I have set up the data structures. The intersection prop on Clue is vital to working out things like what clues are blank or what letters are shared between clues' answers. The fact I've made it an array, means I have to iterate over it each time I want to match an ID. If each id was the prop of an object it would be a lot easier:

```js
Clue {
  intersection: {
    10DOWN: { myIndex: 0, yourIndex: 6}
  },
  answer: ['B', 'O', 'B'],
}
```
- assume we need to get myIndex and we have a group of clues we are iterating over:
```js
for(const rClue of replaceClues){
const sharedLetter = rClue.answer[rClue.intersection[clue.id].myIndex]
}
```
- compare that to:
```js
for(const rClue of replaceClues){
 const sharedLetter =
        rClue.answer[
          rClue.intersection.find((item) => {
            return item.id === clue.id;
          })?.myIndex
        ];
}
```
- it's actually not that much different, but it's more obvious (to me) that we don't have to use a for of or forEach every time we need to check for something.

## Update 25/4/24 00:23 - To Do
- we need a list of letters to ignore as we test for each rClue
- we only need to test one word for each letter in a given position
- example, our clue is _ _ _ _ _ _ U _ U
- 10down is UNPARALLELED - it has no completed intersecting clues, so we can swap the answer for anything
  - no point swapping for another word starting with U, we filter that out,
  - we get a list of 3549 words but we only need a list of 25 at most:
    - a word that begins with A
    - a word that begins with B
    - a word that begins with C
    - ...

## 25/4/24 
- the structure of our setClueAnswers function:

setClueAnsewrs(){
  if(clue contains letters but is not complete){
    create regexp;
    filter word list and add words that match the regexp as a candidate answer;
  }

  if(candidate answers has answers in it){
    pick a random word from the candidate answers and set the clue.answer;
    for(each clue that intersects with our clue.answer){
      get the Clue instance that matches the ID of the object in clue.intersection;
      update the shared letter in the answers of each intersecting clue; 
    }
  } 
  else {
    there is no candidate answer for our clue

  }
}


## Update 25/4/24 23:45 - To Do
- iterate over uniqueAnswers and plug each answer in to the relevant rClue (the clue that intersects with our current clue)
- for each answer we plug in, we must check to see if we can find a candidate answer for our current clue


## Our Functions
- since we have a large utils file, I've reached the point where I'm writing code and I'm not sure if I already have a function that does what I'm looking for
- here's a list of what we have in utils:

### Cell and Grid Related Functions

#### getCellAbove
- takes 2 params, an array of CellType objects, and an index
- returns a reference to the cell above the current cell

#### getCellBelow
- as above but returns a reference to the cell below the current cell

#### findRightEdge
- takes 1 param, an array of type CellType objects
- returns an array which consists of the indices of all cells on the rightmost side of the crossword grid

#### findLeftEdge
- as findRightEdge above but returns an array of cells on the leftmost side

#### findTopEdge
- as findRightEdge above but returns an array of cells on the topmost edge

#### findBottomEdge
- as findRightEdge above but returns an array of cells on the bottommost side

#### setGridNumbers
- takes an array of type CellType objects
- iterates over the array and sets a clue number or sets the clue number to an empty string as appropriate
- does not set React state
- return void

#### updateSurroundingCells
- takes 2 params: a grid array of type CellType objects and the index of the current cell
- as we toggle a cell from being a dark or light square, we must tell the surrounding cells whether the cell below, above, to the right or to the left is a void or a light square
- this function gets the cells above, below, to the right, and left and toggles the `bottom`, `top`, `left`, and `right` props. These are booleans, where true indicates that there is a light cell in the given direction, and false indicates that there is a void or nothing (it's on an edge) in the given direction.
- does not update React state
- return void

#### isLeftEdge
- takes a grid of CellType objects and the index of the current cell
- returns a boolean value which is true if the current cell is on the leftmost edge of the grid, false if it is not

#### isRightEdge
- takes a grid of CellType objects and the index of the current cell
- returns a boolean value which is true if the current cell is on the rightmost edge of the grid, false if it is not

#### isTopEdge
- takes a grid of CellType objects and the index of the current cell
- returns a boolean value which is true if the current cell is on the topmost edge of the grid, false if it is not

#### isBottomEdge
- takes a grid of CellType objects and the index of the current cell
- returns a boolean value which is true if the current cell is on the bottommost edge of the grid, false if it is not

#### initializeGrid
- takes a grid of type CellType objects
- maps over each cell and sets the id, right, left, top, and bottom props
- then calls `setClueNumbers` on the updated array
- then calls `createClues` on the updated array 
- returns the updated and initialized grid, an array of type CellType objects

### Clue Related Functions

#### createClues
- takes a grid, an array of type CellType objects
- creates an array of clues, which are instances of the Clue class
- returns an array of newly created Clue instances

#### getClueIndices
- takes an array of type CellType objects
- the start of each clue, down and/or across, has an index from 0 to 169 in a 13x13 grid
- for each CelType object that is the start of a clue, we push the index to an array and return it
- returns an array of indices for each CellType object that has a clueNumber prop that is not falsy (not an empty string)

#### populateClues
- takes an array of Clue class instances, AllAnswers, which is the object exported from data/answers2.ts, gridState - an array of CellType objects, and a React state setter - setGridState
- iterates over all clues in our array of Clue instances
  - sets up an endLoop variable that is used to break out of our iteration over all clues
    - note: this is/was temporary just so we could stop execution at a given point for bug fixing
    - we would break execution when we encountered the first clue answer for which there was no possible answers to select from
- we use a switch statement to:
  - use the clue length to set the word list we'll use to find potential clue answers
  - call setClueAnswers which updates the grid and clues and returns true or false
    - returning true sets endLoop to be true, and so we set the React gridState state and break, which causes execution of populateClues to end

#### sortCluesDescendingLength
- takes an array of Clue instances
- returns the array sorted by the answer length in descending order

#### getAcrossClues
- takes an array of Clue instances
- returns a filtered array of clues that have a `direction` of across

#### getDownClues
- takes an array of Clue instances
- returns a filtered array of clues that have a `direction` of down

#### setCluesThatIntersect
- takes 2 params: the current Clue and an array of Clue instances
- the function sets the `intersection` prop on the current clue
- the intersection prop is an array of objects with the following props:
  - id - the id of a clue that intersects with the current clue
  - myIndex - the index of the letter in the current clue that intersects with the intersecting clue
  - yourIndex - the index of the letter in the intersecting clue that intersects with the current clue
- returns void

#### arrayToRegularExp
- takes an answer, which is a array of strings
- if the answer array is incomplete (does contain empty strings), then we create a RegExp
- returns undefined or an instance of RegExp

#### setClueAnswers
- takes 5 params: 
  - an array of Clue instances
  - the current clue
  - an array of type Answer that match the length of the current clue
  - a Math.random value that is used to pick the answer we will use from the array of Answer objects
  - a grid which is an array of CellType objects
- the functon attempts to find an answer that fits the current clue length given the letters the clue already contains
- if matches are available, one is selected and intersecting clues are updated and the grid state is updated
- if no matches are available, the function has an else branch that starts to look at replacing the clues that intersect with the current clue, I call them rClues, in order to find a combination of letters in the current clue such that we can find an answer that fits
- this function updates the current clue answer, the grid state and the array of Clues but does not directly update React state
- returns void

#### getMatches
- takes 4 params 
  - possibleAnswers, an array of Answer types
  - a RegExp, a pattern to match against our possibleAnswers
  - the current answer, a string
  - an array of all Clue instances
- the function uses the regexp to find all possible matches in possibleAnswers but EXCLUDES matches where:
  - the word has already appeared as an answer in our crossword
  - the answer matches the existing answer
- it returns a filtered array of Answer types

### Word List Cleaning Functions

#### removeChars
- this is a utility function used to clean up our word lists, but not used in the actual application when deployed
- takes an array of type Answer objects
- each answer has a `raw` prop that contains the word but may contain hyphens or apostrophes
- for each answer, we take the raw prop and if it contains a hypen or apostrophe we strip those out and replace them with an empty string, then we set the `word` prop to this cleaned up value
- we calculate and set the length prop of each answer to the length of the word prop (if it exists) or to the length of the raw prop otherwise

#### separateByLength
- takes an array that contains objects of type Answer, and a second argument which is a word length
- we filter the answers by word length and return the filtered list
- again, used to clean up word lists and not deployed with application


## Broad Structure of Setting Clue Answers logic
- we click a button to generate clues
- this calls the populateClues function


## Issue 30/4/24
- example (to make it somewhat understandable)
- we have 6down which is: T _ S _T
- 32across intersects and is: _ _ _ _ A _ O (currently set to SAGUARO - a type of cactus)
- we try VOLCANO, and so 6down we are told is: E _ V _ T
  - we've already attempted to swap OUTERMOST with OVERSHOOT and so this is where the E is coming from 
    - NOTE: when an rClue doesn't yield candidates, we set it back to what it was and move to the next rClue - we've moved to the next rClue here but we haven't set 4across back to OUTERMOST, and now we are looking for E_V_T when it should be T_V_T
- we have a list of 18 candidates with 32across, including CHICANO, which would give us TACIT for 6down
  - however, once we try VOLCANO for 32across, we immediately skip to the next rClue and ignore the other 17 possible candidate answers for 32across
- the next rClue is SPIGOT or _ P _ G _ _, which has one candidate of APOGEE
  - now for 6down we are looking at E _ V _ T, and we have 0 candidates
  - again, the E and the V should have been reset to T and S respectively
- this is fixed now

### Weakness of this Approach
- we have 3 clues that intersect our current clue
- we are seeing if we can find a replacement for each of them individually
- OUTERMOST had 1 other candidate, T or E
  - T _ S _ T fails
  - E _ S _ T fails
  - E _ S _ E fails
  - T _ S _ E fails
  - we have all the combinations provided by E or T _ V,B,T,A,O,S,L etc _ E or T
    - however, we will only test the T _ V-L _ T options using the current set up
    - we are missing a lot of potential matches

- SAGUARO had 12 unique candidates - V, B, T, A, O, S, L, C, Y, P, F, G
- SPIGOT had 1 unique candidate - T or E
- we can come back to this - important as we are not maximizing our chances of filling in all answers when constructing the crossword

## Current Issues
- The clue.intersection prop needs to be updated - it is showing old letters
before our swap. 
- ~~Even though we are setting React state, our UI is not being redrawn and we have to click save in vscode to get it to update! Obviously not ideal!~~ FIXED
- we are not guaranteeing that our answers are unique - we don't want two clues to have the exact same answer!

## How Deep is Your Love ... of Replacing Clues?
- at the moment:
  - we have a 'current clue' for which we can't find an answer
  - we get the intersecting clues and try swapping those out to see if we can find an answer for our current clue
    - to do this, we look at their intersecting clues
- an example of a crossword we generated:
  - we have a 'current clue': _ A _ G _ I
  - the intersecting clues: MAGNOLIA, VOICING, DONOTHING (DO NOTHING)
- as a human, we can see that our current clue ends with an I, making it probably harder to find an answer that fits
  - we look at DONOTHING which is giving us our problem 'I'
  - DONOTHING intersects with MIST
  - reset DONOTHING: D _ N _ _ _ _ _ G
  - if MIST is removed, its pattern is: _ I _ _
  - a match for D _ N _ _ _ _ _ G is DINGDONG
  - a match for _ I _ D (MIST) is BIRD
  - a match for our current clue is DAYGLO - the pattern is _ A _ G _ O when we swap DINGDONG

- in this case we are going one level deeper from the current clue
- a possibility to achieve this is to provide buttons for each clue to find alternatives
  - the user clicks the button for DONOTHING which will attempt to find alternatives for this answer by swapping out the intersecting clues
    - this is basically the logic that we've already set up here

- another option that can be included is a checkbox to remove empty squares
  - we could simply remove the empty squares in our current clue: _ A _ G _ I
  - this removes the clue 14 down (ID is 97DOWN)

- another option, at some point we find a clue for which we cannot find an answer
  - we try replacing all the intersecting clues
  - this still yields no answer
  - we skip to the next clue, leaving our answer blank
- instead of skipping to the next clue, we might "do something useful"
  - this has to involve going one level deeper, or pushing these answers to an array to be looked at later or something else

## Removing Empty Squares
- empty squares - these are clues where there was no potential answer given the sequence of letters already in the answer
- updating the UI, gridState
  - find all Cells where the letter is an empty string or undefined
  - set isVoid to true
  - update surrounding cells
  - ~~to preserve symmetry, also set symmetrical cells to void~~ DONE
    - ~~these cells may have a letter, set this to an empty string!~~ DONE 

## To Do For 3/5/24
- Clue instances in React state need to be updated when removing blank cells - this will involve the destruction of a clue that has blank cells set to void
- walking through an example where we have blanks to remove and how that will affect our clues in React state:
- we have the clue with the ID 26ACROSS, which is 9 Across. It has the indices: 26, 27, 28, 29, 30.
- blank squares will always occur in non-intersecting cells? 
  - I'm not sure this is true, it's probably possible to have two clues that intersect where neither clue has its answer filled in and so there is a blank intersection
  - in either case, both clues can be removed if neither can have their answer set
- what needs to be updated?
  - the clue is removed from the array of Clue instances in React state
  - gridState
    - clueNumber must be unset if set
      - when manually toggling a light to a void, this happens
      - just call setClueNumbers(gridState)
  - clueList
    - example, index 19 is set to void in gridState
    - this is part of Clue 6DOWN that has answer CASBAH
      - clearly this was only removed to maintain rotational symmetry
      - we get the index of this clue in clueList and splice
        - we can get the clue by finding clues where the indices prop contains our index
      - 6DOWN must be removed from the intersection prop of all other clues



## To Do - gathered from reviewing the notes
- ~~make sure answers are unique~~ DONE
- grid validation
  - inform the user if the grid is a valid layout
  - highlight the parts that are not valid or the reason it is not valid
- in the intersection, the letter prop is not set on all objects
  - what are we using the letter prop for again? :grinning:
  - this is a good question, not sure its function was realized!
  - it appears here:

```js

let intersectingClueIndex;
    for (const intersectClue of cluesToSwap) {
      const clueId = intersectClue.id;
      intersectingClueIndex = clue.intersection!.find((item) => {
        return clueId === item.id;
      })!.myIndex!;

      intersectClue.letter = clue.answer[intersectingClueIndex];

      replaceClues.push(
        clues.find((item) => {
          return intersectClue.id === item.id;
        })
      );
    }
```

- and here:
```js
  clue.intersection?.forEach((item) => {
            item.letter = clue.answer[item.myIndex];
            const clueToUpdate = clues.find((clue) => {
              return clue.id === item.id;
            })!;

            clueToUpdate.answer[item.yourIndex] = clue.answer[item.myIndex];
          });
```
- I've searched through notes and utils file and we don't appear to be using the letter prop for anything! We set it and update it in a couple of places, but we aren't reading it or making use of it.
- we also have an oldLetter variable that is declared and set but never read/used
### comprehensive swapping approach
- we need a more comprehensive approach to swapping clues out, such that we construct all possible patterns
  - example: we have a clue (A) with 2 intersecting clues (X and Y) that can be swapped out
  - we drop the letter that intersects with A from X 
  - we now have a sequence of letters in X that we can find matches for alternatives
    - we use unique letters
    - let's say that X has 3 possible replacements that have the letters C, D, E
  - we do the same for Y and we find it has 3 possible replacements that have the letters L, M, N
  - the clue A now has a bunch of patterns to match against. Assume X intersects with A at index 0 of A and Y intersects with A at index 3 and A is 4 letters long
  - A looks like: _ _ _ _
  - the patterns for A: 
  C _ _ L 
  C _ _ M 
  C _ _ N
  D _ _ L
  D _ _ M
  D _ _ N
  E _ _ L
  E _ _ M
  E _ _ N
  - we've also omitted the original letters that were in A and common to X and Y, let's say they were B and K respectively
  - originally the pattern for A looked like: B _ _ K but there were no matches in our word list (who reads books anymore?)
  - we should not try to match that pattern again BUT we also have the patterns:
  B _ _ L
  B _ _ M
  B _ _ N
  C _ _ K
  D _ _ K
  E _ _ K


## Make Sure Answers are Unique
- we have a getMatches function that takes an array of all possible answers, a RegExp to match against, and the current clue answer
- this function is called in two locations
- this is done

## Swapping Approach Example
- we have 26ACROSS: E _ I _ N 
- intersects with:
13DOWN: _ _ _ A _ I _ N _ H _ P - RELATIONSHIP, the E intersects with 26ACROSS

15DOWN: _ _ _ T _ A _ T _ D _ Y - DISTRACTEDLY, the I intersects with 26ACROSS

4DOWN: P _ _ _ T _ I _ - PONYTAIL, the N intersects with 26ACROSS

- find all words that fit in each intersecting answer, one per letter
  - we have code that does this
  - do this for each intersecting answer
- we end up with three arrays: 
letters for 13DOWN [A, B, C]
letters for 15DOWN [D, E, F]
letters for 4DOWN [G, H, I]
- for 26ACROSS, we have to come up with all the permutations for matching patterns
- see if we can find a matching word for any of the permutations, then find a match for each of our intersecting clues based on the answer we input to our current clue

```js
 const cluesToSwap.push(
        ...clue.intersection!.filter((item) => {
          return item.myIndex === index;
        })
      );

let intersectingClueIndex;
    for (const intersectClue of cluesToSwap) {
      const clueId = intersectClue.id;
      intersectingClueIndex = clue.intersection!.find((item) => {
        return clueId === item.id;
      })!.myIndex!;

      intersectClue.letter = clue.answer[intersectingClueIndex];

      replaceClues.push(
        clues.find((item) => {
          return intersectClue.id === item.id;
        })
      );
    }

```
- cluesToSwap are the intersection objects in our clue.intersection.
  - they hold the id and yourIndex
- replaceClues is an array of Clues to be swapped
- do some logging on the below code and see what we can reuse or tweak
- this just creates the patterns for the replacement clues,  whereas we still just want to come up with comprehensive patterns for our current clue
```js
 const replaceCluePattern: RegExp[] = [];

    replaceClues.forEach((rClue: Clue | undefined) => {
      const intersectingClues: Clue[] = [];
      const myIndices: number[] = [];
      const myTempAnswer = [...rClue!.answer];

      for (const intersectObj of rClue!.intersection!) {
        myIndices.push(intersectObj.myIndex);
        const irClue = clues.find((item) => {
          return item.id === intersectObj.id;
        });
        intersectingClues.push(irClue!);
      }
      intersectingClues.forEach((item) => {
        let irClue;

        // console.log(item.answer.includes(""));

        if (item.answer.includes("")) {
          irClue = rClue!.intersection!.find((intersectObj) => {
            return intersectObj.id === item.id;
          });
        }
        if (irClue) {
          myTempAnswer[irClue.myIndex] = "";
        }
      });

      for (let i = 0; i < myTempAnswer.length; ++i) {
        if (!myIndices.includes(i)) {
          myTempAnswer[i] = "";
        }
      }
      // console.log("myanswer: ", myTempAnswer);

      replaceCluePattern.push(arrayToRegularExp(myTempAnswer)!);
    });
```

## Update 16/5/24: Where We're At

- The misnamed Reset Clue button code is complete. Once we've generated all of our clue answers, we click this button and it attempts to find answers for any incomplete answers. It does this by resetting the intersecting clues (removing unshared letters) and finding other words that might fit in these positions. From there, we generate a comprehensive list of patterns for our incomplete clue and try to find a match using these patterns. The vast majority of the time no match is found. In cases where a match is found, it is quite likely that the symmetrical clue is also incomplete and so we will end up removing both clues to keep the grid's rotational symmetry.

The best solution to this is increasing the word/phrase list with quality words, and this is something I can look into, perhaps. I avoided this initially, because it is less about programming and more about cleaning up data and painstakingly poring over lists of words, which is not sexy.

At this point, our generation code is complete. Now, we decide what options we give to the user when generating the crossword. I think we can proceed as follows:

- we add more starting grids and let the user choose a grid 'shape'
- we retain the 'remove empty cells' option
  - the 'handleResetClue' code will run automatically after we generate our clues and there will be no button to run it
- we add another option, mutually exclusive to 'remove empty cells,' which will essentially force regenerating the grid until there are no incomplete answers. It probably takes less than 5-8 attempts on average to generate a crossword where there are no empty clue answers. If this option is true, then there will be no need to run our handleResetClue code.
- we might try to use our handleResetClue code as we initially generate our grid and encounter a clue for which there are no candidate answers


## To Do
### Core Stuff
- ~~add force regenerating crossword until there are no incomplete answers~~ DONE
  - selecting this option will disable the 'remove empty cells' option (and vice-versa)
- once the crossword is complete, generate the clues themselves (hopefully via GPT3.5/4)
- display the grid to the user so they can fill in answers and solve the crossword
### Nice to Have
- add starting grids and let user choose
- use our comprehensive clue answer replacement code when generating the grid, rather than running it at the end
  - I suspect this may have no real impact on whether we end up with clues that have incomplete answers

  ## Task - force crossword to regenerate clues until there are no incomplete answers
  - we'll have to set React state back to the initial state
    - initially we call initializeGrid(grid)
      - this sets the top, bottom, left and right props by mapping over grid and creating a new array, newGrid
      - it calls setClueNumbers(newGrid)
      - it calls createClues(newGrid)
        - this creates a new clues array that contains objects of the type Clue
        - it initializes props of each Clue
        - it returns the clues array
          - note: initializeGrid does nothing with the clues array and state is not set, so it does nothing?
          - ~~remove createClues call~~ DONE
      - it returns the newGrid
- after the first render, a useEffect calls `initializeApp(gridState, setClueList, setGridState)` which does the following:
  - it makes a deep copy of the gridState React state variable
  - it calls setClueNumbers
    - this has already been called in initializeGrid
    - this is probably not doing anything and is duplicaton
      - we built the app iteratively, so at some point these duplicate calls may have made sense
    - ~~remove setClueNumbers call from initializeApp~~ DONE
  - it calls createClues(grid) which returns an array of Clue objects
  - it calls getAcrossClues and getDownClues, which gets a ref to clues with a direction prop set to across and down respectively
  - it uses these down and across clue vars to set the intersection prop on each clue by calling setCluesThatIntersect
  - it sorts the clues in descending length by calling sortCluesDescendingLength
  - it sets the clueList React state by calling setClueList(clues)
  - it sets the gridState React state by calling setGridState(tempGrid);
    - as far as I can tell, the gridState is not mutated here, so this call should be unnecessary
    - ~~remove setGridState call from initializeApp~~ DONE
    - ~~remove 'setGridState' from list of args/params that initializeApp is called with~~ DONE
- once initializeGrid and initializeApp are called:
  - the clue.answer prop is an array of empty strings ['', '', '', '']
  - the objects in the clue.intersection prop array do not have a letter prop (optional)
    - need to look at how we are using this as it is not set on all clues
    - think it relates to replacing intersecting clues
  - we still have an endLoop variable but it is not being used/was temporary when coding populateClues
  - ~~remove code around endLoop variable from populateClues and setClueAnswers~~ DONE
  - each Cell in gridState does not have a letter prop (optional). This is set when we populate clues.
  - to reset our grid and clue state we can try:
    - reset the letter prop in grid (set it to ""?)
    - reset the answer in Clue
    - set the letter prop in clue.intersection to "" if it exists

## To Do
- ~~using populateClues and resetAllAnswers, write some logic to repeatedly call populateClues until there are no incomplete answers~~ DONE


## The Solve/Solving Grid
- ie, the grid the user can fill their answers in 
- Guardian quick functionality to mimic:
  - clicking on a cell where that is part of an across and a down answer first causes all elements of the across clue to have a background color of yellow
    - a second click highlights all of the down cells
    - the clue is also highlighted
- when entering a value, the cursor automatically tabs to the next empty cell of the answer
  - upon reaching the last letter, the cursor doesn't move, it does not tab to the first letter of the next clue
- the tab key
  - if an across answer/clue is selected, will move to the next across clue
  - the cursor is placed in the first cell of the selected clue
  - tab shift goes the other way
  - same for down clues, we cycle through those with tab
- arrow keys
  - we can navigate through the crossword grid like a maze/pacman using the arrow keys
  - appropriate clues are highlighted depending on where the focus is
- clicking a cell that contains a letter and pressing delete will remove the letter
  - our grid has this behaviour by default
- the gridstate (partial):
  ```js
  [
  {
    "isVoid": true,
    "id": 0,
    "top": false,
    "right": false,
    "bottom": true,
    "left": false,
    "clueNumber": ""
  },
  {
    "isVoid": true,
    "id": 1,
    "top": false,
    "right": false,
    "bottom": false,
    "left": false,
    "clueNumber": ""
  },
  {
    "isVoid": true,
    "id": 2,
    "top": false,
    "right": false,
    "bottom": true,
    "left": false,
    "clueNumber": ""
  },
  {
    "isVoid": true,
    "id": 3,
    "top": false,
    "right": true,
    "bottom": false,
    "left": false,
    "clueNumber": ""
  },
  {
    "isVoid": false,
    "id": 4,
    "top": false,
    "right": true,
    "bottom": true,
    "left": false,
    "clueNumber": "1",
    "letter": "I"
  },
  {
    "isVoid": false,
    "id": 5,
    "top": false,
    "right": true,
    "bottom": false,
    "left": true,
    "clueNumber": "",
    "letter": "N"
  },
  {
    "isVoid": false,
    "id": 6,
    "top": false,
    "right": true,
    "bottom": true,
    "left": true,
    "clueNumber": "2",
    "letter": "T"
  },
  {
    "isVoid": false,
    "id": 7,
    "top": false,
    "right": true,
    "bottom": false,
    "left": true,
    "clueNumber": "",
    "letter": "E"
  },
  {
    "isVoid": false,
    "id": 8,
    "top": false,
    "right": true,
    "bottom": true,
    "left": true,
    "clueNumber": "3",
    "letter": "R"
  },
  {
    "isVoid": false,
    "id": 9,
    "top": false,
    "right": true,
    "bottom": false,
    "left": true,
    "clueNumber": "",
    "letter": "A"
  }
 ]
```

- the clue state:
```js

{
  "id": "10DOWN",
  "length": 12,
  "direction": 1,
  "indices": [
    10,
    23,
    36,
    49,
    62,
    75,
    88,
    101,
    114,
    127,
    140,
    153
  ],
  "answer": [
    "R",
    "E",
    "F",
    "R",
    "I",
    "G",
    "E",
    "R",
    "A",
    "T",
    "O",
    "R"
  ],
  "clue": "Depicting a concept visually",
  "intersection": [
    {
      "id": "4ACROSS",
      "myIndex": 0,
      "yourIndex": 6,
      "letter": "R"
    },
    {
      "id": "32ACROSS",
      "myIndex": 2,
      "yourIndex": 4,
      "letter": "F"
    },
    {
      "id": "61ACROSS",
      "myIndex": 4,
      "yourIndex": 1,
      "letter": "I"
    },
    {
      "id": "85ACROSS",
      "myIndex": 6,
      "yourIndex": 3,
      "letter": "E"
    },
    {
      "id": "109ACROSS",
      "myIndex": 8,
      "yourIndex": 5,
      "letter": "A"
    },
    {
      "id": "138ACROSS",
      "myIndex": 10,
      "yourIndex": 2,
      "letter": "O"
    }
  ]
}

```

## Solving Todo
- ~~render the clues on the screen~~ DONE 
  - worry about formatting later
    - hyphens
    - ~~number of letters: 4-2, 9, 4,2 etc~~ DONE
- ~~when a cell is clicked, all cells in the answer are highlighted~~ DONE

## Translating Clicking on a Cell to Highlighting a Clue
- we have some state which indicates the direction, down or across
- with the current set up/state, if we want to highlight a clue by clicking a cell we might:
  - click on the cell, a cell has an id which is the index of the cell in the grid
    - note the containing div has an id, the input does not
  - using the id, we filter the clues array returning any clue where the indices property of the clue contains the id
  - the clues have a direction prop and an id
- using our direction React state, if we returned 2 clues, then we know there is a down and an across
  - we set direction state to across and highlight the across indices
  - on the second click, we set state to down and highlight the down indices
  - use some logic here if the cell we click is only part of a down or only part of an across clue

## Actual Behaviour of Guardian Quick
- if cell is the start of a down and across clue, select the across clue on the first click
- if the cell is the start of a down clue and occurs in a position other than the start of an across clue
  - select the down clue
- if the cell only occurs in one clue (down or across) select the appropriate answer cells

## Issue 28-5-2024
- we need access to the raw version of each answer
  - this is required so we can accurately display how many words an answer has:
    - (4,2) - 2 words, one is 4 letters long, the other is 2 letters long
    - (4-2) - a hypenated word with one 4 letters long, the second is 2
    - (4-2,4) - a hyphenated word that is six letters long (4-2) and a separate word that is 4 letters long
- to achieve this we will:
  - add a raw property to each clue which is an array of strings
  - update all code that sets the answer prop on a clue
    - we will also have to set the raw prop every time we set the answer prop
- this is partially done but:
  - we have a uniqueAnswers array of strings which are answers
- later in the code, we iterate over the uniqueAnswers array and we set the rClue answer;

```js
for (const answer of uniqueAnswers) {
/// a bunch of code
rclue.answer = [...answer];
// some more code here
}
```
- we need to set the `raw` prop on rClue, and so we'll have to refactor our code so that instead of pushing a string to uniqueAnswers, we push an object like so `{word: "fullon", raw: "full-on"}`

## Todo/ideas for Solver Route
- a new grid/crossword is generated and AI clues are retrieved when the page is visited
  - may need a timer for this to prevent spamming the anthropic API
    - a 10 minute timer with a button to 'generate new' with the timer/expiry saved to local storage
- remove the generate answers, remove empty cells, force fill grid, reset answers and AI generate clues only when the app is being deployed

- implement this next:
  - ~~when an answer on the grid is selected, the corresponding clue should be highlighted~~ DONE
  - ~~tab cycles between highlighting clues with the same direction~~ DONE
  - ~~pressing tab when the last across or down clue has been reached causes the first down or across clue to be highlighted respectively~~
    - ~~the cycling is occuring in state now, but needs to show in UI~~ DONE
- ~~arrow keys are used to move between cells~~ DONE
  - ~~pressing right when there is a void to the right does nothing~~ DONE

## Setting focus on an input when we tab between clues
- we should be able to do as follows:
  - we already have a state value called selectedCell that references a CellType
    - this has an id prop which is a number
  - we can pass this to each SolveCell
  - when we are setting selectedCell, we take this value and if selectedCell.id equals the id on SolveCell then autoFocus is true
  - does this work?
    - NO - DOESN'T WORK! autofocus only works on first render.
### Another solution:
- one solution is to create a ref for every single input and hold this in an array using a ref
- <a href="https://stackoverflow.com/questions/65350114/useref-for-element-in-loop-in-react/65350394#65350394">Multiple Refs</a>
- every time selectedCell state changes, we call ref.current.focus() on the appropriate element in our array of refs
- ***THIS IS DONE***

## Todo 4/6/2024
~~- pressing delete removes the letter from the currently focused cell~~ DONE
  - ~~if there is no letter, it causes the previous cell to be focused~~
  - ~~if there is a letter, it removes the letter but the focus remains on that cell~~
  - ~~continuing to press delete when the first cell of an answer contains no letter has no effect~~
- ~~entering a letter into a cell, causes the focus to switch to the next cell in the clue (if there is one)~~ DONE
- if no clue/cell is selected, tab acts in the normal way
- display the hyphen on the grid for hyphenated words
- display a heavy border on the grid for spaces between words
  - perhaps even use a different color

## Issue 4/6/24
- when the user enters a letter into a cell (input), the focus switches but the letter is entered into the newly focussed cell instead of the old cell
  - inputs need to be linked with state
  - the letter is set in state and the input should then reflect the state
- update if checks for handleAlphaKey
  - if the cell to the right or below is void, then do not switch focus, 
    - you want to update the state of the current input, but not switch focus since we're at the end of the clue
***THIS IS FIXD***

## Functionality from Guardian Quick Crossword for A-Z keys
- if an input already has a value, and the user presses an alpha key, the existing value should be replaced
- one way to do this (ChatGPT), is to use a no-op for the onchange and to use onKeyDown
  - my existing code needs to be refactored so that my logic is moved from `handleInputChange` (the onChange handler) to `handleAlpha`
- the ChatGPT example:

```js
import React, { useState } from 'react';

const SingleLetterInput = () => {
  // Step 1: Initialize state
  const [inputValue, setInputValue] = useState('A');

  // Step 2: Create onKeyDown handler
  const handleKeyDown = (event) => {
    // Only consider alphabetic keys
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      setInputValue(event.key.toUpperCase());
      // Prevent the default behavior to avoid adding the character to the input value
      event.preventDefault();
    }
  };

  return (
    <div>
      {/* Step 3: Bind state to input */}
      <input 
        type="text" 
        value={inputValue} 
        onKeyDown={handleKeyDown} 
        onChange={() => {}} // no-op to prevent React warning for controlled component
        maxLength={1} // Optional: limit the input to a single character
      />
    </div>
  );
};

export default SingleLetterInput;

```

## Todo 6/6/24
- there are a number of buttons on the Guardian Quick
  - check all, reveal all, clear all
  - check all
    - when first clicked, the text changes to 'confirm check all'
      - when the user clicks again, it appears to remove letters that are incorrect
      - if the user fails to click after a time, the text reverts to 'check all'
      - the reveal all and clear all buttons behave in an identical way
- when there is nothing selected on the grid, the buttons 'check this,' 'reveal this,' and 'clear this' are not visible
  - when the user selects a clue, these buttons become visible/usable
***MOSTLY DONE***
- clicking reveal all, clear all and check all simply performs the action without presenting a further button to confirm the action

## Todo 10/6/24
- navigating away from the `solver` route resets the data
  - use local storage to initialize and save state
    - every time a change is made, state gets saved to a local storage
    - what state do we have?
      - gridState
      - clueList
      - selectedClue
      - selectedCell
      - cellRefs - this is a ref so let's implement our local storage logic and I think it should still work fine
    - let's place our state into an object like so:

```js  
  solver: {
  grid: gridState,
  clues: clueList,
  clueSelection: selectedClue,
  cellSelection: selectedCell
    }
```

***^^^ THIS IS DONE***

## User Interaction with Solver Page - regarding initialization
- user vists the page for the first time
  - there is no local storage
  - the grid must be initialized
  - the clues must be created
  - all the state gets initialized
  - when the state changes, we update local storage
- this automatic initialization of the crossword requires a request to the Claude Haiku API which will incur a financial cost to me
- there should be a disabled button with a timer to indicate when a new crossword can be generated
  - this solution will only work on users who don't program BUT
  - it should be sufficient since it is a portfolio project and is someone going to be a troll and spam the API?
- the user might want to select a crossword to solve, eg one that has been created in the editor?

- when the solver route first loads (no local storage)
  - the user is presented with a dropdown and a button and a blank crossword grid
    - we can hide the clue container as well or display an overlay to hide it
  - the button is to generate a new random crossword
    - this will be associated with a timer
  - the dropdown is to select an existing crossword from local storage
    - these will be stored crosswords created in the editor
    - selecting a crossword and hitting the 'load' button will set the state to this crossword
      - once a crossword is loaded, any progress on existing crosswords is lost in local storage
      - we may use a notifcation to warn the user and allow confirmation

## User interaction with the editor
- upon first visit
  - user is presented with the default empty grid 
  - they can edit the grid by toggling cells
  - ~~once 'Generate Answers' has been clicked, it should not be possible to toggle cells~~ DONE
    - ~~we can disable toggling cells based on: `clueList[0].answer.includes("")`~~ DONE
- ~~generate answers becomes grayed out/disabled once answers have been generated~~ DONE
- create a timer for the AI generate clues button
- ~~add a save button that saves the grid, answers, and generated clues in local storage~~ DONE
  - ~~when saved, the state should be reset~~ DONE
  - ~~we use a local storage key called `editor` to hold work in progress~~ DONE
    - ~~when saved, the `editor` local storage is emptied~~ DONE
  - ~~when saved, the user provides a name for their puzzle and it gets stored in local storage in a `puzzles` object under the name the user provides~~ DONE
- ~~when the app initializes, we retrieve the puzzles from local storage and provide them in a select input so they can load them up in the solver~~ DONE
  - ~~use a dropdown~~ DONE
- use something like reacttour to add tips/hints to the user on how to interact with the app
- in the editor - we currently get an alert error if we edit the grid, generate clues and then hit the AI Generate Clues! button. This is because we are returning dummy data from our serverless function and this response is based on an unedited grid. This means clue lengths may be different or the number of clues may be different and so we get an error: nothing to worry about!


## Issue 12/6/24
- navigating away from create/edit resets the clueList, but the answers remain on the screen
  - the onscreen letters come from gridState (which is not reset by navigating away and back)
- investigate later today!
***Fixed***

## Local storage Structure
- this is currently a bit messy and disorganized
- let's try:

```js
solver: {
  grid,
  clues,
  cellSelection,
  clueSelection,
},
editor: {
  grid,
  clues,
  isModified
  // really we need the other state too but it's not wholly necessary
  // example, user might input name but not click save and then navigate away, navigate back and the name field is blank
},
puzzles: [{
    name,
    grid,
    clues,
  },
  {
    name,
    grid,
    clues,
  }] // saved puzzles
```
***DONE***