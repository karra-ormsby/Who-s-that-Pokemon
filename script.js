const guessingField = document.querySelector(".guessing-field");
const blankArray = [];
const chosenWordArray = [];
//TODO: this needs to be in the function that starts the game
let incorrectGuess = 0;
let blankWord;
let myWord;

const gen1 = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbrow", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exegutor", "cubone", "marowak", "hitmonlee", "hitonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

//funtion that is called when the page loads to 'set up' the game
function init() {
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
//if the letter gusssed is incorrect it runs the wrongGuess function
function checkWord() {
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
    }
};

//renders the parts to the hangman the corresponds to how many incorrect guesses have occured
//if the user has reached the max numbr of incorrect guesses then the game is over
function wrongGuess() {
        switch (incorrectGuess) {
            case 1:
                console.log("head");
                break;
            case 2:
                console.log("body");
                break;
            case 3:
                console.log("left arm");
                break;
            case 4:
                console.log("right atm");
                break;
            case 5:
                console.log("left leg");
                break;
            case 6:
                console.log("right lef");
                break;
            case 7:
                console.log("noose");
                break;
            case 8:
                console.log("top pole");
                break;
            case 9:
                console.log("pole");
                break;
            case 10:
                console.log("floor");
                gameOver()
                break;
        }
};

//function that once max inccorect guesses in reached, it renders a new page an offers to let the uer play again
function gameOver() {
    console.log(`the word was ${myWord}. Would you like to play again?`);
    guessingField.innerHTML = "";
    const resetBtn = document.createElement("div");
    resetBtn.setAttribute("class", "reset");
    resetBtn.textContent = "Play Again?";
    guessingField.appendChild(resetBtn);
    const playAgain = document.querySelector(".reset");
    playAgain.addEventListener("click", init);
};


init(); 

document.addEventListener("keypress", checkWord);