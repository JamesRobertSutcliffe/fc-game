const jumbleSolution = (solution) => {
    let jumbledSolution = "";
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
    } else {
        jumbledSolution = joinedJumbledSolution;
        return `${solution} => ${jumbledSolution}`;
    }
};

console.log(jumbleSolution("mister"), jumbleSolution("can"), jumbleSolution("rant"), jumbleSolution("lamp"), jumbleSolution("musician"))