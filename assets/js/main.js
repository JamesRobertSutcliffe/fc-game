import words from "./words.js"


// GETSOLUTION FUNCTION PROVIDES THE SOLUTION WORDS //

let solution = ""
const getSolution = (wordNumArr) => {
    let x = Math.floor(Math.random() * (wordNumArr.length - 1))
    solution = wordNumArr[x].toUpperCase()
}

getSolution(words.nine)
console.log(solution)

// JUMBLESOLUTION FUNCTION SHUFFLES THE SELECTED SOLUTION USING THE "Durstenfeld shuffle algorithm" //

const jumbleSolution = (solution) => {
    let splitSolution = solution.split('')
    for (var i = splitSolution.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = splitSolution[i];
        splitSolution[i] = splitSolution[j];
        splitSolution[j] = temp;
    }
    let jumbledSolution = splitSolution.join('')

    if ((jumbledSolution === solution) || (jumbledSolution === undefined)) {
        jumbleSolution(solution)
    } else {

        return jumbledSolution
    }
};

console.log(jumbleSolution(solution));


