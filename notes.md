## GUIDE

- Users are given jumbled up words and they must click on the letters to rearrange the words in correct order
- There are 2 game modes level up + 5 letter countdown
- level up starts at 3 letters, each time the user get a correct answer they move up to the next level, completing at 10 letters. The timer renews at each level.
- 5 letter countdown runs a clock for 2 minutes and the user must so as many panagrams as possible in the given time. 

## Level Up Mode

- Create an object that has keys for 3 - 9 letter words
- create a function that pulls for desired array, loops through this array and stores this item in a variable (x)
- convert x to an array and then randomise the order of this array (ensure it is not the same as original or too similar) 
- Dynamically render this array to page with each letter as a button with a data id of x value.
- When user clicks buttons the data ID is pushed to an array (y) and clicked button is greyed out
- When user clicks submit button y === x ? check is made, if correct user levels up, if not y / grey buttons / displayed answer is cleared
- if time runs out modals appears stating level achieved / if user completes level 10 then game ends and modal appears congratulating
- User enters initials and submits to save to high scores list / this is logged to local storage / high scores list is present on seperate page

## Features

- Welcome message saying to unjumble the word
- Array renders to page in a crisp animated way
- Modal appears with score and revealing the answer
- scores are logged to local storage and high scores are get and set to a seperate page

## To Do

- continue development of winning / losing logic - Add delete button / add animation on win (jumbled buttons turn to unjumbled solution and turn green / pulsate?/)
- Fix shuffle issue (sometimes displays the solution non shuffled)
- Add timer?
- Fix functiosn together for different length words


-- next

Change win animation from guess to solution then visual stretch and colour change
create lose animation with buttons flashing red