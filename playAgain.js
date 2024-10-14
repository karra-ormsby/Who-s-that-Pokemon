const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");
const pokemonSprite = document.querySelector("#pokemon-sprite");
const pokemonCry = document.querySelector("#pokemon-cry");
const audioElement = document.querySelector("audio");

pokemonSprite.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNum}.png`);
pokemonCry.setAttribute("src", `https://veekun.com/dex/media/pokemon/cries/${pokedexNum}.ogg`);

// Load and play the audio
audioElement.load();
audioElement.play();

if (myWord && myWord.length > 0) {
    const answer = document.querySelector("#answer");
    answer.textContent = myWord;
}

function playAgain() {
    localStorage.clear();
    location.replace("./index.html");
};

playAgainBtn.addEventListener("click", playAgain)