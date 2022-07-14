let PartyRules = {
    squadLineup: [[ {},{},{} ],[ {},{},{} ]],
};
const Party = function (dna) {

    let model = new GMO({
        squad: PartyRules.squadLineup,
        bumba: {},
        sheep: {},
        story: [],
        score: [0,0],
        touch:  0,
        field:  0,
        order: [0,0],
        });
    const Party = Object.assign(this, model, dna)

    Party.TotalScore =()=> Party.story.reduce(
        (a, b) => a.map(
        (o, i) => o+( b.score[i]>b.score[!i?1:0]? 1:0 )),
        [0, 0] );

    Party.TotalTouch =()=> Party.story.reduce(
        (a, b) => a+b.touch,
            0) +Party.touch;

    Party.TotalStage =()=> Party.TotalScore().reduce(
        (a, b) => 1*a+b, 0);

    Party.TouchSheep =()=> {
    };

    Party.Setup = function (dna) {
        let model = dna.setup? {}:{
            name: 'Party Game',
            squad: Party.squad.map(x => x.map(toSheep) ),
            setup: Party.ping,
            };
        Object.assign(Party, model, dna)
    };

    Party.Check = function (dna) {
        console.group('Party.Check: '+Party.name);
        [
            'TotalScore',
            'TotalTouch',
            'TotalStage',
        ].map(f => console.log( `${f}:`, Party[f]() ));
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CURRENT STAGE');
        [
            'touch',
            'bumba',
        ].map(f => console.log( `${f}:`, Party[f] ));
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ TEAMS');
        [0,1].map(f => console.log( `Squad[${f}]`, Party.squad[f] ));
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~');
        console.groupEnd();
        return 'Party.Check: complete';
    };

    Party.Stage = function (dna) {
        let NewStage = {
            touch: 0,
            bumba: new Bumba(),
        };
        Party.Setup(NewStage)
        Party.Touch()
    };

    Party.Point = function (dna) {};

    Party.Touch = function (dna) {
        Party.stage = Object.entries({
            run: t => !t,
            hit: t => 0 == t % 3 && !!t,
            get: t => 1 == t % 3,
            fix: t => 2 == t % 3,
        }).find( o => o[2](Party.touch) )[0];
        Party.sheep = Party.squad[Party.touch%2===serve? 0:1]
        Party.touch++
    };

    Party.currentSheep = function (dna) {
        let t = Party.touch
        let s = Party.score[0]*1 + Party.score[1]*1
        
        
    };

    Party.Start = function (dna) {
        const serve = Party.serve === 0 ? 1:0
        const bumba = new Bumba()
        Party.Setup({ touch:0, serve, bumba })
        Party.Touch()
    };

};
/*
Take(inject)(Sheep)
0612 28 410
17 39 511

Party.serve === t % 2 ? 0:1

t%2 && !serve ? 1:0
!(t%2)
t%2===serve? 0:1


t % 2 ? 1 // serve 0
t % 2 
0 0 - 0
0 1 - 1
1 0 - 1
1 1 - 0

t % 6
r = [ [0,1,2], [3,4,5] ]
[
[0, 0],
[1, 0],
[0, 1],
[1, 1],
[0, 2],
[1, 2],
].filter( (o,i) => i === 2 % 6 ).reduce( (o,i) => r[i[0]][i[1]] )
*/
