import words from "./words.js"

let solution = ""
let jumbledSolution = ""
let guess = []

// GAME LOGIC FUNCTIONS

// GETSOLUTION FUNCTION PROVIDES THE SOLUTION WORDS //

const getSolution = (wordNumArr) => {
    let x = Math.floor(Math.random() * (wordNumArr.length - 1))
    solution = wordNumArr[x].toUpperCase()
}
getSolution(words.six)
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

// RENDERJUMBLEDSOLUTION FUNCTION RENDERS THE JUMBLED SOLUTION TO THE PAGE AS BUTTONS

const renderJumbledSolution = (jumbledSolution) => {

    let jumbledArr = [...jumbledSolution]
    for (var y = 0; y < jumbledArr.length; y++) {
        const panContainer = document.getElementById('pan-container');
        const charButton = document.createElement('button');
        charButton.id = "guess-input";
        charButton.setAttribute('data-id', jumbledArr[y])
        charButton.textContent = jumbledArr[y]
        panContainer.appendChild(charButton)
    }

};
renderJumbledSolution(jumbledSolution)

// BUILDGUESS FUNCTION CREATES THE USERS GUESS

const buildGuess = () => {
    const guessButton = document.querySelectorAll('#guess-input')
    const solutionBucket = document.getElementById('solution')
    guessButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.target.classList.add('selected');
            e.target.disabled = true;
            if (guess[0] === "- - -") {
                guess = []
            }
            guess.push(e.target.getAttribute("data-id"))
            solutionBucket.textContent = guess.join('');
            checkGameState();
            solutionBucket.textContent = guess.join('');
            console.log(guess)
        })
    });
    console.log(guessButton)
}

const checkGameState = () => {
    const guessButton = document.querySelectorAll('#guess-input')
    if (guess.join('') === solution) {
        console.log("You win!")
        guessButton.forEach((btn) => {
            btn.classList.add('selected-win');
        });
    } else if (guess.join('') !== solution && guess.join('').length === solution.length) {
        console.log("incorrect!")
        guess = ["- - -"];
        guessButton.forEach((btn) => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
    }
}

buildGuess()



