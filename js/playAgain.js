const home = document.querySelector("#home");
const message = document.querySelector("#ending-message");
const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");
const gameWon = JSON.parse(localStorage.getItem("gameWon"));

async function getPokemonData(pokedexNum) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}/`);
        
        //lets us know if the api was found or not
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const frontSprite = data.sprites.front_default;
        const latestCry = data.cries.latest;
        //displays the pokemon sprite to the page
        const pokemonSprite = document.querySelector("#pokemon-sprite");
        pokemonSprite.setAttribute("src", frontSprite);
        pokemonSprite.setAttribute("alt", myWord);
        //loads the pokemon cry to the page
        const pokemonCry = document.querySelector("#pokemon-cry");
        pokemonCry.setAttribute("src", latestCry);
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

//when the user clicks the home button the local storage is cleared and the user goes back to the landing page
function goHome() {
    localStorage.clear();
    location.replace("./index.html");
};

home.addEventListener("click", goHome);

//when the user clicks the 'play again' button the local storage is cleared and the user goes back to the landing page
function playAgain() {
    localStorage.clear();
    location.replace("./index.html");
};

playAgainBtn.addEventListener("click", playAgain)