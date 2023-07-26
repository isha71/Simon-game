let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

let i = 0;

console.log("value of i initally " + i);
$(".btn").click(function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("value of i when button is clicked - "  + i);
    checkAnswer(buttonColours.lastIndexOf(userChosenColour), i);
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("game pattern array -  " + gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel, j) {
    if (buttonColours[currentLevel] == gamePattern[j]) {
        console.log("success");
        console.log(gamePattern.length + " " + userClickedPattern.length);
        if (gamePattern.length == userClickedPattern.length) {
            userClickedPattern = [];
            i = 0;
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        else {
            i++;
            console.log("we have reached else block if color is same, here value of i increased  by 1 - " + i);
            console.log("hahahhaha");

        }
    }

    else {
        console.log("fail");
        let audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}




