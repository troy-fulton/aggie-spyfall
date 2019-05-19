

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
    },
    {
      location: "Cloud",
      roles:["Care Bear", "Bird","Rainbow", "Carl Fredrickson", "Sun", "Zeus",
            "Superman", "Lightning", "Balloon", "Mary Poppins"]
    },
    {
      location: "Atlantis",
      roles:["Atlantean", "Aquaman", "Poseidon", "Mermaid", "Neptune", "Council Member",
            "Plankton", "Mermaid Man", "Scuba Diver", "Shark"]
    },
    {
      location: "Rainforest",
      roles:["Lemur Mort", "Jaguar", "Indiana Jones", "Native", "Cannibal", "Dora the Explorer",
            "Monkey", "Mosquito", "King Julien", "Skeleton"]
    },
    {
      location: "Suburb",
      roles:["Homeowner", "Real Estate Agent", "Dog", "Police Officer", "Parent",
            "Mayor", "City Council Member", "Garbage Truck Driver", "Gardener", "Drug Dealer"]
    },
    {
      location: "Space Station",
      roles:["Doctor", "Alien", "Astronaut", "Researcher", "Electrician", "Scientist",
            "Radioman", "Asteroid", "Engineer", "Pilot"]
    },
    {
      location: "Library",
      roles:["Bookworm", "Librarian", "Teenager", "Parent", "Child", "Mayor",
            "College Student", "Janitor", "Counselor", "Chess Tutor", "Tutor"]
    },
    {
      location: "Mariana Trench",
      roles:["Kraken", "Godzilla", "Megalodon", "Leviathan", "Jaws", "Moby Dick", "Sea Serpent",
            "Goblin Shark", "Angular Fish", "Gulper Eel", "Vampire Squid", "Dumbo Octopus"]
    },
    {
      location: "Train",
      roles:["Passenger", "Engineer", "Conductor", "Businessman", "First Class Passenger", "Stowaway", "Service Attendant",
            "Trainman", "Brakeman", "Crew Member"]
    },
    {
      location: "National Park",
      roles:["Park Ranger", "Tourist", "Hiker", "Camper", "Maintenance Worker",
            "Equipment Operator", "First Aid Personnel", "Vehicle Operator", "Park Guide", "Utility Operator"]
    },
    {
      location: "Ski Resort",
      roles:["Skier", "Lift Operator", "Ski Instructor", "Lodger", "First Aid Personnel", "Equipment Mechanic",
            "Ski Patroller", "Food Vendor", "Manager", "Snowboarder"]
    },
    {
      location: "Music Festival",
      roles:["Pop Star", "Dancer", "Audio Technician", "DJ", "Teenager", "Bartender",
            "Backup Singer", "Security", "Supervisor", "Limousine Driver"]
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