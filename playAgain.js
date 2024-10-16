const message = document.querySelector("#ending-message");
const playAgainBtn = document.querySelector("#play-again");
const myWord = localStorage.getItem("myWord");
const pokedexNum = localStorage.getItem("pokedexNum");
const gameWon = JSON.parse(localStorage.getItem("gameWon"));

fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("data: ", data);
            const frontSprite = data.sprites.front_default;
            const latestCry = data.cries.latest;
            const legacyCry = data.cries.legacy;
            console.log(frontSprite);
            const pokemonSprite = document.querySelector("#pokemon-sprite");
            pokemonSprite.setAttribute("src", frontSprite);
            const pokemonCry = document.querySelector("#pokemon-cry");
            pokemonCry.setAttribute("src", latestCry); 
            const audioElement = document.querySelector("audio");
            audioElement.load();
            audioElement.play();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

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