const mainElement = document.querySelector("main");
const hangman = document.querySelector(".hangman");
const guessingField = document.querySelector(".guessing-field");
const guess = document.querySelector(".guess");

let blankArray = [];
let blankWord;
let myWord;
let incorrectGuess;
let gameCompeted;
let hangmanElements;

const gen1 = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbrow", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exegutor", "cubone", "marowak", "hitmonlee", "hitonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

//funtion that is called when the page loads to 'set up' the game
function init() {
    gameEnd.innerHTML = "";
    incorrectGuess = 0;
    blankArray = [];
    gameCompeted = false;
    chooseWord();
    renderBlanks();
    hangmanElements = createHangman();
};

//chooses a random ny=umber from 1 to lengnth of array of possible words
//TODO: change gen1 to choosenGen (where choosenGen will be equal to the array that the user picks)
function chooseWord () {
    myWord = gen1[Math.floor(Math.random() * gen1.length)];
    console.log(myWord);
};

//turn myWord into an array of blanks that will be displayed as the 'word' to the user
//then display the array as a string to the user
function renderBlanks() {
    for(let i = 0; i < myWord.length; i++) {
        blankArray[i] = "_";
    };

    blankWord = blankArray.join(" ");
    guessingField.textContent = blankWord;
}

//checks the letter guessed by the uer against the selected word
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
                hangmanElements.head.classList.remove("hidden"); 
                break;
            case 2:
                hangmanElements.body.classList.remove("hidden");
                break;
            case 3:
                hangmanElements.armLeft.classList.remove("hidden");
                break;
            case 4:
                hangmanElements.armRight.classList.remove("hidden");
                break;
            case 5:
                hangmanElements.legLeft.classList.remove("hidden");
                break;
            case 6:
                hangmanElements.legRight.classList.remove("hidden");
                break;
            case 7:
                hangmanElements.noose.classList.remove("hidden");
                break;
            case 8:
                hangmanElements.topRail.classList.remove("hidden");
                break;
            case 9:
                hangmanElements.pole.classList.remove("hidden");
                break;
            case 10:
                hangmanElements.floor.classList.remove("hidden");
                gameOver()
                break;
        }
};

const gameEnd = document.createElement("p");

//when the correct answer is reached, it renders a new page, tells the user the answeran offers to let the uer play again
function gameWin() {
    gameCompeted = true;
    guessingField.innerHTML = "";
    hangmanElements.figureField = "";
    gameEnd.textContent = "You're a winner!";
    mainElement.appendChild(gameEnd);
    renderReset();
};

//once max inccorect guesses is reached, it renders a new page, tells the user the answeran offers to let the uer play again
function gameOver() {
    gameCompeted = true;
    guessingField.innerHTML = "";
    hangmanElements.figureField.innerHTML = "";
    gameEnd.textContent = `The correct answer was ${myWord}. Better luck next time.`;
    mainElement.appendChild(gameEnd);
    renderReset();
};

//creates a reset button for the game and adds and event listerner to it
function renderReset() {
    const resetBtn = document.createElement("div");
    resetBtn.setAttribute("class", "reset");
    resetBtn.textContent = "Play Again?";
    guessingField.appendChild(resetBtn);
    const playAgain = document.querySelector(".reset");
    playAgain.addEventListener("click", init);
};

//creates the hangman and gives it the class hidden so that the parts of the hangman are hidden until an incorrect guess happens
function createHangman() {
    const figureField = document.createElement("div");
    figureField.setAttribute("class", "hangman");
    const topRail = document.createElement("div");
    topRail.setAttribute("class", "top-rail hidden hidden");
    const noose = document.createElement("div");
    noose.setAttribute("class", "noose hidden");
    const pole = document.createElement("div");
    pole.setAttribute("class", "pole hidden");
    const floor = document.createElement("div");
    floor.setAttribute("class", "floor hidden");
    const head = document.createElement("div");
    head.setAttribute("class", "head hidden");
    const body = document.createElement("div");
    body.setAttribute("class", "body hidden");
    const armLeft = document.createElement("div");
    armLeft.setAttribute("class", "arm-left hidden");
    const armRight = document.createElement("div");
    armRight.setAttribute("class", "arm-right hidden");
    const legLeft = document.createElement("div");
    legLeft.setAttribute("class", "leg-left hidden");
    const legRight = document.createElement("div");
    legRight.setAttribute("class", "leg-right hidden");

    figureField.appendChild(topRail);
    figureField.appendChild(noose);
    figureField.appendChild(pole);
    figureField.appendChild(floor);
    figureField.appendChild(head);
    figureField.appendChild(body);
    figureField.appendChild(armLeft);
    figureField.appendChild(armRight);
    figureField.appendChild(legLeft);
    figureField.appendChild(legRight);

    mainElement.appendChild(figureField);

     return {
        figureField,
        topRail,
        noose,
        pole,
        floor,
        head,
        body,
        armLeft,
        armRight,
        legLeft,
        legRight
    };

};

init(); 

document.addEventListener("keypress", checkWord);