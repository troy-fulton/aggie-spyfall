
var infoVisible = true;

$("#info-container").dblclick(function(e) {
  e.preventDefault();
    hideInfo();
});


var lastTap = 0;
$("#info-container").on("touchend", function(e) {
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;

    e.preventDefault();
    lastTap = currentTime;
    if(tapLength < 500 && tapLength > 0){
        //Double Tap/Click
        hideInfo();
    }
});

document.addEventListener("keydown", function(e) {
    if (e.code != "Space") return;
    hideInfo();
    document.getElementById("info-help-pc").innerText = (infoVisible)?"Space to hide":"Space to show";
});

function hideInfo() {
    infoVisible = !infoVisible;

    document.getElementById("spy-roleS").innerText = (infoVisible)?"You are ":"Hidden";
    document.getElementById("spy-role").innerText = (infoVisible)?spyRole:"";
    document.getElementById("spy-location").innerText = (infoVisible)?spyLocation: "";
    document.getElementById("info-container").style.opacity = (infoVisible)?"1":"0.5";
    document.getElementById("info-help").innerText = (infoVisible)?"Double click to hide":"Double click to show";
}

