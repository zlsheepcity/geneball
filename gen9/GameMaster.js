// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GMO = function GeneticallyModifiedObject
(dna) {
    const NameWizard = base => {
        const Header = 'DMNLTGH'
        const Bodies = ['ina','ora','ana','iko','uni']
        const f = oo => oo[Math.floor( Math.random()*oo.length )]
        return (base || f(Header)) + f(Bodies);
    };
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

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GameBall = function (injectDNA) {
    const Ball = new GMO(injectDNA);
    Object.assign(this, Ball);
};
const GameSheep = function (injectDNA) {
    const Sheep = new GMO(injectDNA);
    Object.assign(this, Ball);
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GameMaster = function (injectDNA) {
    const masterDNA = {
        props: {
            v: '23.9.2',
            scoreToWin: 21,
            teamsSize: 3,
            ballsLevel: 1,
            squadFirstServe: 0,
        },
        state: {
            point: 0,
            touch: 0,
            stage: 0,
            squad: 0,
            sheep: [0,0],
            score: [0,0],
            teams: [[],[]],
            balls: [],
            },
        calls: {
            onGameStarted: report => false,
            onGameResults: report => false,
            onSquadChange: report => false,
            onTouchBefore: report => false,
            onTouchAfter:  report => false,
        },
        rules: {
            checkScoreToWin:Game => {
                const {score, scoreToWin} = Game;
                const F = C=> G=> G[0]>=C||G[1]>=C;
                return F(scoreToWin)(score);
                },
            checkTeamsReady:Game => {
                const {teams, teamsSize} = Game;
                const G = G=> G.length;
                const F = C=> ([A,B])=> G(A)===C&&C===G(B);
                return F(teamsSize)(teams);
                },
            passStageRun:Game => {
                const {balls, point} = Game;
                const ball = balls[point];
                const ballStimuls = {
                    R:ball.Stimul('R'),
                    G:ball.Stimul('G'),
                    F:ball.Stimul('F'),
                    H:ball.Stimul('H'),
                    };
                const F = ([H,G])=>H>G;
                return F(ballStimuls);
                },
            passStageGet:Game => {
                const {balls, point} = Game;
                const ball = balls[point];
                const ballStimuls = {
                    R:ball.Stimul('R'),
                    G:ball.Stimul('G'),
                    F:ball.Stimul('F'),
                    H:ball.Stimul('H'),
                    };
                const F = ([H,G])=>G>H;
                return F(ballStimuls);
                },
            passStageFix:Game => {
                const {balls, point} = Game;
                const ball = balls[point];
                const ballStimuls = {
                    R:ball.Stimul('R'),
                    G:ball.Stimul('G'),
                    F:ball.Stimul('F'),
                    H:ball.Stimul('H'),
                    };
                const F = always => true;
                return F(ballStimuls);
                },
            passStageHit:Game => {
                const {balls, point} = Game;
                const ball = balls[point];
                const ballStimuls = {
                    R:ball.Stimul('R'),
                    G:ball.Stimul('G'),
                    F:ball.Stimul('F'),
                    H:ball.Stimul('H'),
                    };
                const F = ([H,G])=>H>G;
                return F(ballStimuls);
                },
        },
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    const DNA = Object.assign(this,masterDNA,injectDNA);
    const RNA = DNA.state;
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    DNA.CALL = N => DNA.calls[N](DNA.report());
    DNA.RULE = N => DNA.rules[N](DNA.report());
    DNA.SAVE = D => Object.assign(DNA.state,D);

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .report
    DNA.report = () => ({
        complete: DNA.RULE('checkScoreToWin'),
        prepared: DNA.RULE('checkTeamsReady'),
        launched: !!(DNA.state.point||DNA.state.touch),
     ...DNA.state,
     ...DNA.props,
    });
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .create
    DNA.create =(O={})=> {
        const {teams} = O;
        DNA.SAVE({teams});
    };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .launch
    DNA.launch = () => {
        DNA.CALL('onGameStarted');
        do { DNA.stagePlay() }
        while (!DNA.report().complete);
        DNA.finish();
    };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .launch
    DNA.finish = () => {
        DNA.CALL('onGameResults');
    };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ BALLS
    DNA.ballsTakeNow = (R=>F=>R.balls[R.point])(RNA);
    DNA.ballsTakeNew = (B=RNA.point) => {
        RNA.balls[B] = DNA.ballsMakeNew(B);
        return RNA.balls[B];
        };
    DNA.ballsMakeNew = id => new GMO({
        level: DNA.props.ballsLevel,
        name: `Ball${id}`,
        });
    DNA.ballsIsAlive = f => !!DNA.ballsTakeNow().inPlay ;
    DNA.ballsSetPlay = f => { DNA.ballsTakeNow().inPlay = true };
    DNA.ballsSetMiss = f => { DNA.ballsTakeNow().inPlay = false};
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SHEEP
    DNA.sheepTakeNow = f => {
        const {teams,squad,sheep}=DNA.state;
        return teams[squad][ sheep[squad] ];
        };
    DNA.sheepSetNext = f => {
        const {sheep,squad} = DNA.state;
        sheep[squad] = ++sheep[squad]%3;
        };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SQUAD
    DNA.squadSetNext = f => { DNA.state.squad = DNA.state.squad ? 0:1 };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SCORE
    DNA.scorePushOne = f => { RNA.point++;RNA.score[RNA.squad]++ };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ TOUCH
    DNA.touchSetBase = f => { RNA.touch=0 };
    DNA.touchSetNext = f => { RNA.touch++ };
    DNA.touchContact = f => {
        const Ball  = DNA.ballsTakeNow();
        const Sheep = DNA.sheepTakeNow();
        const touch = ['Run','Get','Fix','Hit'][RNA.stage];
        const pass  = name => DNA.RULE(`passStage${name}`);
     // make contact
        DNA.touchSetNext();
        Sheep[touch](Ball);
        return pass(touch);
    };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ STAGE
    DNA.stageSetBase = f => { DNA.stagePush(false) };
    DNA.stageSetNext = f => { DNA.stagePush(true)  };
    DNA.stagePush = keepPlaying => {
        keepPlaying
          ? RNA.stage ++
          : RNA.stage =0 ;
        if( RNA.stage >3 )
            RNA.stage =1 };
    DNA.stagePlay = f => {
        const run = [
            RUN => DNA.stagePlayRUN(),
            GET => DNA.stagePlayGET(),
            FIX => DNA.stagePlayFIX(),
            HIT => DNA.stagePlayHIT(),
            ][RNA.stage] ;
        const fix = f => {
            let inPlay =DNA.ballsIsAlive();
            if(!inPlay) DNA.scorePushOne();
            if(!inPlay) DNA.stageSetBase();
            };
        run();
        fix();
    };
    DNA.stagePlayRUN = f => {
     // Ready
        DNA.stageSetBase();
        DNA.touchSetBase();
        DNA.ballsTakeNew();
        DNA.ballsSetPlay();
        DNA.CALL('onSquadChange');
        DNA.CALL('onTouchBefore');
     // Touch
        let pass = DNA.touchContact();
        let miss = !pass;
        let none = false;
        if (miss) DNA.sheepSetNext();
        if (true) DNA.squadSetNext();
        if (pass) DNA.stageSetNext();
        if (miss) DNA.ballsSetMiss();
        DNA.CALL('onTouchResult');
    };
    DNA.stagePlayGET = f => {
     // Ready
        DNA.CALL('onSquadChange');
        DNA.CALL('onTouchBefore');
     // Touch
        let pass = DNA.touchContact();
        let miss = !pass;
        let none = false;
        if (true) DNA.sheepSetNext();
        if (miss) DNA.squadSetNext();
        if (pass) DNA.stageSetNext();
        if (miss) DNA.ballsSetMiss();
        DNA.CALL('onTouchResult');
    };
    DNA.stagePlayFIX = f => {
     // Ready
        DNA.CALL('onTouchBefore');
     // Touch
        let pass = DNA.touchContact();
        let miss = !pass;
        let none = false;
        if (pass) DNA.sheepSetNext();
        if (miss) DNA.squadSetNext();
        if (pass) DNA.stageSetNext();
        if (miss) DNA.ballsSetMiss();
        DNA.CALL('onTouchResult');
    };
    DNA.stagePlayHIT = f => {
     // Ready
        DNA.CALL('onTouchBefore');
     // Touch
        let pass = DNA.touchContact();
        let miss = !pass;
        let none = false;
        if (none) DNA.sheepSetNext();
        if (true) DNA.squadSetNext();
        if (pass) DNA.stageSetNext();
        if (miss) DNA.ballsSetMiss();
        DNA.CALL('onTouchResult');
    };
};  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ /GameMaster
