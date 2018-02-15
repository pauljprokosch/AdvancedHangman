// require inquirer, word.js, .game js
var inquirer = require('inquirer');
var word = require('./word.js');
var game = require('./game.js');
var letter = require('./letter.js');
//create a function that holds the words and number of guess
var hangman = {
  ListOfWords: Game.GuessWord.ListOfWords,
  guessesLeft: 10,
  //Array to hold the letters guessed by the users
  guessedLetters: [],
  //Start the game function
  startGame: function() {
    var that = this;
    //Make sure that guessedLetters is empty
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("No Plans to play");
      }
    })},
  //Start a new game.
  newGame: function() {
    if(this.guessesLeft] === 10) {
      console.log("Start Game");
      //generates random number based on the wordBank
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      //displays current word as blanks.
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } 
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPromptingUser : function(){
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "LetterChosen",
      type: "Input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
      //make sure that all words are entered in upper case to match words.js
      var letterReturned = (ltr.LetterChosen).toUpperCase();
      //add the guessed letter if it's not already there
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
          //if none were found tell user they were wrong
          if(found === 0){
            console.log('Nope! You guessed wrong.');
            that.guessesRemaining--;
            that.display++;
            console.log('Guesses remaining: ' + that.guessesRemaining);
            console.log(hangManDisplay[(that.display)-1]);

            console.log('\n*******************');
            console.log(that.currentWord.wordRender());
            console.log('\n*******************');

            console.log("Letters guessed: " + that.guessedLetters);
          } else{
            console.log('Yes! You guessed right!');
              //checks to see if user won
              if(that.currentWord.didWeFindTheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log('Congratulations! You won the game!!!');
                // that.startGame();
              } else{
                // display the user how many guesses remaining
                console.log('Guesses remaining: ' + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
                console.log('\n*******************');
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.keepPromptingUser();
          }else if(that.guessesRemaining === 0){
            console.log('Game over!');
            console.log('The word you were guessing was: ' + that.currentWord.word);
          }
        } else{
            console.log("You've guessed that letter already. Try again.")
            that.keepPromptingUser();
          }
    });
  }
}

hangman.startGame();
