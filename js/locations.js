

var generalLocation = [
    {
        location: "Kyle Field",
        roles: ["Yell Leader", "Reveille", "Quarterback", "Announcer", 
        "Band Member", "Reveille's Handler", "Ol' Rock, the Good Ag",
        "Photographer", "Parent", "Current Student", "Former Student"]
    },
    {
        location: "Sbisa Dining Hall",
        roles: ["Server", "Front Desk Staff Member", "Current Student", 
        "Prospective Student", "Custodian", "Ol' Rock, the Good Ag",
        "Manager", "Someone Stealing Food"]
    }
];

function getRandomRoles(m, t, l, numPlayers) {

    var a = shuffle(getLocationInfo(t, l).roles);
    if (m=="traditional") {
        a[parseInt(Math.random()*numPlayers)] = "Spy";
    } else if (m=="leader") {
        var sIdx = parseInt(Math.random()*numPlayers);
        var mIdx = 0;
        do {
            mIdx = parseInt(Math.random()*numPlayers);
        } while(mIdx == sIdx);
        a[sIdx] = "Spy";
        a[mIdx] = "Leader";
    }
    return a;
}

function shuffle(a) {
    var b = a.slice();
    for (var i = 0; i < b.length; i++) {
        var c = b[i];
        var randIdx = parseInt(Math.random()*b.length);
        b[i] = b[randIdx];
        b[randIdx] = c;
    }
    return b;
}

function getRandomLocation(t) {
    var a;
    switch(t) {
        case "general":
            a = generalLocation.slice();
            break;
    }

    var newL = "";
    var sArr = JSON.parse(sessionStorage.getItem("locations"));
    if (sArr == null || !Array.isArray(sArr)) return a[parseInt(Math.random()*a.length)].location;

    var c = 0;
    var randN = parseInt(Math.random()*a.length/4 + a.length/3);
    do {
        newL = a[parseInt(Math.random()*a.length)].location;
        if (containsAllElements(a, sArr) || c>=a.length) {
            c=0;
            for (var i=0; i < a.length; i++) {
                sArr.remove(a[i].location);
            }
            sessionStorage.setItem("locations", JSON.stringify(sArr));
        } else if (c >= randN) {
            return newL;
        }
        c++;
    } while (sArr.includes(newL));
    return newL;
}

function containsAllElements(a1, a2) {
    for (var i = 0; i < a1.length; i++) {
        if (!a2.includes(a1[i]))return false;
    }
    return true;
}

function getLocationInfo(theme, name) {
    switch(theme) {
        case "general":
            return generalLocation[getIndexOfLocation(generalLocation, name)];
    }
}

function getIndexOfLocation(arr, name) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].location == name) {
            return i;
        }
    }
    return -1;
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};