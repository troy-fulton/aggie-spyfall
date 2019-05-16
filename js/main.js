

var spyRole = "the spy";
var spyLocation = "Hotel";

var a = new Date();
var startTime = {
    hour: a.getHours(),
    min: a.getMinutes(),
    sec: a.getSeconds()
};
var time = 1; //in minutes



function endGame() {

}

function leaveGame() {

}

$("#end-game-button").on("click", endGame());
$("#leave-game-button").on('click', leaveGame());