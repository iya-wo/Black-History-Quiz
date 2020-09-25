const highScoresList = document.querySelector("#highScoresList");
const highScores =
  JSON.parse(localStorage.getItem("highScores")) ||
  []; /*get the high scores from local storage or a empty array*/

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
