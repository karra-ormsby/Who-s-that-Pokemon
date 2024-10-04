const mainElement = document.querySelector("main");
const hangman = document.querySelector(".hangman");
const guessingField = document.querySelector(".guessing-field");
const guess = document.querySelector(".guess");
const topRail = document.querySelector(".top-rail");
const noose = document.querySelector(".noose");
const pole = document.querySelector(".pole");
const floor = document.querySelector(".floor");
const head = document.querySelector(".head");
const body = document.querySelector(".body");
const armLeft = document.querySelector(".arm-left");
const armRight = document.querySelector(".arm-right");
const legLeft = document.querySelector(".leg-left");
const legRight = document.querySelector(".leg-right");


let blankArray = [];
let blankWord;
let myWord;
let incorrectGuess;
let gameCompeted;

const gen1 = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbrow", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exegutor", "cubone", "marowak", "hitmonlee", "hitonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

//funtion that is called when the page loads to 'set up' the game
function init() {
    incorrectGuess = 0;
    blankArray = [];
    gameCompeted = false;
    chooseWord();
    renderBlanks();
};

//function to choose a random ny=umber from 1 to lengnth of array of possible words
//TODO: change gen1 to choosenGen (where choosenGen will be equal to the array that the user picks)
function chooseWord () {
    myWord = gen1[Math.floor(Math.random() * gen1.length)];
    console.log(myWord);
};

//function to turn myWord into an array of blanks that will be displayed as the 'word' to the user
//then display the array as a string to the user
function renderBlanks() {
    for(let i = 0; i < myWord.length; i++) {
        blankArray[i] = "_";
    };

    blankWord = blankArray.join(" ");
    guessingField.textContent = blankWord;
}

//function that checks the letter guessed by the uer against the selected word
//if the correct letter is gussed it will replace the '_' at it's loaction and be rendered to the document
//the function then checks if the user has guessed all letters in the word
//if the letter gusssed is incorrect it runs the wrongGuess function
function checkWord() {
    if(!gameCompeted) {
        const letter = event.key;
        let correctGuess = false;

        for(let i = 0; i < myWord.length; i++) {
            if (myWord[i] === letter) {
                correctGuess = true;
                blankArray[i] = letter;
                guessingField.textContent =  blankArray.join(" ");
            }
        }
        if (!correctGuess) {
            incorrectGuess ++;
            wrongGuess();
        } else {
            const blankword = blankArray.join("");
            if (blankword === myWord) {
                gameWin();
            }
        }
    }
};

//renders the parts to the hangman the corresponds to how many incorrect guesses have occured
//if the user has reached the max number of incorrect guesses then the game is over
function wrongGuess() {
        switch (incorrectGuess) {
            case 1:
                console.log("head");
                head.classList.remove("hidden");
                break;
            case 2:
                console.log("body");
                body.classList.remove("hidden");
                break;
            case 3:
                console.log("left arm");
                armLeft.classList.remove("hidden");
                break;
            case 4:
                console.log("right atm");
                armRight.classList.remove("hidden");
                break;
            case 5:
                console.log("left leg");
                legLeft.classList.remove("hidden");
                break;
            case 6:
                console.log("right lef");
                legRight.classList.remove("hidden");
                break;
            case 7:
                console.log("noose");
                noose.classList.remove("hidden");
                break;
            case 8:
                console.log("top pole");
                topRail.classList.remove("hidden");
                break;
            case 9:
                console.log("pole");
                pole.classList.remove("hidden");
                break;
            case 10:
                console.log("floor");
                floor.classList.remove("hidden");
                gameOver()
                break;
        }
};

//function that when the correct answer is reached, it renders a new page, tells the user the answeran offers to let the uer play again
//TODO: game still take user. Will continue to run checkWord and either run gameWin or increment incorrectGuess and run gameOver when incorrectGuess reaches 10
function gameWin() {
    gameCompeted = true;
    guessingField.innerHTML = '';
    hangman.innerHTML = '';
    const winner = document.createElement("p");
    winner.textContent = "You're a winner!";
    guessingField.appendChild(winner);
    renderReset();
};

//function that once max inccorect guesses is reached, it renders a new page, tells the user the answeran offers to let the uer play again
function gameOver() {
    gameCompeted = true;
    guessingField.innerHTML = "";
    hangman.innerHTML = '';
    const answer = document.createElement("p");
    answer.textContent = `The correct answer was ${myWord}. Better luck next time.`;
    guessingField.appendChild(answer);
    renderReset();
};

//function that creates a reset button for the game and adds and event listerner to it
function renderReset() {
    const resetBtn = document.createElement("div");
    resetBtn.setAttribute("class", "reset");
    resetBtn.textContent = "Play Again?";
    guessingField.appendChild(resetBtn);
    const playAgain = document.querySelector(".reset");
    playAgain.addEventListener("click", init);
};

init(); 

document.addEventListener("keypress", checkWord);