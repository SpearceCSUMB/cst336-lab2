// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];
// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var words = [{ word: "snake", hint: "It's a reptile" },
             { word: "monkey", hint: "It's a mammal" },
             { word: "beetle", hint: "It's an insect" }];
// LISTENERS
// Starts the game when page loads
window.onload = startGame();

//This causes the action of clicking a letter
$(".letter").click(function(){
  checkLetter($(this).attr("id"));
  disableButton($(this));
})

$("#letterBtn").click(function(){
  var boxVal = $("#letterBox").val();
  isGuess(boxVal);
  console.log("You pressed the button and it had the value: " + boxVal);
})

$(".replayBtn").on("click", function() {
  location.reload();
});

$(".hintBtn").on("click", function() {
  showHint();
  disableButton($(this));
});
       

// FUNCTIONS
function startGame() {
  pickWord();
  createLetters();
  initBoard();
  updateBoard();
}
      
function initBoard() {
  for (var letter in selectedWord) {
      board.push("_");
  }
}
          
function pickWord() {
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}

// Creates the letters inside the letters div
function createLetters() {
  for (var letter of alphabet) {
    $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
  }
}

// Checks to see if the selected letter exists in the selectedWord
function checkLetter(letter) {
  var positions = new Array();
  
  // Put all the positions the letter exsists in an an array
  for (var i = 0; i < selectedWord.length; i++) {
    //console.log(selectedWord)
    if (letter == selectedWord[i]) {
      positions.push(i);
    }
  }
  if (positions.length > 0) {
    updateWord(positions, letter);
    if (!board.includes('_')) {
      endGame(true);
    }
} else {
    remainingGuesses -= 1;
    updateMan();
}
if (remainingGuesses <= 0) {
    endGame(false);
  }
}
function updateWord(positions, letter) {
  
  for (var pos of positions) {
    board[pos] = letter;
  }
  
  updateBoard(board);
}

function updateBoard() {
  
  $("#word").empty();
  
    for (var letter of board) {
        document.getElementById("word").innerHTML += letter + " ";
    }
  
  $("#word").append("<br />");
  //$("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
 }

function updateMan() {
  $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
  $("#letters").hide();
  
  if (win) {
    $('#won').show();
  } else {
    $('#lost').show();
  }
}
// Disables the button and changes the style to tell the user it's disabled
function disableButton(btn) {
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger")
}

function showHint() {
  $("#hint").empty();
  $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>");
  //disableButton
  remainingGuesses -= 1;
  updateMan();
}

function isGuess(gameWord) {
  console.log(selectedWord);
  if (gameWord.toUpperCase() == selectedWord) {
    endGame(true);
  } else {
    $("#guesses").append("<span class='guess'>You guessed: " + gameWord + "</span><br />");
  }
  console.log("You pressed the button and it had the value: " + boxVal);
}