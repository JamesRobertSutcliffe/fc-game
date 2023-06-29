import words from "./words.js"

const clearButton = document.querySelector('#delete');
const timerDOM = document.getElementById("timer");
const levelRender = document.getElementById("level");
const panContainer = document.getElementById('pan-container');
const solutionBucket = document.getElementById('solution');
let solution = "";
let solutionArray = [];
let jumbledSolution = "";
let guess = [];
let level = 3;
let levelUp = false;
let levelText = `Level ${level}`;


// GAME LOGIC FUNCTIONS //

// GETSOLUTION FUNCTION PROVIDES THE SOLUTION WORDS //

const getSolution = (wordNumArr) => {
    let x = Math.floor(Math.random() * (wordNumArr.length - 1))
    solution = wordNumArr[x].toUpperCase()
    solutionArray.push(solution);
}

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

// RENDERJUMBLEDSOLUTION FUNCTION RENDERS THE JUMBLED SOLUTION TO THE PAGE AS BUTTONS

const renderJumbledSolution = (jumbledSolution) => {

    let jumbledArr = [...jumbledSolution]
    for (var y = 0; y < jumbledArr.length; y++) {
        const panContainer = document.getElementById('pan-container');
        const charButton = document.createElement('button');
        charButton.id = "guess-input";
        charButton.classList.add('button-intro')
        charButton.setAttribute('data-id', jumbledArr[y])
        charButton.textContent = jumbledArr[y]
        panContainer.appendChild(charButton)
    }
};

// BUILDGUESS FUNCTION CREATES THE USERS GUESS

const buildGuess = () => {
    const guessButton = document.querySelectorAll('#guess-input')
    const solutionBucket = document.getElementById('solution')
    guessButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.target.classList.add('selected');
            e.target.disabled = true;
            (guess[0] === " ") ? guess = [] : guess = guess;
            guess.push(e.target.getAttribute("data-id"))
            solutionBucket.textContent = guess.join('');
            checkGameState();
            solutionBucket.textContent = guess.join('');
        })
    });
}

// RENDERSOLUTION re-renders the solution onto page in button format on win

const renderSolution = (solution, addClass) => {
    for (var y = 0; y < solution.length; y++) {
        const panContainer = document.getElementById('pan-container');
        const charButton = document.createElement('button');
        charButton.id = "guess-input";
        charButton.classList.add(addClass)
        charButton.textContent = solution[y]
        panContainer.appendChild(charButton)
    }
};

// FLASH RED FLASHES RED ANIMATION ON INCORRECT GUESS

const flashRed = () => {
    const guessButton = document.querySelectorAll('#guess-input')
    guessButton.forEach((btn) => {
        btn.classList.remove('selected');
        btn.classList.add('incorrect')
        btn.disabled = false;
    });
    setTimeout(() => {
        guessButton.forEach((btn) => {
            btn.classList.remove('button-intro');
            btn.classList.remove('incorrect');
        });
    }, 1000)
}

// CHECKGAMESTATE FUNCTION LOGS WHETHER GAME IS WON OR LOST AND SETS NEXT PHASE

const checkGameState = () => {
    if (guess.join('') === solution) {
        levelUp = true;
        panContainer.innerHTML = ""
        renderSolution(solution, "selected-win")
        clearButton.disabled = true;
        level += 1;
        guess = [" "];
        console.log(level)
        if (level < 10) {
            setTimeout(() => {
                panContainer.innerHTML = ""
                countGame();
                clearButton.disabled = false;
            }, 4000)
        } if (level === 10) {
            winModalRender();
            setTimeout(() => {
                winModal.showModal();
            }, 4000)
        };
    } else if (guess.join('') !== solution && guess.join('').length === solution.length) {
        guess = [""];
        flashRed();
    }
}

// CLEARS CURRENT GUESS ON BUTTON PRESS

clearButton.addEventListener('click', () => {
    const guessButton = document.querySelectorAll('#guess-input')
    const solutionBucket = document.getElementById('solution')
    guess = [];
    guessButton.forEach((btn) => {
        btn.classList.remove('selected');
        btn.disabled = false;
    });
    solutionBucket.textContent = " ";
})

// GAME LOSE / WIN DISPLAYS MODAL ON COUNTDOWN EXPIRY OR GAME COMPLETION

const gameLose = () => {
    console.log("You lose!");
    panContainer.innerHTML = "";
    clearButton.disabled = true;
    solutionBucket.textContent = " "
    // First use render solution function that appears as red // 
    renderSolution(solution, "lose")
    // Then modal appears stating game over / level / words completeted //
    loseModalRender();
    // prompt to submit high scores // 
    // Link to high scores page or to play again // 
};

// Countdown displays timer and defines whether game is lost or to move up to next level

const countdownTimer = () => {
    var timer = Math.min(30, 60);
    var countdownInterval = setInterval(function () {
        timerDOM.textContent = "00:" + (timer < 10 ? "0" + timer : timer);
        timer < 11 ? timerDOM.classList.add("timer-red") : timerDOM.classList.remove("timer-red");
        if (--timer < 0) {
            clearInterval(countdownInterval);
            gameLose();
            setTimeout(() => {
                loseModal.showModal();
            }, 4000)
        } if (levelUp === true) {
            clearInterval(countdownInterval);
            levelUp = false;
        }
    }, 1000);
}

// LEVEL DISPLAY displays correct level on page

const levelDisplay = () => {
    levelText = `Level ${level}`
    levelRender.innerHTML = levelText;
}

// LEVELS NAVIGATION

const countGamePlay = (level) => {
    getSolution(level);
    jumbleSolution(solution);
    renderJumbledSolution(jumbledSolution);
    levelDisplay();
    countdownTimer();
    buildGuess();
    console.log(solution, solutionArray);
};

const countGame = () => {
    switch (level) {
        case 3:
            panContainer.innerHTML = ""
            clearButton.classList.remove('hide');
            countGamePlay(words.three);
            break;
        case 4:
            countGamePlay(words.four);
            break;
        case 5:
            countGamePlay(words.five);
            break;
        case 6:
            countGamePlay(words.six);
            break;
        case 7:
            countGamePlay(words.seven);
            break;
        case 8:
            countGamePlay(words.eight);
            break;
        case 9:
            countGamePlay(words.nine);
            break;
    }
}

// MODALS LOGIC

const winModal = document.getElementById('win-modal');
const closeWinModal = document.getElementById('win-modal-close');
const loseModal = document.getElementById('lose-modal');
const closeLoseModal = document.getElementById('lose-modal-close');
const winSolutionList = document.getElementById('win-solution-list');
const loseSolutionList = document.getElementById('lose-solution-list');
const levelReached = document.getElementById('level-reached');

const winModalRender = () => {
    winNameSubmit.value = "";
    let solutions = ""
    for (let i = 0; i < solutionArray.length; i++) {
        solutions += solutionArray[i] + " "
        winSolutionList.textContent = "YOUR SOLUTIONS: " + solutions;
    }
}

const loseModalRender = () => {
    loseNameSubmit.value = "";
    let solutions = "";
    levelReached.textContent = `You reached level ${level}!`;
    for (let i = 0; i < solutionArray.length; i++) {
        solutions += solutionArray[i] + " "
        solutionArray.length > 1 ? loseSolutionList.textContent = "YOUR SOLUTIONS: " + solutions : loseSolutionList.textContent = "YOUR SOLUTION: " + solutions;
    }
}

closeWinModal.addEventListener('click', () => {
    winModal.close();
})

closeLoseModal.addEventListener('click', () => {
    loseModal.close();
})

// High Scores / Local Storage

const submitScores = document.querySelectorAll('#submit-score')
const loseNameSubmit = document.getElementById('lose-name');
const winNameSubmit = document.getElementById('win-name');
const regexAlpha = /^[A-Za-z]+$/;
const localStorageMessage = document.querySelectorAll('#local-storage-message')

// Submit buttons are looped through and push scores to local storage if initials are valid

submitScores.forEach(i => {
    i.addEventListener("click", (e) => {
        e.preventDefault()
        if ((level < 10) && (regexAlpha.test(loseNameSubmit.value) !== true) || (level === 10) && (regexAlpha.test(winNameSubmit.value) !== true)) {
            alert("Please enter a single word with letters only :)")
            loseNameSubmit.value = "";
            winNameSubmit.value = "";
        } else {
            let scoresObject = JSON.parse(localStorage.getItem("scores")) || {};
            level === 10 ? scoresObject[winNameSubmit.value] = level : scoresObject[loseNameSubmit.value] = level
            localStorage.setItem("scores", JSON.stringify(scoresObject));
            loseNameSubmit.value = "";
            winNameSubmit.value = "";
            loseNameSubmit.disabled = true;
            winNameSubmit.disabled = true;
            e.target.disabled = true;
            localStorageMessage.forEach(i => {
                i.textContent = "Name and level added to high scores list!"
                setTimeout(() => {
                    i.textContent = ""
                }, 2000)
            })
        }
    })
});

// START GAME

const startButton = document.getElementById("start-game")
startButton.addEventListener('click', countGame)





