const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");

if (myWord && myWord.length > 0) {
    const answer = document.querySelector("#answer");
    answer.textContent = myWord;
}

function playAgain() {
    localStorage.clear();
    location.replace("./index.html");
};

playAgainBtn.addEventListener("click", playAgain)