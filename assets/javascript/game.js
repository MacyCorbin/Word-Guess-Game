//---------------Javascript For Word Guess Game----------------//


//-----Lord of the Rings Word List-----//
var wordList = [
    "aragorn",
    "anduril", 
    "evenstar",
    "sauron",
    "eowyn",
    "ringbearer",
    "frodo",
    "bombadil",
    "balrog",
    "moria",
    "mordor",
    "sting",
    "galadriel",
    "legolas",
    "gimli",

];

//set up variables
var wins =0
var losses =0
const numberOfGuesses = 10
var letterGuess = [];        
var currentWordIndex;          
var blankWord = [];          
var remainingGuesses = 0;       
var gameStart = false;        
var gameEnd = false; 

//need to reset the game
function resetGame() {
    remainingGuesses = numberOfGuesses;
    gameStart = false;

    // Math.floor chooses a random word from the wordList array
    currentWordIndex = Math.floor(Math.random() * (wordList.length));

    // Clear out the letters that have been guessed and resets the spaces for the word
    letterGuess = [];
    blankWord = [];


    // Build the guessing word and clear it out
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        blankWord.push("_");
    }
  
    // Show display
    updateDisplay();
};


//  Updates the display on the HTML Page
function updateDisplay() {

    //displays the total user wins to the HTML page
    document.getElementById("totalWins").innerText = wins;

    //displays the total user losses to the HTML page
    document.getElementById("totalLosses").innerText = losses;

    //displays the current word to be guessed
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < blankWord.length; i++) {
        document.getElementById("currentWord").innerText += blankWord[i];
    }

    //displays the remaining guesses the user has to the HTML page
    document.getElementById("remainingGuesses").innerText = remainingGuesses;

    //shows all the letters the user clicked
    document.getElementById("letterGuess").innerText = letterGuess;

    //if there are no more remaining guesses update losses and declare the end of the game
    if(remainingGuesses <= 0) {
        losses++;
        gameEnd = true;
    }
};


//onkeyup initializes the game when the user selects any key
document.onkeyup = function(event) {

    // the end of game resets the game
    if(gameEnd) {
        resetGame();
        gameEnd = false;

    //if its not the end of game start the game with any letter
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// Function takes the user letter and finds all instances of the letter in the string. 
// Then it replaces the leter in the correct space in the blank word.
function evaluateGuess(letter) {

    // the letters in the string need to have an array to setup positions
    var positions = [];

    // for every letter guessed search through the word
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        if(wordList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if the letter is not found, remove a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // search the array and replace the '_' with the correct letter.
        for(var i = 0; i < positions.length; i++) {
            blankWord[positions[i]] = letter;
        }
    }
};


function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        //searches guesses to check if letter was already selected
        if (letterGuess.indexOf(letter) === -1) {
            letterGuess.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

//if there are no more blank spaces(_), add to the user wins
function checkWin() {
    if(blankWord.indexOf("_") === -1) {
        wins++;
        gameEnd = true;
    }
};









