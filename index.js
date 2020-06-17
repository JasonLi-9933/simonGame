var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstPress = true;

// Create a new color and add it to the pattern.
function nextSequence(level) {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").html("Level " + level);
}

function showSequence(gamePattern, level) {
  checkAndplay(gamePattern[level]);
  animatePress(gamePattern[level]);
}

// Add the effect of a button being pressed.
function animatePress(currentColor) {
  var $color = $("#" + currentColor);
  $color.addClass("pressed");
  setTimeout(function() {
    $color.removeClass("pressed");
  }, 100)
}



$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  checkAndplay(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);

  if (userClickedPattern.length == gamePattern.length) {
    if (checkAnswer(level)) {
      console.log("success");
      console.log(gamePattern);
      console.log(userClickedPattern);
      level++;
      nextSequence(level);
      userClickedPattern = [];
      setTimeout(function() {
        showSequence(gamePattern, level);
      }, 1000);
    } else {
      console.log("wrong");
      console.log(gamePattern);
      console.log(userClickedPattern);
      $("#level-title").html("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200)
      startOver();
    }
  }
});

function checkAndplay(button) {
  if (button === "green") {
    var greenSound = new Audio("sounds/green.mp3");
    greenSound.play();
  }

  if (button === "blue") {
    var blueSound = new Audio("sounds/blue.mp3");
    blueSound.play();
  }

  if (button === "red") {
    var redSound = new Audio("sounds/red.mp3");
    redSound.play();
  }

  if (button === "yellow") {
    var yellowSound = new Audio("sounds/yellow.mp3");
    yellowSound.play();
  }
}

$(document).on("keypress", function() {
  if (firstPress) {
    nextSequence(level);
    showSequence(gamePattern, level);
    firstPress = false;
  }
});

function checkAnswer(currentLevel) {
  return gamePattern[currentLevel] == userClickedPattern[currentLevel];
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  firstPress = true;
}
