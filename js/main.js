

var spyRole = "";
var spyLocation = "";

var roomid = "";
var nameID = ""; // this will be the player's number (each player is numbered based on when they join the game)



function endGame() {
    rooms.doc(roomid).update({gamestart:false});
}

function leaveGame() {
    rooms.doc(roomid).collection("Players").doc("player"+nameID).delete().then(()=>{
        rooms.doc(roomid).collection("Players").get().then((col)=>{
            if (col.size==0) {
                rooms.doc(roomid).delete().then(()=>{location.reload();});
            }else location.reload();
        })
    });

}

$("#end-game-button").on("click", endGame);
$("#leave-game-button").on('click', leaveGame);



var firstplayer = 1;
var theme = "";
var mode = "";

var startTime;
var time = 8; //in minutes

var listenForGameEnd, listenForPlayerLeave, listenForLocationChange;

function displayInfo() {

    new Promise(resolve => {
        rooms.doc(roomid).get().then((doc)=>{
            firstplayer = doc.data().firstplayer;
            spyLocation = doc.data().location;
            theme = doc.data().theme;
            mode = doc.data().mode;
            time = doc.data().time;
            startTime = doc.data().starttime;


            listenForGameEnd = rooms.doc(roomid).onSnapshot((doc)=> {

                if (!doc.data().gamestart) {
                    document.getElementById("screen").style.display = "none";
                    toggleInfo("hidden");
                    clearInterval(timerInterval);
                    spyRole = "";
                    spyLocation = "";
                    listenForGameEnd();
                    listenForPlayerLeave();
                    displayWaitingRoom();
                }

            });

            listenForPlayerLeave = rooms.doc(roomid).collection("Players").onSnapshot((col)=> {
                col.docChanges().forEach((change) => {
                    if (change.type == "removed") {
                        if (change.doc.data().id != nameID) {
                            if (change.doc.data().id < nameID) {
                                nameID--;
                                rooms.doc(roomid).collection("Players").doc("player" + (parseInt(nameID) + 1)).delete();
                                rooms.doc(roomid).collection("Players").doc("player" + nameID).set({
                                    id: nameID,
                                    name: name,
                                    role: spyRole
                                });
                            }
                            displayPlayers();
                        }
                    }
                });
            });

            resolve();

        });
    }).then((res)=>{
        displayPlayers();
        displayLocations();
    });
}

//TODO listen for a change in location. Just in case if two people press start at the same time
// for some reason, that doesn't happen

function displayLocations() {
    rooms.doc(roomid).collection("Players").doc("player"+nameID).get().then((doc)=>{
      spyRole = doc.data().role;
      document.getElementById("spy-role").innerText = spyRole;
      if (spyRole != "Spy" && spyRole != "Leader") document.getElementById("spy-location").innerText = spyLocation;
      else {
          spyLocation = "lol u cheater";
          document.getElementById("spy-location").innerText = "";
      }

      toggleInfo("hidden");

      var s = "";
      if (theme=="general") {
          for (var loc of generalLocation) {
             s += "<div class=\"col-6 locationC\">" +
                 "<div>"+loc.location+"</div></div>"
          }
      }
      document.getElementById("locations-display-row").innerHTML = s;
        $(".locationC").on("click", function(e) {
            e.preventDefault();
            $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
        });
    });
}

function displayPlayers() {
    var s ="";
    rooms.doc(roomid).collection("Players").get().then((col)=>{
        col.forEach((doc)=>{
            if (nameID == doc.data().id) {
                spyRole = doc.data().role;
                if (firstplayer == doc.data().id) {
                    s += "<div class=\"col-md-6 col-sm-12 player\">" +
                        "<div><p class='firstDisplay'>First</p>" +
                        doc.data().name+ " (You)" +
                        "</div></div>";
                } else
                    s += "<div class=\"col-md-6 col-sm-12 player\">" +
                        "<div>" +
                        doc.data().name+ " (You)" +
                        "</div></div>";
            } else if (firstplayer == doc.data().id) {
                s += "<div class=\"col-md-6 col-sm-12 player\">" +
                    "<div><p class='firstDisplay'>First</p>" +
                    doc.data().name +
                    "</div></div>";
            }
            else {
                s += "<div class=\"col-md-6 col-sm-12 player\">" +
                    "<div>" +
                    doc.data().name +
                    "</div></div>";
            }
        });
        document.getElementById("hud-players").innerHTML = s;
        $(".player").on("click", function(e) {
            e.preventDefault();
            $(this).hasClass("strikethrough")? $(this).removeClass("strikethrough"): $(this).addClass("strikethrough");
        });
    });

}













function createRoom(roomID, name, callback) {


    new Promise(resolve => {
        rooms.doc(roomID).get().then((doc)=>{
            resolve(doc.exists);
        });
    }).then((res)=>{
        if (res) {
            callback && callback("taken");
            return;
        } else {
            rooms.doc(roomID).set({
                gamestart: false,
                firstplayer: 1,
                location: "",
                mode: "traditional",
                starttime: {},
                time:8,
                theme: "general"
            });
            rooms.doc(roomID).collection("Players").doc("player1").set({id:1, name:name, role:""});
            roomid = roomID;
            nameID=1;
            console.log("Created Room!");
            callback && callback("success");
            return;
        }
    });
}


function joinRoom(roomID, name, callback) {

    var numPlayers =0;

    //checks if room exists
    new Promise(resolve => {
        rooms.doc(roomID).get().then((doc)=>{
            resolve(doc.exists);
        });
    })
        .then((res)=>{
            if (!res) {
                callback && callback("null");
                return;
            } else {
                //checks if game started
                new Promise(resolve => {
                    rooms.doc(roomID).get().then((doc)=>{
                        resolve(doc.data().gamestart);
                    });
                })
                    .then((res)=>{
                        if (res) {
                            callback && callback("started");
                            return;
                        } else {
                            //checks if room is full
                            new Promise(resolve=>{
                                rooms.doc(roomID).collection("Players").get().then((col)=>{
                                    resolve(col.size);
                                })
                            })
                                .then((res)=>{
                                    if (res >10) {
                                        callback && callback("full");
                                        return;
                                    } else {
                                        numPlayers = res;

                                        console.log("Connected");
                                        rooms.doc(roomID).collection("Players").doc("player"+(numPlayers+1)).set({id:numPlayers+1, name:name, role:""});
                                        nameID=numPlayers+1;
                                        roomid=roomID;
                                        callback && callback("success");
                                        return;
                                    }
                                });
                        }
                    });
            }
        });
}
