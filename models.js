// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ utils

// import NameWizard from utils

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ library

const GMO = function GeneticallyModifiedObject
(dna) {
    let model ={
        name:'',
        nuke:{},
        };
    Object.assign(this, model, dna)
};

const registerPlayer222 = (
    player = new Sheep(),
    team = 0,
) => {
    this.Squad[team].push(player)
}
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

const Squad = function (dna) {
    const Squad = Object.assign(this, new GMO(), dna)
    Squad.Sheep = []
};

const Bumba = function (dna) {
    const Bumba = Object.assign(this, new GMO(), dna)

};

const Party = function (dna) {
    const Party = Object.assign(this, new GMO(), dna)
    Party.Bumba = {}
    Party.Score = [0, 0]
    Party.Squad = [[], []]
    Party.registerPlayer = registerPlayer
//    Object.assign(Party, {
//        registerPlayer,
//    })
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
