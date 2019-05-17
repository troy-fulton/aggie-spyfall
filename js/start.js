
document.getElementById("start-create-roomid").addEventListener('input', function (evt) {
    document.getElementById("start-create-error").innerText = "";

    if (this.value.length != 4) {
        this.style.border = "2px solid red";
    } else {
        this.style.border = "1px solid #e5cbb7";
    }
});
document.getElementById("start-join-roomid").addEventListener('input', function (evt) {
    document.getElementById("start-join-error").innerText = "";

    if (this.value.length != 4) {
        this.style.border = "2px solid red";
    } else {
        this.style.border = "1px solid #e5cbb7";
    }
});
document.getElementById("start-create-name").addEventListener('input', function (evt) {
    if (this.value.length == 0) {
        this.style.border = "2px solid red";
    } else {
        this.style.border = "1px solid #e5cbb7";
    }
});
document.getElementById("start-join-name").addEventListener('input', function (evt) {
    if (this.value.length == 0) {
        this.style.border = "2px solid red";
    } else {
        this.style.border = "1px solid #e5cbb7";
    }
});


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

var name = "";
var theme = "general";
var mode = "traditional";

var wListenerPlayer;
var listenForGameStart;


function joinGame() {
    var room = document.getElementById("start-join-roomid").value;
    var n = document.getElementById("start-join-name").value;
    if (room.length < 4) {
        document.getElementById("start-join-roomid").style.border = "2px solid red";
        return
    } else if (n.length == 0) {
        document.getElementById("start-join-name").style.border = "2px solid red";
        return;
    }

    name = n;
    joinRoom(room, n, function(res) {
        if (res == "null") {
            //room does not exist
            document.getElementById("start-join-error").innerText = "Room does not exist";
            document.getElementById("start-join-roomid").style.border = "2px solid red";
        } else if (res=="started") {
            //game in session
            document.getElementById("start-join-error").innerText = "Game in session";
            document.getElementById("start-join-roomid").style.border = "2px solid red";
        } else if (res=="full") {
            //game full
            document.getElementById("start-join-error").innerText = "Room full";
            document.getElementById("start-join-roomid").style.border = "2px solid red";
        } else if (res=="success") {
            //joined successfully
            document.getElementById("start-join-roomid").value = "";
            document.getElementById("start-join-name").value = "";
            document.getElementById("start-join-display").style.display = "none";
            document.getElementById("start").style.display = "none";
            displayWaitingRoom();
        }
    });
}

function createGame() {
    var room = document.getElementById("start-create-roomid").value;
    var n = document.getElementById("start-create-name").value;
    if (room.length < 4) {
        document.getElementById("start-create-roomid").style.border = "2px solid red";
        return
    } else if (n.length == 0) {
        document.getElementById("start-create-name").style.border = "2px solid red";
        return;
    }
    name = n;
    createRoom(room, n, function(res) {
        if (res=="taken") {
            //room code already taken
            document.getElementById("start-create-error").innerText = "Room code taken";
            document.getElementById("start-create-roomid").style.border = "2px solid red";
        } else if (res == "success") {
            document.getElementById("start-create-roomid").value = "";
            document.getElementById("start-create-name").value = "";
            document.getElementById("start-create-display").style.display = "none";
            document.getElementById("start").style.display = "none";
            displayWaitingRoom();
        }
    });
}

function displayWaitingRoom(){
    document.getElementById("waiting-room").style.display = "block";
    document.getElementById("wait-roomCode").innerText = roomid;


    //get roomid from database
    //display names from database
    //if nameId of database name equals this nameid then show "(You)" text
    rooms.doc(roomid).collection("Players").get().then((col)=>{
        var s = "";
        col.forEach((doc)=>{
            if (nameID == doc.data().id) {
                s += "<li class=\"col-12 waiting-player\">" +
                    doc.data().name + " (You)" +
                    "<span class=\"editName\">" +
                    "<i class=\"fas fa-pencil-alt\" data-id='"+doc.data().id+"'></i></span></li>";
            } else {
                s += "<li class=\"col-12 waiting-player\">" +
                    doc.data().name +
                    "<span class=\"editName\">" +
                    "<i class=\"fas fa-times\" data-id='"+doc.data().id+"'></i></span></li>";
            }
        });

        document.getElementById("waiting-player-list").innerHTML = s;

        $(".fa-times").on("click", function(e) {
            e.preventDefault();
            rooms.doc(roomid).collection("Players").doc("player"+$(this).attr("data-id")).delete();
        });
    });

    wListenerPlayer = rooms.doc(roomid).collection("Players").onSnapshot((col)=>{

        col.docChanges().forEach((change)=>{
           if (change.type=="removed"){
               if (change.doc.data().id==nameID) {
                    if (col.size==0) {
                        rooms.doc(roomid).delete().then(()=>{
                            location.reload();
                        })
                    } else location.reload();
               } else {
                   if (change.doc.data().id < nameID) {
                       nameID--;
                       rooms.doc(roomid).collection("Players").doc("player"+(parseInt(nameID)+1)).delete();
                       rooms.doc(roomid).collection("Players").doc("player"+nameID).set({id:nameID, name:name, role:""});
                   }
               }
           }
        });

        var s = "";
        col.forEach((doc)=>{
            if (nameID == doc.data().id) {
                s += "<li class=\"col-12 waiting-player\">" +
                    doc.data().name + " (You)" +
                    "<span class=\"editName\">" +
                    "<i class=\"fas fa-pencil-alt\" data-id='"+doc.data().id+"'></i></span></li>";
            } else {
                s += "<li class=\"col-12 waiting-player\">" +
                    doc.data().name +
                    "<span class=\"editName\">" +
                    "<i class=\"fas fa-times\" data-id='"+doc.data().id+"'></i></span></li>";
            }
        });

        document.getElementById("waiting-player-list").innerHTML = s;

        $(".fa-times").on("click", function(e) {
            e.preventDefault();
            rooms.doc(roomid).collection("Players").doc("player"+$(this).attr("data-id")).delete();
        });
    });

    listenForGameStart = rooms.doc(roomid).onSnapshot((doc)=>{

        if (doc.data().gamestart) {
            document.getElementById("waiting-room").style.display = "none";
            document.getElementById("screen").style.display = "block";
            displayInfo();
            timerInterval  = setInterval(startTimer, 200);
            wListenerPlayer();
            listenForGameStart();
        }
    });
}

$("#start-join-game-button").click(joinGame);
$("#start-create-game-button").click(createGame);



//TODO make reset method for clearing all displays and values from input fields
//TODO make change name display in waiting-room

function startGame() {
    rooms.doc(roomid).get().then((doc)=>{
        rooms.doc(roomid).collection("Players").get().then((col)=>{
            if (col.size==1) return;
            var a = new Date();
            var l = getRandomLocation(theme);
            rooms.doc(roomid).update({
                firstplayer: parseInt(Math.random() * (col.size - 1)) + 1,
                location: l,
                starttime: {hour:a.getHours(), min:a.getMinutes(), sec:a.getSeconds()},
                gamestart:true
            });
            var newRoles = getRandomRoles(theme, l, col.size);
            for (var i = 1; i < col.size+1; i++) {
                rooms.doc(roomid).collection("Players").doc("player"+i).update({role: newRoles[i-1]});
            }
        });
    });
}




function leaveGame() {
    document.getElementById("waiting-room").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("start-buttons").style.display = "block";
    rooms.doc(roomid).collection("Players").doc('player'+nameID).delete();
}

$("#startButton").click(startGame);
$("#leaveButton").click(leaveGame);
