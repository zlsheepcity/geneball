/**/ // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Genetics

const GeneticsLibrary = function
(dna) {
    let Gen = Object.assign(this,dna)

    Gen.SEED ='RGFH'

    // 'RGFH'
    Gen.Gene = base => {
        const  r = Gen.SEED
        const  g = r => f(h)+f(h+r)+f(h+r)+f(h+r)
        const  f = x => x[Math.floor( Math.random()*x.length )]
        const  h = base || f(r)
        return g(r);
        };

    // ['RGFH','RHFG',...]
    Gen.Acid = level => base => {
        const r = Array(level||0).fill(0)
        const g = r => r.map(f)
        const f = x => Gen.Gene(base)
        return g(r);
        };

    // {R:[],G:[],F:[],H:[]}
    Gen.Nuke = level => {
        const  r = [...Gen.SEED]
        const  g = x => x.reduce(f, {})
        const  f = (a,G) => (a[G]=h(G),a)
        const  h = G => Gen.Acid(level)(G)
        return g(r);
        };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Gene

    Gen.GeneMask =
        o => [...Gen.Gene()]
               .fill(o||'O')
                .join('');

    Gen.GeneLoveStimul =
        (AAAA,BBBB) => [...AAAA].reduce(
            (p,g,i) => BBBB[i] === g? ++p :p
                ,0);

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Acid

    // ['RRRR','HHHH','RRFF'] => ['RRRR','RRFF']
    Gen.AcidWeed = acid => acid.reduce(
       (AcW,G) => {
            const b = Gen.GeneMask(AcW[0] && AcW[0][0])
            const h = AcW.length >1 ? AcW.slice(-2)[0]:b
            const r = AcW.slice(0, -1)
            const g = AcW.slice(-1)[0]
            const f = Gen.AcidChallenge
            return !!!AcW.length? [G] :[...r,...f(h,g,G)];
        },[]);

    Gen.AcidChallenge =
       (a,b,c) => {
        if (Array.isArray(a)) [a,b,c] = a
        let h = Gen.GeneLoveStimul
        let friendly = h(c,b) > 1
        let winner =
          1 < h(c,a) && Math.random()*h(c,a)
            > Math.random()*h(b,a)
            ? c:b;
        return friendly ? [b,c] : [winner] ;
        };

    // (['HHHH','HGGG'])('H') = 5
    Gen.AcidStimul = acid => G =>
        [...G].reduce(
            (power,g) => power+
            (acid.join('')
                .match(new RegExp(g,'g')) || [])
                    .length
            ,0);


    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nuke

    // {R:[],F:[],G:[],H:[]}
    Gen.BabyNuke = level => {
        const  r = Gen.Nuke(level)
        const  g = G => Gen.AcidWeed(r[G])
        const  f = (n,G) => ({...n, [G]:g(G)})
        const  h = Object.keys(r).reduce(f,{})
        return h; // {}
        };

    // ({H:['HHHH'],G:['GGGH']})('H') = 5
    Gen.NukeStimul = nuke => G =>
        Object.keys(nuke).reduce(
            (power,g) => power+
            Gen.AcidStimul(nuke[g])(G)
            ,0);

    // oO{RGFH} + {RGFH} = oO{RGFH}
    Gen.NukeFill = oO => fill => {
        const acid = G => Gen.AcidWeed([...oO.nuke[G], ...fill[G]])
        return Object.keys(fill).map( G=> {oO.nuke[G] = acid(G)} );
    }


    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Artefacts

    Gen.Fill = oO => Oo => {
        const acid = G => Gen.AcidWeed([...oO.nuke[G], ...Oo.nuke[G]])
        Object.keys(Oo.nuke).map( G=> {oO.nuke[G]=acid(G)} )
    }

    Gen.Welcome = o =>
        Object.assign( o,{
            nuke: Gen.Nuke(),
            Fill: function (oO, keys) {
                (keys || Object.keys(this.nuke))
                .map( G => {
                    let fill = {nuke:{ [G]:this.nuke[G] }}
                    Gen.Fill(oO)(fill)
                });
                },
            Hit: function (oO) { this.Fill(oO,['H']) },
            Get: function (oO) { this.Fill(oO,['G']) },
            Stimul: function (G) { return Gen.NukeStimul(this.nuke)(G) },
        });

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

let Gen = new GeneticsLibrary()
let testGen = f => {
    const n = Gen.Nuke(3)
    const m = Gen.Nuke(3)
    const o = {nuke:{...m}}
    const d = Gen.NukeFill(o)(n)
    const b = o.nuke
  f?console.groupCollapsed('testGen...')
   :console.group('testGen')
    console.log('Gene', Gen.Gene())
    console.log('Acid', Gen.Acid(3)('R'))
    console.log('Nuke / NukeStimul / NukeFill')
    console.log('...'); for (G in n)
    console.log(G, Gen.NukeStimul(n)(G), n[G])
    console.log('...'); for (G in m)
    console.log(G, Gen.NukeStimul(m)(G), m[G])
    console.log('...'); for (G in b)
    console.log(G, Gen.NukeStimul(b)(G), b[G])
    console.groupEnd()
    return 'testOK';
};  console.log('testGen()');

const NameWizard = base => {
    const Header = 'DMNLTGH'
    const Bodies = ['ina','ora','ana','iko','uni']
    const f = oo => oo[Math.floor( Math.random()*oo.length )]
    return (base || f(Header)) + f(Bodies);
};

const GMO = function GeneticallyModifiedObject
(dna) {
    let GMO = Object.assign(this,dna)
    let NukeStimul = Gen.NukeStimul
    let NukeFill   = Gen.NukeFill
    GMO.nuke       = Gen.BabyNuke(GMO.level||0)
    GMO.name       = GMO.name || NameWizard()

    GMO.Stimul = function (G) { return NukeStimul(this.nuke)(G) }

    GMO.Run  = function (oO) { this.Fill(oO,['R']) }
    GMO.Get  = function (oO) { this.Fill(oO,['G']) }
    GMO.Fix  = function (oO) { this.Fill(oO,['F']) }
    GMO.Hit  = function (oO) { this.Fill(oO,['H']) }
    GMO.Fill = function (oO, keys) {
        let N = {...this.nuke}
        let K = keys || Object.keys(N)
        K.map( G=> NukeFill(oO)({[G]:N[G]}) );
        };

    GMO.Profile = function (s) {
        console[s?'groupCollapsed':'group']('oO:'+this.name)
        for (G in this.nuke)
        console.log(G, NukeStimul(this.nuke)(G), this.nuke[G])
        console.groupEnd()
        return 'Looks good' ;};
};

const GameState = function
(dna) {
    const State = Object.assign(this,dna)
    State.Reset = function () {
        State.currentPoint = 0
        State.currentTouch = 0
        State.currentStage = 0
        State.currentSquad = 0
        State.currentSheep = [0,0]
        State.currentScore = [0,0]
    };
    State.Balls = []
    State.Teams = [[],[]]

    State.Start = function (dna) {

        // init
        Object.assign(State,dna)
        logGame(State,'GameStart')

        // run
        State.Stage()
    };
    State.Stage = function () {

        // init
        const AllStages = ['StageRun','StageGet','StageFix','StageHit']
        const PlayStage = f => State[AllStages[State.currentStage]]()

        for (t=1;t<21;t++) {

        PlayStage()

        // score
        let inPlay =State.Balls[State.currentPoint].inPlay
        if(!inPlay) State.ScoreChange()
        if(!inPlay) logGame(State,'GameMiss')
        if(!inPlay) State.StageReset()
        const ScoreContinue = S=> (M=> S[0]<M && S[1]<M)
        const winnerDecided = !ScoreContinue(State.currentScore)(3)
        if (winnerDecided) return State.GameComplete();

        };
        return State.GameComplete();
    };
    State.StageRun = function () {

        // Init
        const BallRefreshProfile = {level:1,name:'Ball-'+State.currentPoint}
        State.Balls[State.currentPoint] = new GMO(BallRefreshProfile)
        State.TouchReset()
        logGameStage(State,'StageRunInit')

        // Take
        const Ball = State.Balls[State.currentPoint]
        const Sheep = State.Sheep()
        Ball.inPlay = true
        logGameStage(State,'StageRunTake')

        // Fill
        Sheep.Hit(Ball)
        State.TouchUpdate()
        logGameStage(State,'StageRunFill')

        // Ball
        let Rule = O=>O.H>O.G
        let pass = Rule({H:Ball.Stimul('H'),G:Ball.Stimul('G')})
        let miss = !pass
        let none = false
        if (miss) State.SheepChange()
        if (true) State.SquadChange()
        if (pass) State.StageChange()
        if (miss) Ball.inPlay = false
        logGameStage(State,'StageRunBall')
    };
    State.StageGet = function () {

        // Take
        const Ball = State.Balls[State.currentPoint]
        const Sheep = State.Sheep()
        logGameStage(State,'StageGetTake')

        // Fill
        Sheep.Get(Ball)
        State.TouchUpdate()
        logGameStage(State,'StageGetFill')

        // Ball
        let Rule = O=>O.G>O.H
        let pass = Rule({H:Ball.Stimul('H'),G:Ball.Stimul('G')})
        let miss = !pass
        let none = false
        if (true) State.SheepChange()
        if (miss) State.SquadChange()
        if (pass) State.StageChange()
        if (miss) Ball.inPlay = false
        logGameStage(State,'StageGetBall')
    };
    State.StageFix = function () {

        // Take
        const Ball = State.Balls[State.currentPoint]
        const Sheep = State.Sheep()
        logGameStage(State,'StageFixTake')

        // Fill
        Sheep.Fix(Ball)
        State.TouchUpdate()
        logGameStage(State,'StageFixFill')

        // Ball
        let Rule = O=>true
        let pass = Rule({H:Ball.Stimul('H'),G:Ball.Stimul('G')})
        let miss = !pass
        let none = false
        if (pass) State.SheepChange()
        if (miss) State.SquadChange()
        if (pass) State.StageChange()
        if (miss) Ball.inPlay = false
        logGameStage(State,'StageFixBall')
    };
    State.StageHit = function () {

        // Take
        const Ball = State.Balls[State.currentPoint]
        const Sheep = State.Sheep()
        logGameStage(State,'StageHitTake')

        // Fill
        Sheep.Hit(Ball)
        State.TouchUpdate()
        logGameStage(State,'StageHitFill')

        // Ball
        let Rule = O=>O.H>O.G
        let pass = Rule({H:Ball.Stimul('H'),G:Ball.Stimul('G')})
        let miss = !pass
        let none = false
        if (none) State.SheepChange()
        if (true) State.SquadChange()
        if (pass) State.StageChange()
        if (miss) Ball.inPlay = false
        logGameStage(State,'StageHitBall')
    };

    // Servants

    State.Touch = f => State.currentTouch
    State.TouchUpdate = f => { State.currentTouch++ }
    State.TouchReset  = f => { State.currentTouch=0 }

    State.Squad = f => State.Teams[State.currentSquad]
    State.SquadChange = f => { State.currentSquad=State.currentSquad ? 0:1 }

    State.Sheep = f => State.Squad()[State.currentSheep[State.currentSquad]]
    State.SheepChange = f =>
        { State.currentSheep[State.currentSquad] =
        ++State.currentSheep[State.currentSquad] %3 }

    State.StageReset  = f => State.StageUpdate(false)
    State.StageChange = f => State.StageUpdate(true)
    State.StageUpdate = keepPlaying => {
        keepPlaying
          ? State.currentStage ++
          : State.currentStage =0
        if( State.currentStage >3 )
            State.currentStage =1 };

    State.ScoreChange = f => {
        State.currentPoint++
        State.currentScore[State.currentSquad]++ };

    State.GameComplete = function () {
        logGame(State,'GameFinish')
    };
    State.QuickStart = function () {
        const level = 3
        const Teams = [
            [new GMO({level}), new GMO({level}), new GMO({level})],
            [new GMO({level}), new GMO({level}), new GMO({level})]]
        State.Start({Teams});
    };

    // init
    State.Reset()
};

let testGame = f => {
  f?console.groupCollapsed('testGame...')
   :console.group('testGame')
    let Game = new GameState()
    Game.QuickStart()
    console.groupEnd()
    return 'testOK'
};  console.log('testGame()');
  //console.log('g=new GameState();g.QuickStart()')


let logGame = (Game, step) => { log('##',step)
    if('GameStart' === step) {
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~')
        log('Teams:',Game.Teams)
        log(Game.Teams[0].reduce((s,g)=>[...s,g.name],[]))
        for (i in Game.Teams[0]) Game.Teams[0][i].Profile(1)
        log(Game.Teams[1].reduce((s,g)=>[...s,g.name],[]))
        for (i in Game.Teams[1]) Game.Teams[1][i].Profile(1)
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~')
    };
    if('GameFinish' === step) {
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~')
        log('Final score:',Game.currentScore)
        log(Game)
    };
    if('GameMiss' === step) {
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~')
        log('Miss on stage:',Game.currentStage)
        log('Stage touches:',Game.currentTouch)
    };
};
let logGameStage = (Game, step) => { let m = f=>true
    if('StageRunInit' === step) m =f=> {
        log('Current score:',Game.currentScore)
        log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~')
        };
    if('StageRunTake' === step) m =f=> {
        Game.Sheep().Profile(1)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageRunFill' === step) m =f=> {
        log('.. Touch:',Game.currentTouch)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageRunBall' === step) m =f=> {
        log('.. Ball in play:', Game.Balls[Game.currentPoint].inPlay)
        log('..',
            'R',Game.Balls[Game.currentPoint].Stimul('R'),
            'G',Game.Balls[Game.currentPoint].Stimul('G'),
            'F',Game.Balls[Game.currentPoint].Stimul('F'),
            'H',Game.Balls[Game.currentPoint].Stimul('H'))
        log('..')
        };
    if('StageGetTake' === step) m =f=> {
        Game.Sheep().Profile(1)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageGetFill' === step) m =f=> {
        log('.. Touch:',Game.currentTouch)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageGetBall' === step) m =f=> {
        log('.. Ball in play:', Game.Balls[Game.currentPoint].inPlay)
        log('..',
            'R',Game.Balls[Game.currentPoint].Stimul('R'),
            'G',Game.Balls[Game.currentPoint].Stimul('G'),
            'F',Game.Balls[Game.currentPoint].Stimul('F'),
            'H',Game.Balls[Game.currentPoint].Stimul('H'))
        log('..')
        };
    if('StageFixTake' === step) m =f=> {
        Game.Sheep().Profile(1)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageFixFill' === step) m =f=> {
        log('.. Touch:',Game.currentTouch)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageFixBall' === step) m =f=> {
        log('.. Ball in play:', Game.Balls[Game.currentPoint].inPlay)
        log('..',
            'R',Game.Balls[Game.currentPoint].Stimul('R'),
            'G',Game.Balls[Game.currentPoint].Stimul('G'),
            'F',Game.Balls[Game.currentPoint].Stimul('F'),
            'H',Game.Balls[Game.currentPoint].Stimul('H'))
        log('..')
        };
    if('StageHitTake' === step) m =f=> {
        Game.Sheep().Profile(1)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageHitFill' === step) m =f=> {
        log('.. Touch:',Game.currentTouch)
        Game.Balls[Game.currentPoint].Profile(1)
        };
    if('StageHitBall' === step) m =f=> {
        log('.. Ball in play:', Game.Balls[Game.currentPoint].inPlay)
        log('..',
            'R',Game.Balls[Game.currentPoint].Stimul('R'),
            'G',Game.Balls[Game.currentPoint].Stimul('G'),
            'F',Game.Balls[Game.currentPoint].Stimul('F'),
            'H',Game.Balls[Game.currentPoint].Stimul('H'))
        log('..')
        };
    console.groupCollapsed(
        '## ' +step + ' '
        + (Game.currentSquad? 'oO':'Oo')
        + ':' +Game.currentTouch
        ); m();
    console.groupEnd()
};
