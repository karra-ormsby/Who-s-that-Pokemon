const message = document.querySelector("#ending-message");
const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");
const gameWon = JSON.parse(localStorage.getItem("gameWon"));

async function getPokemonData(pokedexNum) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}/`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const frontSprite = data.sprites.front_default;
        const latestCry = data.cries.latest;
        //displays the pokemon sprite to the page
        const pokemonSprite = document.querySelector("#pokemon-sprite");
        pokemonSprite.setAttribute("src", frontSprite);
        //loads the pokemon cry to the page
        const pokemonCry = document.querySelector("#pokemon-cry");
        pokemonCry.setAttribute("src", latestCry);
        const audioElement = document.querySelector("audio");
        //play the pokemon cry
        audioElement.load();
        audioElement.play();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

getPokemonData(pokedexNum);

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