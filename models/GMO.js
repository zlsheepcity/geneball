const GMO = function GeneticallyModifiedObject
(dna) {

    let model = {
        name: '',
        nuke: {},
        };
    Object.assign(this, model, dna)

};
