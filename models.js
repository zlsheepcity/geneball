// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ utils

// import GMO from GMO
// import NameWizard from utils

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ library

const registerPlayer = function (
    player = new Sheep(),
    team = 0,
) {
    this.Squad[team].push(player)
}

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ world model

const Sheep = function (dna) {
    const Sheep = Object.assign(this, new GMO(), dna)
    Sheep.name = Sheep.name || NameWizard()
};
let toSheep = f => new Sheep(f)

const Squad = function (dna) {
    const Squad = Object.assign(this, new GMO(), dna)
    Squad.Sheep = []
};

const Bumba = function (dna) {
    const Bumba = Object.assign(this, new GMO(), dna)

};

/** /

const Party = function (dna) {
    const Party = Object.assign(this, new GMO(), dna)
    Party.Bumba = {}
    Party.Sheep = {}
    Party.Squad = [[],[]]
    Party.Score = [0,0]
    Party.Touch = 0
    
    Party.registerPlayer = registerPlayer
//    Object.assign(Party, {
//        registerPlayer,
//    })
};

/**/

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
