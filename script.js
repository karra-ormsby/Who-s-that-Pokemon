const mainElement = document.querySelector("main");
const hangman = document.querySelector(".hangman");
const guess = document.querySelector(".guess");

let blankArray = [];
let blankWord;
let myWord;
let userChoice;
let chooseGen;
let incorrectGuess;
let gameCompeted;
let guessingField;
let hangmanElements;

const gen1 = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbrow", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exegutor", "cubone", "marowak", "hitmonlee", "hitonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

const gen2 = [
  "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "hooh", "celebi"
];

const gen3 = [
  "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "surskit", "masquerain", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "registeel", "regice", "regirock", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys"
];

const gen4 = [
  "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roselia", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "misdreavus", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "chimecho", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mimejr", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "sylveon", "porygonz", "gardevoir", "gallade", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus"
];


//----------------------------creates and runs the landing page------------------------------//

//TODO: add comments to these functions

const genCards = document.querySelectorAll(".card");
for (let i = 0; i < genCards.length; i++) {
    let gen = genCards[i];
    let genId = gen.id;

    gen.addEventListener("click", function () {
    getGen(genId);
});

};

//TODO: when going into startGame cannot get the cards to dissapear
function getGen(id) {
    switch(id) {
        case "gen1":
            userChoice = gen1;
            startGame(userChoice);
            break;
        case "gen2":
            userChoice = gen2;
            startGame(userChoice); 
            break;
        case "gen3":
            userChoice = gen3;
            startGame(userChoice); 
            break;
        case "gen4":
            userChoice = gen4;
            startGame(userChoice); 
            break;
    }
};

function createCards() {
    chooseGen = document.createElement("div");
    chooseGen.setAttribute("class", "choose-gen");
    const gen1 = document.createElement("div");
    gen1.setAttribute("class", "card");
    gen1.setAttribute("id", "gen1");
    gen1.textContent = "gen1";
    const gen2 = document.createElement("div");
    gen2.setAttribute("class", "card");
    gen2.setAttribute("id", "gen2");
    gen2.textContent = "gen2";
    const gen3 = document.createElement("div");
    gen3.setAttribute("class", "card");
    gen3.setAttribute("id", "gen3");
    gen3.textContent = "gen3";
    const gen4 = document.createElement("div");
    gen4.setAttribute("class", "card");
    gen4.setAttribute("id", "gen4");
    gen4.textContent = "gen4";

    chooseGen.appendChild(gen1);
    chooseGen.appendChild(gen2);
    chooseGen.appendChild(gen3);
    chooseGen.appendChild(gen4);

    document.querySelector("main").appendChild(chooseGen);

    cardListener();
};

function init() {
    createCards();
};


//----------------------------creates and runs the game page------------------------------//

//funtion that is called when the page loads to 'set up' the game
function startGame(userChoice) {
    gameEnd.innerHTML = "";
    incorrectGuess = 0;
    blankArray = [];
    gameCompeted = false;
    createGuessingField();
    chooseWord(userChoice);
    renderBlanks();
    hangmanElements = createHangman();
};

//chooses a random ny=umber from 1 to lengnth of array of possible words
function chooseWord (userChoice) {
    myWord = userChoice[Math.floor(Math.random() * userChoice.length)];
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
    renderResetButton();
};

//once max inccorect guesses is reached, it renders a new page, tells the user the answeran offers to let the uer play again
function gameOver() {
    gameCompeted = true;
    guessingField.innerHTML = "";
    hangmanElements.figureField.innerHTML = "";
    gameEnd.textContent = `The correct answer was ${myWord}. Better luck next time.`;
    mainElement.appendChild(gameEnd);
    renderResetButton();
};

//creates a reset button for the game and adds and event listerner to it
function renderResetButton() {
    const resetBtn = document.createElement("div");
    resetBtn.setAttribute("class", "reset");
    resetBtn.textContent = "Play Again?";
    gameEnd.appendChild(resetBtn);
    const playAgain = document.querySelector(".reset");
    playAgain.addEventListener("click", init);
};

function createGuessingField() {
    guessingField = document.createElement("div");
    guessingField.setAttribute("class", "guessing-field");
    document.querySelector("main").appendChild(guessingField);
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

// startGame(); 

document.addEventListener("keypress", checkWord);
