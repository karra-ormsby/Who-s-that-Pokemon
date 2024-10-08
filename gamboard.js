const userChoice = JSON.parse(localStorage.getItem("userChoice"));
const guessingField = document.querySelector(".guessing-field");
const hangMan = document.querySelector(".hangman");
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

//funtion that is called when the page loads to 'set up' the game
function startGame(userChoice) {
    incorrectGuess = 0;
    blankArray = [];
    gameCompeted = false;
    chooseWord(userChoice);
    renderBlanks();
};

//chooses a random number from 1 to lengnth of array of possible words
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
};

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
                head.classList.remove("hidden"); 
                break;
            case 2:
                body.classList.remove("hidden");
                break;
            case 3:
                armLeft.classList.remove("hidden");
                break;
            case 4:
                armRight.classList.remove("hidden");
                break;
            case 5:
                legLeft.classList.remove("hidden");
                break;
            case 6:
                legRight.classList.remove("hidden");
                break;
            case 7:
                noose.classList.remove("hidden");
                break;
            case 8:
                topRail.classList.remove("hidden");
                break;
            case 9:
                pole.classList.remove("hidden");
                break;
            case 10:
                floor.classList.remove("hidden");
                gameLoss()
                break;
        }
};

//when the correct answer is reached, the function loads a new page which congratulates the user and offers them to play again
function gameWin() {
    gameCompeted = true;
    location.replace("./gameWin.html");
};

//once max inccorect guesses is reached, the function loads a new page which tells the user the answeran offers to let the uer play again
function gameLoss() {
    gameCompeted = true;
    localStorage.setItem("myWord", myWord);
    console.log("you lost");
    location.replace("./gameLoss.html");
};

document.addEventListener("keypress", checkWord);

startGame(userChoice);