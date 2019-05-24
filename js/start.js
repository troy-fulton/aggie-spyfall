
document.getElementById("rule-mode").onchange = function() {
  var mode = document.getElementById("rule-mode").value;
  console.log(mode);
  if (mode == "traditional") {
    document.getElementById("rule-traditional").style.display = "block";
    document.getElementById("rule-leader").style.display = "none";
  } else if (mode == "leader") {
    document.getElementById("rule-leader").style.display = "block";
    document.getElementById("rule-traditional").style.display = "none";
  }
};

$("#start-join-roomid").on({
    keydown: function(e) {
        if (e.which === 32)
            return false;
    },
    change: function() {
        this.value = this.value.replace(/\s/g, "");
    }
});
$("#start-create-roomid").on({
    keydown: function(e) {
        if (e.which === 32)
            return false;
    },
    change: function() {
        this.value = this.value.replace(/\s/g, "");
    }
});

var rulesActive = false;
$("#rules").on("click", function(e) {
  e.preventDefault();
  rulesActive = true;
  if (rulesActive) {
    document.getElementById("rule-display").style.display = "block";
  }
});

$("#close-rule-display").on("click", function(e) {
  e.preventDefault();
  rulesActive = false;
  if (!rulesActive) {
    document.getElementById("rule-display").style.display = "none";
  }
});

var optionsActive = false;
$("#waiting-setting").on('click', function (e) {
   e.preventDefault();
   optionsActive = true;
   document.getElementById("waiting-options").style.display = "block";
});

$("#waiting-options-close").on('click', function (e) {
    e.preventDefault();
    optionsActive = false;
    document.getElementById("waiting-options").style.display = "none";
    document.getElementById("option-time").value = timeTimer;
    document.getElementById("option-mode").value = mode;
    document.getElementById("option-theme").value = theme;
});

$("#option-cancel-button").on('click', function (e) {
    e.preventDefault();
    optionsActive = false;
    document.getElementById("waiting-options").style.display = "none";
    document.getElementById("option-time").value = timeTimer;
    document.getElementById("option-mode").value = mode;
    document.getElementById("option-theme").value = theme;
});

$("#option-save-button").on('click', function(e){
   e.preventDefault();
   var m = document.getElementById("option-mode").value;
   var t = document.getElementById("option-time").value;
   var th = document.getElementById("option-theme").value;

   rooms.doc(roomid).update({mode:m,time:t,theme:th});
   optionsActive = false;
   document.getElementById("waiting-options").style.display = "none";
});

var nameChangeActive = false;



$("#change-name-cancel-button").on("click", function(e) {
   e.preventDefault();
   nameChangeActive = false;
    document.getElementById("change-name").style.display = "none";
    document.getElementById("change-name-name").value = "";
});

$("#change-name-close").on('click', function (e) {
    e.preventDefault();
    nameChangeActive = false;
    document.getElementById("change-name").style.display = "none";
    document.getElementById("change-name-name").value = "";
});

$("#change-name-save-button").on('click', function (e) {
    e.preventDefault();
    var n = document.getElementById("change-name-name").value;
    document.getElementById("change-name-name").value = "";
    document.getElementById("change-name").style.display = "none";
    rooms.doc(roomid).collection("Players").doc("player"+nameID).update({name:n});
});

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
    rulesActive = false;
    document.getElementById("rule-display").style.display = "none";

    document.getElementById("start-buttons").style.display = "none";
    document.getElementById("start-join-display").style.display = "block";
}

function createGameDisplay() {
    rulesActive = false;
    document.getElementById("rule-display").style.display = "none";

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
    document.getElementById("start-buttons").style.display = "flex";
}

$("#start-join").click(joinGameDisplay);
$("#start-create").click(createGameDisplay);
$(".start-back-button").click(backToStart);

var name = "";
var theme = "general";
var mode = "traditional";
var timeTimer = 8;

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
    optionsActive = false;
    document.getElementById("waiting-options").style.display = "none";

    document.getElementById("waiting-room").style.display = "block";
    document.getElementById("wait-roomCode").innerText = roomid;
    document.getElementById("waiting-player-list").innerHTML="";

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

        $(".fa-pencil-alt").on('click', function(e){
            e.preventDefault();
            nameChangeActive = true;
            document.getElementById("change-name").style.display = "block";
        });
    });

    wListenerPlayer = rooms.doc(roomid).collection("Players").onSnapshot((col)=>{
        new Promise(resolve=>{
            col.docChanges().forEach((change)=>{
                if (change.type=="removed"){
                    if (change.doc.data().id==nameID) {
                        if (col.size==0) {
                            rooms.doc(roomid).delete().then(()=>{
                                location.reload();
                            })
                        } else location.reload();
                    } else {
                        var currNumPlayers = col.size;
                        if (change.doc.data().id < nameID) {
                            if (nameID == currNumPlayers+1) {
                                nameID--;
                                rooms.doc(roomid).collection("Players").doc("player" + (currNumPlayers+1)).delete()
                                    .then(()=>{
                                        rooms.doc(roomid).collection("Players").doc("player" + nameID).set({
                                            id: nameID,
                                            name: name,
                                            role: ""
                                        }).then(() => {
                                            resolve();
                                        });
                                    });
                            } else {
                                nameID--;
                                rooms.doc(roomid).collection("Players").doc("player" + nameID).set({
                                    id: nameID,
                                    name: name,
                                    role: ""
                                }).then(()=>{resolve();});
                            }
                        } else resolve();
                    }
                }
                else resolve();
            });
        }).then((res)=>{
            rooms.doc(roomid).collection("Players").get().then((col2)=>{
                var s = "";
                col2.forEach((doc2)=>{
                    if (nameID == doc2.data().id) {
                        s += "<li class=\"col-12 waiting-player\">" +
                            doc2.data().name + " (You)" +
                            "<span class=\"editName\">" +
                            "<i class=\"fas fa-pencil-alt\" data-id='"+doc2.data().id+"'></i></span></li>";
                    } else {
                        s += "<li class=\"col-12 waiting-player\">" +
                            doc2.data().name +
                            "<span class=\"editName\">" +
                            "<i class=\"fas fa-times\" data-id='"+doc2.data().id+"'></i></span></li>";
                    }
                });

                document.getElementById("waiting-player-list").innerHTML = s;

                $(".fa-times").on("click", function(e) {
                    e.preventDefault();
                    rooms.doc(roomid).collection("Players").doc("player"+$(this).attr("data-id")).delete();
                });

                $(".fa-pencil-alt").on('click', function(e){
                    e.preventDefault();
                    nameChangeActive = true;
                    document.getElementById("change-name").style.display = "block";
                });
            });

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

        document.getElementById("option-mode").value = doc.data().mode;
        document.getElementById("option-time").value = doc.data().time;
        document.getElementById("option-theme").value = doc.data().theme;
        mode = doc.data().mode;
        timeTimer = doc.data().time;
        theme = doc.data().theme;

    });


}

$("#start-join-game-button").click(joinGame);
$("#start-create-game-button").click(createGame);



//TODO make change name display in waiting-room

function startGame() {
    var minP = 2;
    switch(mode) {
        case "traditional":
            minP = 3;
            break;
        case "leader":
            minP=4;
            break;
    }
    rooms.doc(roomid).collection("Players").get().then((col)=>{
        if (col.size<minP) return;
        optionsActive = false;
        document.getElementById("waiting-options").style.display = "none";
        var a = new Date();
        numPlayers = col.size;
        var l = getRandomLocation(theme);
        var newRoles = getRandomRoles(mode, theme, l, col.size);
        for (var i = 1; i < col.size+1; i++) {
            if (i == col.size) {
                rooms.doc(roomid).collection("Players").doc("player"+i).update({role: newRoles[i-1]}).then(()=>{
                    rooms.doc(roomid).update({
                        firstplayer: parseInt(Math.random() * (col.size - 1)) + 1,
                        location: l,
                        starttime: {hour:a.getHours(), min:a.getMinutes(), sec:a.getSeconds()},
                        gamestart:true
                    });
                });
            } else rooms.doc(roomid).collection("Players").doc("player"+i).update({role: newRoles[i-1]});
        }
    });
}




function leaveGame() {
    document.getElementById("waiting-room").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("start-buttons").style.display = "flex";
    rooms.doc(roomid).collection("Players").doc('player'+nameID).delete();
}

$("#startButton").click(startGame);
$("#leaveButton").click(leaveGame);
