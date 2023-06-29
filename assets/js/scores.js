const nameColumn = document.getElementById('name')
const scoreColumn = document.getElementById('score')

let scoresObject = JSON.parse(localStorage.getItem("scores"))

console.log(scoresObject)

for (x in scoresObject) {
    let score = scoresObject[x]
    const nameText = document.createElement('h3');
    const scoreText = document.createElement('h3');
    nameText.textContent = x;
    scoreText.textContent = score;
    nameColumn.append(nameText);
    scoreColumn.append(scoreText);
}