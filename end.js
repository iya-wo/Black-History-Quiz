const username = document.querySelector("#usrname");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault; /* this allows us to click a button so it does not automatically refresh*/

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(
    5
  ); /* removes elements from an array and inserts new elements in their place if necessary */
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
