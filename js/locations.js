

var generalLocation = [
    {
        location: "School",
        roles: ["Teacher", "Principal", "Lunch Lady",
            "Club President", "Class President", "Janitor", "Nurse",
            "Class Photographer", "Counselor", "Student"]
    },
    {
        location: "Tropical Island",
        roles: ["Coconut Farmer", "Truck Driver", "Surfer", "Shop Owner", "Tourist",
        "Tour Guide", "Smuggler", "Shark", "Turtle", "Boat Owner"]
    },
    {
        location: "Circus",
        roles: ["Juggler", "Fire Breather", "Acrobat", "Pickpocket", "Child", "Vendor",
        "Ring Master", "Clown", "Lion Tamer", "Weight Lifter"]
    },
    {
        location: "Prison",
        roles:["Guard", "Cook", "Warden", "Janitor", "Convict", "Security", "Visitor",
        "Gangster", "FBI Agent", "Nurse"]
    },
    {
        location: "Beach",
        roles:["Child", "Thief", "Police Officer", "Surfer", "Tourist"
        , "Shop Owner", "Street Vendor", "Boat Owner", "Shark", "Ice Cream Man"]
    },
    {
        location: "Bar",
        roles: ["Drunk Person", "Bartender", "Customer", "Undercover Cop", "Thug",
        "Bouncer", "Drug Dealer", "Singer", "Entertainer"]
    },
    {
      location: "Cargo Ship",
      roles: ["Pirate", "Mechanic", "Captain", "Navigator", "Crewman", "Cook", "Engineer",
              "Radioman", "Smuggler", "Worker"]
    },
    {
      location:"Airplane",
      roles:["First Class Passenger", "Pilot", "Flight Attendant", "Crying Baby",
            "Old Man", "Air Marshall", "Businessman", "Smuggler", "FBI Agent", "Passenger"]
    },
    {
      location: "Hotel",
      roles: ["Maid", "Manager", "Janitor", "Receptionist", "Room Service", "Bellboy", "Businessman", "Tourist"
            , "Cook", "Valet"]
    },
    {
      location: "Construction Site",
      roles: ["Welder", "Manager", "Bulldozer Driver", "Crane Operator", "Civilian"
            , "Electrician", "Worker", "Architect", "Engineer", "Truck Driver"]
    },
    {
      location: "Gas Station",
      roles: ["Biker", "Cyclist", "Cashier", "Customer", "Homeless Man", "Truck Driver",
            "Police Officer", "Drug Dealer", "Stray Dog", "Taxi Driver"]
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
    switch(t) {
        case "general":
            return generalLocation[parseInt(Math.random()*generalLocation.length)].location;
    }
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
