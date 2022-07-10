const GMO = function GeneticallyModifiedObject
(dna) {

    let model = {
        name: '',
        nuke: {},
        ping: true,
        };
    Object.assign(this, model, dna)

};
