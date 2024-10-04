const guessingField = document.querySelector(".guessing-field");
const blankArray = [];
const chosenWordArray = [];
//TODO: this needs to be in the function that starts the game
let incorrectGuess = 0;
let blankWord

const gen1 = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbrow", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exegutor", "cubone", "marowak", "hitmonlee", "hitonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];


//function to choose a random ny=umber from 1 to lengnth of array of possible words
//TODO: change gen1 to choosenGen (where choosenGen will be equal to the array that the user picks)
function chooseWord () {
    const myWord = gen1[Math.floor(Math.random() * gen1.length)];
};
chooseWord();
console.log(myWord);

//function to turn myWord into an array of blanks that will be displayed as the 'word' to the user
//then display the array as a string to the user
function renderBlanks() {
    for(let i = 0; i < myWord.length; i++) {
        blankArray[i] = "_";
    };

    blankWord = blankArray.join(" ");
    guessingField.textContent = blankWord;
}

renderBlanks();

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
                console.log("floor. You loose!");
                break;
        }
};

function init() {

};

document.addEventListener("keypress", checkWord);