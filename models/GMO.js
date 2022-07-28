const GMO = function GeneticallyModifiedObject
(dna) {

    let model = {
        name: '',
        nuke: {}, // r:[],g:[],f:[],h:[]
        ping: true,
        };
    Object.assign(this, model, dna)

};
