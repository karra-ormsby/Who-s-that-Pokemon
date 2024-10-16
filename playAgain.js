const message = document.querySelector("#ending-message");
const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");
const gameWon = JSON.parse(localStorage.getItem("gameWon"));
const pokemonSprite = document.querySelector("#pokemon-sprite");
const pokemonCry = document.querySelector("#pokemon-cry");
const audioElement = document.querySelector("audio");

pokemonSprite.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNum}.png`);
pokemonCry.setAttribute("src", `https://veekun.com/dex/media/pokemon/cries/${pokedexNum}.ogg`);

// Load and play the audio
audioElement.load();
audioElement.play();

if (gameWon) {
    message.textContent = "Congratulations you won!";
} else {
    message.textContent = `You loose. The answer was ${myWord}!`;
}

function playAgain() {
    localStorage.clear();
    location.replace("./index.html");
};

playAgainBtn.addEventListener("click", playAgain)