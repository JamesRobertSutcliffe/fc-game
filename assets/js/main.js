import words from "./words.js"

let solution = ""
let jumbledSolution = ""

// GETSOLUTION FUNCTION PROVIDES THE SOLUTION WORDS //

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
    let joinedJumbledSolution = splitSolution.join('')

    if ((joinedJumbledSolution === solution) || (joinedJumbledSolution === undefined)) {
        jumbleSolution(solution)
    }

    jumbledSolution = joinedJumbledSolution;
    return jumbledSolution
};

console.log(jumbleSolution(solution));

const renderJumbledSolution = () => {

    let jumbledArr = [...jumbledSolution]
    for (var y = 0; y < jumbledArr.length; y++) {
        const panContainer = document.getElementById('pan-container');
        const charButton = document.createElement('button');
        charButton.textContent = jumbledArr[y]
        panContainer.appendChild(charButton)
    }
}

renderJumbledSolution()

