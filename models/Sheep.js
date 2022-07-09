const Sheep = function (dna) {
    const Sheep = Object.assign(this, new GMO(), dna)
    Sheep.name = Sheep.name || NameWizard()
};
