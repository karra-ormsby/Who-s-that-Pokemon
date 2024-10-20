const userChoice = JSON.parse(localStorage.getItem("userChoice"));
const genText = localStorage.getItem("genText");
const home = document.querySelector("#home");
const genPicked = document.querySelector("#gen-picked");
const guessingField = document.querySelector("#guessing-field");
const hangMan = document.querySelector("#hangman");
const topRail = document.querySelector("#top-rail");
const noose = document.querySelector("#noose");
const pole = document.querySelector("#pole");
const floor = document.querySelector("#floor");
const head = document.querySelector("#head");
const body = document.querySelector("#body");
const armLeft = document.querySelector("#arm-left");
const armRight = document.querySelector("#arm-right");
const legLeft = document.querySelector("#leg-left");
const legRight = document.querySelector("#leg-right");
const keyboardDiv = document.querySelector('#keyboard');
const wrongLetters = document.querySelector("#wrong-letters");

let blankArray = [];
let blankWord;
let myWord;
let incorrectGuess;
let incorrectGuessArray = [];
let gameCompeted;

//the rows of keys on the keyboard
const rows = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];

//adds and event listener to each key on the keyboard    
rows.forEach(function(row) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    //for each key on the keyboard, attached an event listener to it
    row.forEach(function(key) {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        keyDiv.textContent = key;
        keyDiv.addEventListener('click', function() {
            checkWord();
        });
        rowDiv.appendChild(keyDiv);
    });
    keyboardDiv.appendChild(rowDiv);
});

//when the user clicks the home button the local storage is cleared and the user goes back to the landing page
function goHome() {
    localStorage.clear();
    location.replace("./index.html");
};

home.addEventListener("click", goHome);


//funtion that is called when the page loads to 'set up' the game
function startGame(userChoice) {
    genPicked.innerHTML = genText;
    incorrectGuess = 0;
    blankArray = [];
    gameCompeted = false;
    chooseWord(userChoice);
    renderBlanks();
};

//chooses a random number from 1 to length of array of possible words. Saves the chosen word and the pokedex number into local storage to be used on a different page
function chooseWord (userChoice) {
    const randomNum = Math.floor(Math.random() * userChoice.length);
    myWord = userChoice[randomNum].pokemon;
    localStorage.setItem("myWord", myWord);
    const pokedexNum = userChoice[randomNum].pokedexNumber;
    localStorage.setItem("pokedexNum", pokedexNum);
};

//turn myWord into an array of blanks that will be displayed as the 'word' to the user
//then display the array as a string to the user
function renderBlanks() {
    for (let i = 0; i < myWord.length; i++) {
        //check if the character is a letter or number using regex
        //if it is then replace it with a blankn
        if (/[a-zA-Z0-9]/.test(myWord[i])) {
            blankArray[i] = "_";
        } else {
            //if not, then don't replace it and just display that character to the user
            blankArray[i] = myWord[i];
        }
    }

    blankWord = blankArray.join("");
    guessingField.textContent = blankWord;
}


//checks the letter guessed by the user against the selected word
//if the correct letter is gussed it will replace the '_' at it's loaction and be rendered to the document
//the function then checks if the user has guessed all letters in the word
//if the letter gusssed is incorrect it runs the wrongGuess function
function checkWord() {
    if(!gameCompeted) {
        let letter = "";
        //when a key on a keyboard is pressed
        if(event.key) {
            letter = event.key;
        } else {
            //when a key on the touch screen keyboard is pressed
            letter = event.target.innerText;
        };
        
        let correctGuess = false;

        for(let i = 0; i < myWord.length; i++) {
            if (myWord[i] === letter) {
                correctGuess = true;
                blankArray[i] = letter;
            }
        }
        guessingField.textContent = blankArray.join("");

        //checks if the incorrectly guessed letter has been guessed before. If it hasn't it will be added to the incorrectGuessArray and the incorrect guesses will be incremented
        if (!correctGuess) {
            if (!incorrectGuessArray.includes(letter)) {
                incorrectGuessArray.push(letter);
                wrongLetters.textContent = incorrectGuessArray.join(" ");
                incorrectGuess ++;
                wrongGuess();
            }
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
                head.style.borderColor = 'black';
                break;
            case 2:
                body.style.borderColor = 'black';
                break;
            case 3:
                armLeft.style.borderColor = 'black';
                break;
            case 4:
                armRight.style.borderColor = 'black';
                break;
            case 5:
                legLeft.style.borderColor = 'black';
                break;
            case 6:
                legRight.style.borderColor = 'black';
                break;
            case 7:
                noose.style.borderColor = 'black';
                break;
            case 8:
                topRail.style.borderColor = 'black';
                break;
            case 9:
                pole.style.borderColor = 'black';
                break;
            case 10:
                floor.style.borderColor = 'black';
                gameLoss()
                break;
        }
};

//when the correct answer is reached, the function loads a new page which congratulates the user and offers them to play again
function gameWin() {
    gameCompeted = true;
    let gameWon = true;
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
    location.replace("./playAgain.html");
};

//once max incorrect guesses is reached, the function loads a new page which tells the user the answer and offers to let the uer play again
function gameLoss() {
    gameCompeted = true;
    let gameWon = false;
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
    location.replace("./playAgain.html");
};

document.addEventListener("keypress", checkWord);

startGame(userChoice);