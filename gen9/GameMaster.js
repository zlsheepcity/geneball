// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ import
// const GMO = function factory (){}
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GameMaster = function (injectDNA) {
    const masterDNA = {
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
            gameStarted:  report => false,
            serviceReady: report => false,
            serviceAfter: report => false,
        },
        rules: {
            checkScoreToWin:
                (C=>S=>S[0]>=C||S[1]>=C)(21)
                ,// [0,0] => false
            checkTeamsReady:
                (F=>C=>([A,B])=>F(A)>=C&&F(B)>=C)(F=>F.length)(3)
                ,// [[],[]] => false
            passStageRun:
                B=>((O=>O.H>O.G)({H:B.Stimul('H'),G:B.Stimul('G')}))
                ,// GMO => false
            },
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    const DNA = Object.assign(this,masterDNA,injectDNA);
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    const CALL = n => DNA.calls[n](DNA.report());
    DNA.stateUpdate = state => Object.assign(DNA.state,state);
    DNA.teamsRegister = ({teams}) => DNA.stateUpdate({teams});

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .report
    DNA.report = () => ({
        complete:
            DNA.rules.checkScoreToWin(DNA.state.score),
        prepared:
            DNA.rules.checkTeamsReady(DNA.state.teams),
        launched:
            !!(DNA.state.point||DNA.state.touch),
     ...DNA.state });

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .create
    DNA.create = game => {
        const {teams} = game;
        teamsRegister({teams});
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ .launch
    DNA.launch = () => {
        DNA.calls.gameStarted(DNA.report());
        DNA.stagePlay();
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ BALLS
    DNA.ballsTakeNow = (S=>F=>S.balls[S.point])(DNA.state);
    DNA.ballsTakeNew = (bid=DNA.state.point) => {
        const newball = new GMO({level:1,name:`Ball${bid}`});
        DNA.state.balls[bid] = newball;
        return DNA.ballsTakeNow();
    };
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
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ TOUCH
    DNA.touchSetBase = f => { DNA.state.touch=0 };
    DNA.touchSetNext = f => { DNA.state.touch++ };
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ STAGE
    DNA.stageSetBase = f => { DNA.stagePush(false) };
    DNA.stageSetNext = f => { DNA.stagePush(true)  };
    DNA.stagePush = keepPlaying => {
        keepPlaying
          ? DNA.state.stage ++
          : DNA.state.stage =0
        if( DNA.state.stage >3 )
            DNA.state.stage =1 };
    DNA.stagePlay = f => [
        RUN => DNA.stagePlayRUN(),
        GET => DNA.stagePlayGET(),
        FIX => DNA.stagePlayFIX(),
        HIT => DNA.stagePlayHIT(),
        ][DNA.state.stage]();
    DNA.stagePlayRUN = f => {

        // Take
        DNA.touchSetBase();
        const Ball  = DNA.ballsTakeNew();
        const Sheep = DNA.sheepTakeNow();
        Ball.inPlay = true;
        CALL('serviceReady');

        // Fill
        Sheep.Hit(Ball);
        DNA.touchNext();

        // Ball
        let pass = DNA.passStageRun(Ball);
        let miss = !pass
        let none = false
        if (miss) DNA.sheepSetNext()
        if (true) DNA.squadSetNext()
        if (pass) DNA.stageSetNext()
        if (miss) Ball.inPlay = false
        CALL('serviceAfter');
    };

};
const GameMaster = function (injectDNA) {
    const MasterState = function () {
        let GMS = this;
        GMS.getStateInitial = () => ({
            point: 0,
            touch: 0,
            stage: 0,
            squad: 0,
            sheep: [0,0],
            score: [0,0],
            teams: [[],[]],
            balls: [],
        });
        GMS.data = GMS.getStateInitial();
        GMS.values = v => GMS.data;
        GMS.update = v => Object.assign(GMA.data,v);
    };
    const GMA = Object.assign(this);
    GMA.rules = {
        stageOrder: ['RUN','GET','FIX','HIT'],
        checkScoreToWin:
            // [0,0] => false
            (C=>S=>S[0]>=C||S[1]>=C)(21),
        };
    GMA.stateInitial = () => ({
        point: 0,
        touch: 0,
        stage: 0,
        squad: 0,
        sheep: [0,0],
        score: [0,0],
        teams: [[],[]],
        balls: [],
        });
    const RNA = GMA.stateInitial();

    GMA.state = RNA;
    GMA.stateUpdate = state => Object.assign(GMA.state,state);
    GMA.stateReport = () => ({
        complete: GMA.rules.checkScoreToWin(RNA.score),
        launched: !!(RNA.point||RNA.touch),
        ...RNA});

    GMA.registration = data => {
        const {teams} = data;
        GMA.stateUpdate({teams});
    };

    GMA.stageClear = rna => {
        GMA.stateUpdate({
            
        });
    };

    const DNA = {};
    DNA.state = {
        point: 0,
        touch: 0,
        stage: 0,
        squad: 0,
        sheep: [0,0],
        score: [0,0],
        teams: [[],[]],
        balls: [],
        };
    DNA.rules = {
        stageOrder = ['RUN','GET','FIX','HIT'];
        scoreToWin = 21;
        };
    const RNA = Object.assign(this,injectDNA);
    RNA.state = { ...DNA.state };
    RNA.rules = { ...DNA.rules };


    // workers
    RNA.stateUpdate = state => Object.assign(RNA.state,state);


    RNA.preparations = rna => {
        
    };
    RNA.report = topic => {
      //DNA.report('registration');
    };
};