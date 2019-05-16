


function joinGameDisplay() {
    document.getElementById("start-buttons").style.display = "none";
    document.getElementById("start-join-display").style.display = "block";
}

function createGameDisplay() {
    document.getElementById("start-buttons").style.display = "none";
    document.getElementById("start-create-display").style.display = "block";
}


function backToStart() {
    document.getElementById("start-join-display").style.display = "none";
    document.getElementById("start-create-display").style.display = "none";
    document.getElementById("start-join-roomid").value = "";
    document.getElementById("start-join-name").value = "";
    document.getElementById("start-create-roomid").value = "";
    document.getElementById("start-create-name").value = "";
    document.getElementById("start-buttons").style.display = "block";

}

$("#start-join").click(joinGameDisplay);
$("#start-create").click(createGameDisplay);
$(".start-back-button").click(backToStart);


var roomid = "";
var name = "";
var nameID = ""; // this will be the player's number (each player is numbered based on when they join the game)
function joinGame() {
    var room = document.getElementById("start-join-roomid").value;
    var n = document.getElementById("start-join-name").value;
    document.getElementById("start-join-roomid").value = "";
    document.getElementById("start-join-name").value = "";
    document.getElementById("start-join-display").style.display = "none";
    document.getElementById("start").style.display = "none";
    //add roomid & name to database
    name = n;
    roomid= room;
    displayWaitingRoom();
}

function createGame() {
    var room = document.getElementById("start-create-roomid").value;
    var n = document.getElementById("start-create-name").value;
    document.getElementById("start-create-roomid").value = "";
    document.getElementById("start-create-name").value = "";
    document.getElementById("start-create-display").style.display = "none";
    document.getElementById("start").style.display = "none";
    //add roomid & name to database
    name = n;
    roomid= room;
    displayWaitingRoom();
}

function displayWaitingRoom(){
    document.getElementById("waiting-room").style.display = "block";
    //get roomid from database
    //display names from database
    //if nameId of database name equals this nameid then show "(You)" text

    document.getElementById("wait-roomCode").innerText = roomid;
}

$("#start-join-game-button").click(joinGame);
$("#start-create-game-button").click(createGame);



//TODO make reset method for clearing all objects

function startGame() {

    document.getElementById("waiting-room").style.display = "none";
    document.getElementById("screen").style.display = "block";

}

function leaveGame() {
    document.getElementById("waiting-room").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("start-buttons").style.display = "block";

}

$("#startButton").click(startGame);
$("#leaveButton").click(leaveGame);


