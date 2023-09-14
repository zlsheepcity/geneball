// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const GeneticsLibrary = function (injectDNA){
    let GEN = Object.assign(this, injectDNA);
    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Seed

    GEN.v = '23.9.2'
    GEN.name = 'GEN4'
    GEN.SEED = 'RGFH'
    const UTT = {
        RND: C=> !C? Math.random() : Math.floor(Math.random()*C)
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Root

    // (G) => 'GRFH'
    GEN.Gene = base => {
        const  r = GEN.SEED
        const  g = r => f(h)+f(h+r)+f(h+r)+f(h+r)
        const  f = x => x[UTT.RND(x.length)]
        const  h = base || f(r)
        return g(r);
        };

    // (3)(G) => ['GRFH','GHFR','GFHR']
    GEN.Acid = level => base => {
        const r = Array(level||0).fill(0)
        const g = r => r.map(f)
        const f = x => GEN.Gene(base)
        return g(r);
        };

    // (0) => {R:[],G:[],F:[],H:[]}
    GEN.Nuke = level => {
        const  r = [...GEN.SEED]
        const  g = x => x.reduce(f, {})
        const  f = (a,G) => (a[G]=h(G),a)
        const  h = G => GEN.Acid(level)(G)
        return g(r);
        };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Gene

    // (G) => 'GGGG'
    GEN.GeneMask =
        o => [...GEN.Gene()]
               .fill(o||'O')
                .join('');

    // ('GRFH','GRFH') => 1
    GEN.GeneLoveStimul =
        (AAAA,BBBB) => [...AAAA].reduce(
            (p,g,i) => BBBB[i] === g? ++p :p
                ,0);

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Acid

    // ? => some magic
    GEN.AcidChallenge =
       (a,b,c) => {
        if (Array.isArray(a)) [a,b,c] = a
        let h = GEN.GeneLoveStimul
        let friendly = h(c,b) > 1
        let winner =
          1 < h(c,a) && UTT.RND()*h(c,a)
            > UTT.RND()*h(b,a)
            ? c:b;
        return friendly ? [b,c] : [winner] ;
        };

    // ['RRRR','HHHH','RRFF'] => ['RRRR','RRFF']
    GEN.AcidWeed = acid => acid.reduce(
       (AcW,G) => {
            const b = GEN.GeneMask(AcW[0] && AcW[0][0])
            const h = AcW.length >1 ? AcW.slice(-2)[0]:b
            const r = AcW.slice(0, -1)
            const g = AcW.slice(-1)[0]
            const f = GEN.AcidChallenge
            return !!!AcW.length? [G] :[...r,...f(h,g,G)];
        },[]);

    // (['HHHH','HGGG'])('H') => 5
    GEN.AcidStimul = acid => G =>
        [...G].reduce(
            (power,g) => power+
            (acid.join('')
                .match(new RegExp(g,'g')) || [])
                    .length
            ,0);

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nuke

    // (0) => {R:[],F:[],G:[],H:[]}
    GEN.BabyNuke = level => {
        const  r = GEN.Nuke(level)
        const  g = G => GEN.AcidWeed(r[G])
        const  f = (n,G) => ({...n, [G]:g(G)})
        const  h = Object.keys(r).reduce(f,{})
        return h; // {}
        };

    // ({H:['HHHH'],G:['GGGH']})('H') => 5
    GEN.NukeStimul = nuke => G =>
        Object.keys(nuke).reduce(
            (power,g) => power+
            GEN.AcidStimul(nuke[g])(G)
            ,0);

    // (oO{RGFH})({RGFH}) => oO{RGFH}
    GEN.NukeFill = oO => fill => {
        const acid = G => GEN.AcidWeed([...oO.nuke[G],...fill[G]]);
        return Object.keys(fill).map( G=> {oO.nuke[G] =  acid(G)});
        };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

const GeneticsLibraryTest = f => {
    const GEN = new GeneticsLibrary();
    const m = GEN.Nuke(1)
    const n = GEN.Nuke(3)
    const o = {nuke:{...m}}
    const d = GEN.NukeFill(o)(n)
    const b = o.nuke
    const t = 'GeneticsLibraryTest()'
  f?console.groupCollapsed(t)
   :console.group(t)
    console.log('Gene:', GEN.Gene()         );
    console.log('Acid:', GEN.Acid(3)('R')   );
    console.log('Nuke:'); for (G in m)
    console.log(G, GEN.NukeStimul(m)(G), m[G]);
    console.log('Fill:'); for (G in n)
    console.log(G, GEN.NukeStimul(n)(G), n[G]);
    console.log('Nuke filled:'); for (G in b)
    console.log(G, GEN.NukeStimul(b)(G), b[G]);
    console.groupEnd();
};
