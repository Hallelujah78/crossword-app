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

```js
// clue.answer is ['L', '','O','','O','']
const letterIndex = [];
const patterns = [];
for(const letter in clue.answer){
if(letter){
letterIndex.push(clue.answer.indexOf(letter))
}
}
for(const index in letterIndex){
  const tempAnswer = [...clue.answer];
  patterns.push(tempAnswer[index] = "");
}


```