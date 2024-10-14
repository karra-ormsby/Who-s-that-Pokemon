const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");


const pokemonSprite = document.createElement("img");
document.querySelector("main").prepend(pokemonSprite);
pokemonSprite.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNum}.png`);

if (myWord && myWord.length > 0) {
    const answer = document.querySelector("#answer");
    answer.textContent = myWord;
}

function playAgain() {
    localStorage.clear();
    location.replace("./index.html");
};

playAgainBtn.addEventListener("click", playAgain)