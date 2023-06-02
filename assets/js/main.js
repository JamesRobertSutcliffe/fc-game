import words from "./words.js"


// GETSOLUTION FUNCTION PROVIDES THE SOLUTION WORDS

let solution = ""
function getSolution(wordNumArr) {
    var x = Math.floor(Math.random() * (wordNumArr.length - 1))
    solution = wordNumArr[x]
}

getSolution(words.three)

console.log(solution)
